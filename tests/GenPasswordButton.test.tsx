import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenPasswordButton from '../src/components/GenPasswordButton';
import * as generator from 'generate-password-browser';
import { fireEvent } from '@testing-library/react';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, ...props }: any) => (
    <button
      data-testid={variant === 'outline' ? 'copy-button' : 'generate-button'}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));
jest.mock('@/components/ui/input', () => ({
  Input: ({ value, ...props }: any) => (
    <input data-testid="password-input" value={value} {...props} readOnly />
  ),
}));
jest.mock('@/components/ui/slider', () => ({
  Slider: ({ defaultValue, min, max, step, onValueChange, ...props }: any) => (
    <input
      type="range"
      data-testid="slider"
      defaultValue={defaultValue[0]}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
      {...props}
    />
  ),
}));
jest.mock('@/components/ui/switch', () => ({
  Switch: ({ checked, onCheckedChange, ...props }: any) => (
    <input
      type="checkbox"
      data-testid="switch"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      {...props}
    />
  ),
}));
jest.mock('lucide-react', () => ({
  ClipboardCopy: () => <span data-testid="clipboard-icon">ClipboardCopyIcon</span>,
  RefreshCcw: () => <span data-testid="refresh-icon">RefreshCcwIcon</span>,
}));

jest.mock('generate-password-browser', () => ({
  __esModule: true,
  default: {
    generate: jest.fn(),
  },
}));

describe('GenPasswordButton', () => {
  const user = userEvent.setup();
  const mockClipboardWriteText = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(mockClipboardWriteText);
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
    jest.spyOn(navigator.clipboard, 'writeText').mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockClipboardWriteText.mockReset();
    jest.spyOn(require('generate-password-browser').default, 'generate').mockReturnValue('generated-password');
  });

  it('renderuje poprawnie z początkowym stanem', () => {
    render(<GenPasswordButton />);

    expect(screen.getByTestId('password-input')).toHaveValue('');
    expect(screen.getByText(/Długość: 12/)).toBeInTheDocument();

    const switches = screen.getAllByTestId('switch');
    expect(switches).toHaveLength(2);
    expect(switches[0]).toBeChecked();
    expect(switches[1]).toBeChecked();

    expect(screen.getByTestId('generate-button')).toBeInTheDocument();
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
    expect(screen.getByTestId('generate-button')).toContainElement(screen.getByTestId('refresh-icon'));
    expect(screen.getByTestId('copy-button')).toContainElement(screen.getByTestId('clipboard-icon'));
  });

  it('generuje hasło po kliknięciu przycisku generowania', async () => {
    render(<GenPasswordButton />);

    const generateButton = screen.getByTestId('generate-button');
    await user.click(generateButton);

    expect(require('generate-password-browser').default.generate).toHaveBeenCalledWith({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
      excludeSimilarCharacters: true,
      strict: true,
    });

    expect(screen.getByTestId('password-input')).toHaveValue('generated-password');
  });

  it('aktualizuje długość hasła po zmianie suwaka', async () => {
    render(<GenPasswordButton />);

    const slider = screen.getByTestId('slider');
    fireEvent.change(slider, { target: { value: '13' } });

    await waitFor(() => {
      expect(screen.getByText(/Długość: 13/)).toBeInTheDocument();
    });

    const generateButton = screen.getByTestId('generate-button');
    await user.click(generateButton);

    expect(require('generate-password-browser').default.generate).toHaveBeenCalledWith(
      expect.objectContaining({ length: 13 })
    );
  });

  it('przełącza opcję cyfr po kliknięciu przełącznika cyfr', async () => {
    render(<GenPasswordButton />);

    const numbersSwitch = screen.getAllByTestId('switch')[0];
    await user.click(numbersSwitch);

    expect(numbersSwitch).not.toBeChecked();

    const generateButton = screen.getByTestId('generate-button');
    await user.click(generateButton);

    expect(require('generate-password-browser').default.generate).toHaveBeenCalledWith(
      expect.objectContaining({ numbers: false })
    );
  });

  it('przełącza opcję znaków specjalnych po kliknięciu przełącznika znaków', async () => {
    render(<GenPasswordButton />);

    const symbolsSwitch = screen.getAllByTestId('switch')[1];
    await user.click(symbolsSwitch);

    expect(symbolsSwitch).not.toBeChecked();

    const generateButton = screen.getByTestId('generate-button');
    await user.click(generateButton);

    expect(require('generate-password-browser').default.generate).toHaveBeenCalledWith(
      expect.objectContaining({ symbols: false })
    );
  });
});