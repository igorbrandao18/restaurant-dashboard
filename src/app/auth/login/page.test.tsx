import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'styled-components';
import LoginPage from './page';
import { authService } from '@/lib/api/services';
import { theme } from '@/styles/theme';

// Mock dos serviços
jest.mock('@/lib/api/services', () => ({
  authService: {
    login: jest.fn(),
  },
}));

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('LoginPage', () => {
  const router = useRouter();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o formulário de login corretamente', () => {
    renderWithTheme(<LoginPage />);

    expect(screen.getByText('Bem-vindo ao QikServe')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome de Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('exibe erro quando as credenciais são inválidas', async () => {
    const errorMessage = 'Credenciais inválidas';
    (authService.login as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    renderWithTheme(<LoginPage />);

    await userEvent.type(screen.getByLabelText('Nome de Usuário'), 'testuser');
    await userEvent.type(screen.getByLabelText('Senha'), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('redireciona para o dashboard após login bem-sucedido', async () => {
    const mockToken = 'fake-token';
    (authService.login as jest.Mock).mockResolvedValueOnce({ token: mockToken });

    renderWithTheme(<LoginPage />);

    await userEvent.type(screen.getByLabelText('Nome de Usuário'), 'testuser');
    await userEvent.type(screen.getByLabelText('Senha'), 'correctpassword');
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    });
  });

  it('desabilita o botão durante o processo de login', async () => {
    (authService.login as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderWithTheme(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Entrando...');
  });
}); 