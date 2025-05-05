import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableWidget } from '../src/components/TableWidget';
import { usePasswordContext } from '@/data/PasswordContext';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, ...props }) => (
    <button
      data-testid={variant === 'outline' ? 'action-button' : 'button'}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));
jest.mock('@/components/DataTable', () => ({
  DataTable: () => <div data-testid="data-table">DataTable</div>,
}));
jest.mock('@/components/LoginSteps', () => ({
  LoginSteps: ({ setMasterkey }) => (
    <div data-testid="login-steps">LoginSteps</div>
  ),
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
  LogOut: () => <span data-testid="logout-icon">LogOutIcon</span>,
  Key: () => <span data-testid="key-icon">KeyIcon</span>,
}));
jest.mock('@/data/PasswordContext', () => ({
  usePasswordContext: jest.fn(),
}));

describe('TableWidget', () => {
  const user = userEvent.setup();
  const mockSetMasterkey = jest.fn();
  const mockLocalStorageRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
  const mockWindowLocationReload = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: mockWindowLocationReload },
      writable: true,
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorageRemoveItem.mockReset();
    mockWindowLocationReload.mockReset();
  });

  it('renderuje LoginSteps gdy token jest pusty', () => {
    usePasswordContext.mockReturnValue({
      state: { token: null },
      setMasterkey: mockSetMasterkey,
    });

    render(<TableWidget />);

    expect(screen.getByTestId('login-steps')).toBeInTheDocument();
    expect(screen.queryByTestId('data-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('action-button')).not.toBeInTheDocument();
  });

  it('renderuje DataTable i przyciski gdy token istnieje', () => {
    usePasswordContext.mockReturnValue({
      state: { token: 'valid-token' },
      setMasterkey: mockSetMasterkey,
    });

    render(<TableWidget />);

    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getAllByTestId('action-button')).toHaveLength(2);
    expect(screen.getByText('Wyloguj')).toBeInTheDocument();
    expect(screen.getByText('Zmień Masterkey')).toBeInTheDocument();
    expect(screen.getByTestId('logout-icon')).toBeInTheDocument();
    expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    expect(screen.getByTestId('recover-dialog')).toHaveAttribute('data-open', 'false');
    expect(screen.queryByTestId('login-steps')).not.toBeInTheDocument();
  });

  it('wylogowuje po kliknięciu przycisku wylogowania', async () => {
    usePasswordContext.mockReturnValue({
      state: { token: 'valid-token' },
      setMasterkey: mockSetMasterkey,
    });

    render(<TableWidget />);

    const logoutButton = screen.getAllByTestId('action-button')[0];
    await user.click(logoutButton);

    expect(mockLocalStorageRemoveItem).toHaveBeenCalledWith('jwt_token');
    expect(mockWindowLocationReload).toHaveBeenCalled();
  });

  it('otwiera dialog po kliknięciu przycisku zmiany masterkey', async () => {
    usePasswordContext.mockReturnValue({
      state: { token: 'valid-token' },
      setMasterkey: mockSetMasterkey,
    });

    render(<TableWidget />);

    const changeMasterkeyButton = screen.getAllByTestId('action-button')[1];
    await user.click(changeMasterkeyButton);

    expect(screen.getByTestId('recover-dialog')).toHaveAttribute('data-open', 'true');
  });

  it('zamyka dialog po kliknięciu przycisku zamykania', async () => {
    usePasswordContext.mockReturnValue({
      state: { token: 'valid-token' },
      setMasterkey: mockSetMasterkey,
    });

    render(<TableWidget />);

    const changeMasterkeyButton = screen.getAllByTestId('action-button')[1];
    await user.click(changeMasterkeyButton);

    const closeButton = screen.getByTestId('dialog-close');
    await user.click(closeButton);

    expect(screen.getByTestId('recover-dialog')).toHaveAttribute('data-open', 'false');
  });
});