'use client';

import { useState, useEffect } from 'react';
import { RestaurantsService, RestaurantDto } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export default function RestaurantsPage() {
  const { isAuthenticated } = useAuth();
  const [restaurants, setRestaurants] = useState<RestaurantDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDto | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Carregar restaurantes
  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!isAuthenticated) return;
      
      setLoading(true);
      try {
        const data = await RestaurantsService.restaurantControllerGetAll();
        setRestaurants(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar restaurantes:', err);
        setError('Falha ao carregar a lista de restaurantes. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [isAuthenticated]);

  // Função para selecionar um restaurante para edição
  const handleSelectRestaurant = (restaurant: RestaurantDto) => {
    setSelectedRestaurant(restaurant);
    setIsEditing(true);
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setSelectedRestaurant(null);
    setIsEditing(false);
  };

  // Função para salvar as alterações
  const handleSaveRestaurant = async (updatedRestaurant: RestaurantDto) => {
    try {
      if (selectedRestaurant) {
        // Atualizar restaurante existente
        await RestaurantsService.restaurantControllerUpdate(Number(selectedRestaurant.id), updatedRestaurant);
        
        // Atualizar a lista de restaurantes
        setRestaurants(prevRestaurants => 
          prevRestaurants.map(r => r.id === selectedRestaurant.id ? updatedRestaurant : r)
        );
      } else {
        // Criar novo restaurante
        const newRestaurant = await RestaurantsService.restaurantControllerCreate(updatedRestaurant);
        
        // Adicionar à lista de restaurantes
        setRestaurants(prevRestaurants => [...prevRestaurants, newRestaurant]);
      }
      
      // Limpar seleção
      setSelectedRestaurant(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Erro ao salvar restaurante:', err);
      setError('Falha ao salvar o restaurante. Por favor, tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gerenciamento de Restaurantes</h1>
        <p className="text-gray-600">Visualize e gerencie informações dos restaurantes</p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {isEditing ? (
        <RestaurantForm 
          restaurant={selectedRestaurant} 
          onSave={handleSaveRestaurant} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <>
          <div className="mb-6">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
            >
              Adicionar Restaurante
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {restaurants.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        Nenhum restaurante encontrado
                      </td>
                    </tr>
                  ) : (
                    restaurants.map((restaurant) => (
                      <tr key={restaurant.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{restaurant.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{restaurant.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleSelectRestaurant(restaurant)}
                            className="text-primary hover:text-primary-hover mr-3"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Componente de formulário para restaurante
interface RestaurantFormProps {
  restaurant: RestaurantDto | null;
  onSave: (restaurant: RestaurantDto) => void;
  onCancel: () => void;
}

function RestaurantForm({ restaurant, onSave, onCancel }: RestaurantFormProps) {
  const [formData, setFormData] = useState<RestaurantDto>({
    name: restaurant?.name || '',
    address: restaurant?.address || '',
    city: restaurant?.city || '',
    country: restaurant?.country || '',
    username: restaurant?.username || '',
    password: restaurant?.password || '',
    webSettings: restaurant?.webSettings || {
      bannerImage: '',
      backgroundColour: '#ffffff',
      primaryColour: '#4f372f',
      primaryColourHover: '#4f372f',
      navBackgroundColour: '#4f372f',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWebSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      webSettings: {
        ...prev.webSettings,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-xl font-bold mb-6">
        {restaurant ? 'Editar Restaurante' : 'Adicionar Restaurante'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Restaurante
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              País
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nome de Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required={!restaurant}
              placeholder={restaurant ? '••••••••' : ''}
            />
            {restaurant && (
              <p className="text-xs text-gray-500 mt-1">Deixe em branco para manter a senha atual</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-4">Configurações Visuais</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem do Banner
              </label>
              <input
                id="bannerImage"
                name="bannerImage"
                type="text"
                value={formData.webSettings.bannerImage}
                onChange={handleWebSettingsChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="backgroundColour" className="block text-sm font-medium text-gray-700 mb-1">
                Cor de Fundo
              </label>
              <div className="flex items-center">
                <input
                  id="backgroundColour"
                  name="backgroundColour"
                  type="color"
                  value={formData.webSettings.backgroundColour}
                  onChange={handleWebSettingsChange}
                  className="h-10 w-10 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={formData.webSettings.backgroundColour}
                  onChange={handleWebSettingsChange}
                  name="backgroundColour"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="primaryColour" className="block text-sm font-medium text-gray-700 mb-1">
                Cor Primária
              </label>
              <div className="flex items-center">
                <input
                  id="primaryColour"
                  name="primaryColour"
                  type="color"
                  value={formData.webSettings.primaryColour}
                  onChange={handleWebSettingsChange}
                  className="h-10 w-10 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={formData.webSettings.primaryColour}
                  onChange={handleWebSettingsChange}
                  name="primaryColour"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="navBackgroundColour" className="block text-sm font-medium text-gray-700 mb-1">
                Cor de Fundo da Navegação
              </label>
              <div className="flex items-center">
                <input
                  id="navBackgroundColour"
                  name="navBackgroundColour"
                  type="color"
                  value={formData.webSettings.navBackgroundColour}
                  onChange={handleWebSettingsChange}
                  className="h-10 w-10 border border-gray-300 rounded mr-2"
                />
                <input
                  type="text"
                  value={formData.webSettings.navBackgroundColour}
                  onChange={handleWebSettingsChange}
                  name="navBackgroundColour"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
} 