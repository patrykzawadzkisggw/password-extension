import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginSteps } from '../src/components/LoginSteps';
import { fireEvent } from '@testing-library/react';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }) => (
    <button data-testid="button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }) => <div data-testid="card" {...props}>{children}</div>,
  CardHeader: ({ children, ...props }) => <div data-testid="card-header" {...props}>{children}</div>,
  CardTitle: ({ children, ...props }) => <h2 data-testid="card-title" {...props}>{children}</h2>,
  CardContent: ({ children, ...props }) => <div data-testid="card-content" {...props}>{children}</div>,
}));
jest.mock('@/components/RecoverMasterKeyDialog', () => ({
  RecoverMasterkeyDialog: ({ isDialogOpen, setIsDialogOpen, setMasterkey }) => (
    <div data-testid="recover-dialog" data-open={isDialogOpen}>
      <button
        data-testid="dialog-close"
        onClick={() => setIsDialogOpen(false)}
      >
        Zamknij
      </button>
    </div>
  ),
}));
jest.mock('lucide-react', () => ({
  Info: () => <span data-testid="info-icon">InfoIcon</span>,
}));

describe('LoginSteps', () => {
  const user = userEvent.setup();
  const mockSetMasterkey = jest.fn();
  const mockChromeTabsCreate = jest.fn();

  beforeAll(() => {
    global.chrome = {
      tabs: {
        create: mockChromeTabsCreate,
      },
    };
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderuje poprawnie z początkowym stanem', () => {
    render(<LoginSteps setMasterkey={mockSetMasterkey} />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('Logowanie');
    expect(screen.getByText('Zaloguj się')).toBeInTheDocument();
    expect(screen.getByText('Otwórz stronę logowania')).toBeInTheDocument();
    expect(screen.getByText('Wprowadź Master Key')).toBeInTheDocument();
    expect(screen.getByText('Wprowadź')).toBeInTheDocument();
    expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    expect(screen.getAllByTestId('button')).toHaveLength(2);
    expect(screen.getByTestId('recover-dialog')).toHaveAttribute('data-open', 'false');
  });

  it('otwiera stronę logowania po kliknięciu przycisku', async () => {
    render(<LoginSteps setMasterkey={mockSetMasterkey} />);

    const loginButton = screen.getAllByTestId('button')[0];
    await user.click(loginButton);

    expect(mockChromeTabsCreate).toHaveBeenCalledWith({ url: 'https://securebox.netlify.app' });
  });

  it('otwiera dialog po kliknięciu przycisku wprowadzania', async () => {
    render(<LoginSteps setMasterkey={mockSetMasterkey} />);

    const enterButton = screen.getAllByTestId('button')[1];
    await user.click(enterButton);

    expect(screen.getByTestId('recover-dialog')).toHaveAttribute('data-open', 'true');
  });

  it('zamyka dialog po kliknięciu przycisku zamykania', async () => {
    render(<LoginSteps setMasterkey={mockSetMasterkey} />);

    const enterButton = screen.getAllByTestId('button')[1];
    await user.click(enterButton);

    const closeButton = screen.getByTestId('dialog-close');
    await user.click(closeButton);

    expect(screen.getByTestId('recover-dialog')).toHaveAttribute('data-open', 'false');
  });
});