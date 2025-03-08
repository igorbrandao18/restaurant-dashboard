import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'styled-components';
import RegisterPage from './page';
import { restaurantService } from '@/lib/api/services';
import { theme } from '@/styles/theme';

// Mock dos serviços
jest.mock('@/lib/api/services', () => ({
  restaurantService: {
    create: jest.fn(),
  },
}));

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('RegisterPage', () => {
  const router = useRouter();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o formulário de registro corretamente', () => {
    renderWithTheme(<RegisterPage />);

    expect(screen.getByText('Criar Conta do Restaurante')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome do Restaurante')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome de Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Endereço')).toBeInTheDocument();
    expect(screen.getByLabelText('Cidade')).toBeInTheDocument();
    expect(screen.getByLabelText('País')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Criar Conta' })).toBeInTheDocument();
  });

  it('submete o formulário com dados válidos', async () => {
    const mockRestaurantData = {
      name: 'Restaurante Teste',
      username: 'testuser',
      password: 'testpass',
      address: 'Rua Teste, 123',
      city: 'Cidade Teste',
      country: 'País Teste',
      webSettings: {
        bannerImage: 'https://example.com/banner.jpg',
        backgroundColour: '#ffffff',
        primaryColour: '#4F46E5',
        primaryColourHover: '#4338CA',
        navBackgroundColour: '#4F46E5'
      }
    };

    (restaurantService.create as jest.Mock).mockResolvedValueOnce(mockRestaurantData);

    renderWithTheme(<RegisterPage />);

    await userEvent.type(screen.getByLabelText('Nome do Restaurante'), mockRestaurantData.name);
    await userEvent.type(screen.getByLabelText('Nome de Usuário'), mockRestaurantData.username);
    await userEvent.type(screen.getByLabelText('Senha'), mockRestaurantData.password);
    await userEvent.type(screen.getByLabelText('Endereço'), mockRestaurantData.address);
    await userEvent.type(screen.getByLabelText('Cidade'), mockRestaurantData.city);
    await userEvent.type(screen.getByLabelText('País'), mockRestaurantData.country);

    await userEvent.click(screen.getByRole('button', { name: 'Criar Conta' }));

    await waitFor(() => {
      expect(restaurantService.create).toHaveBeenCalledWith(mockRestaurantData);
      expect(router.push).toHaveBeenCalledWith('/auth/login');
    });
  });

  it('exibe erro quando o registro falha', async () => {
    const errorMessage = 'Nome de usuário já existe';
    (restaurantService.create as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    renderWithTheme(<RegisterPage />);

    await userEvent.type(screen.getByLabelText('Nome do Restaurante'), 'Test Restaurant');
    await userEvent.type(screen.getByLabelText('Nome de Usuário'), 'existinguser');
    await userEvent.type(screen.getByLabelText('Senha'), 'password123');
    await userEvent.type(screen.getByLabelText('Endereço'), 'Test Address');
    await userEvent.type(screen.getByLabelText('Cidade'), 'Test City');
    await userEvent.type(screen.getByLabelText('País'), 'Test Country');

    await userEvent.click(screen.getByRole('button', { name: 'Criar Conta' }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('desabilita o botão durante o processo de registro', async () => {
    (restaurantService.create as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderWithTheme(<RegisterPage />);

    const submitButton = screen.getByRole('button', { name: 'Criar Conta' });
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Criando...');
  });
}); 