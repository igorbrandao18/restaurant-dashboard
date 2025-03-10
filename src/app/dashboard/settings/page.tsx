'use client';

import { useState, useEffect } from 'react';
import { RestaurantsService, RestaurantDto } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

// Interface estendida para incluir o ID
interface RestaurantWithId extends RestaurantDto {
  id?: number;
}

export default function SettingsPage() {
  const { isAuthenticated, user } = useAuth();
  const [restaurant, setRestaurant] = useState<RestaurantWithId | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Carregar dados do restaurante
  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      if (!isAuthenticated) return;
      
      setLoading(true);
      try {
        const data = await RestaurantsService.restaurantControllerGetProfile();
        setRestaurant(data as RestaurantWithId);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar perfil do restaurante:', err);
        setError('Falha ao carregar as informações do restaurante. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantProfile();
  }, [isAuthenticated]);

  // Função para salvar as alterações
  const handleSaveSettings = async (updatedRestaurant: RestaurantWithId) => {
    if (!restaurant || !restaurant.id) {
      setError('Não foi possível identificar o restaurante para atualização.');
      return;
    }
    
    setSaving(true);
    setSuccess(null);
    setError(null);
    
    try {
      await RestaurantsService.restaurantControllerUpdate(restaurant.id, updatedRestaurant);
      setRestaurant(updatedRestaurant);
      setSuccess('Configurações salvas com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar configurações:', err);
      setError('Falha ao salvar as configurações. Por favor, tente novamente.');
    } finally {
      setSaving(false);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do seu restaurante</p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
          {success}
        </div>
      )}

      {restaurant ? (
        <SettingsForm 
          restaurant={restaurant} 
          onSave={handleSaveSettings} 
          isSaving={saving}
        />
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
          Nenhuma informação de restaurante encontrada. Verifique sua autenticação.
        </div>
      )}
    </div>
  );
}

// Componente de formulário para configurações
interface SettingsFormProps {
  restaurant: RestaurantWithId;
  onSave: (restaurant: RestaurantWithId) => void;
  isSaving: boolean;
}

function SettingsForm({ restaurant, onSave, isSaving }: SettingsFormProps) {
  const [formData, setFormData] = useState<RestaurantWithId>({
    ...restaurant,
    // Não incluir a senha no formulário para evitar alterações acidentais
    password: '',
  });

  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'security'>('general');

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para lidar com mudanças nas configurações visuais
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

  // Função para enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Se a senha estiver vazia, usar a senha atual
    const dataToSave = {
      ...formData,
      password: formData.password || restaurant.password,
    };
    
    onSave(dataToSave);
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="flex border-b border-gray-200">
        <button
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'general' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('general')}
        >
          Informações Gerais
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'appearance' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('appearance')}
        >
          Aparência
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm ${
            activeTab === 'security' 
              ? 'text-primary border-b-2 border-primary' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('security')}
        >
          Segurança
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        {/* Informações Gerais */}
        {activeTab === 'general' && (
          <div className="space-y-6">
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
            </div>
          </div>
        )}
        
        {/* Aparência */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
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
              {formData.webSettings.bannerImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Pré-visualização:</p>
                  <div className="h-32 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={formData.webSettings.bannerImage} 
                      alt="Banner Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x200?text=Banner+Preview';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label htmlFor="primaryColourHover" className="block text-sm font-medium text-gray-700 mb-1">
                  Cor Primária (Hover)
                </label>
                <div className="flex items-center">
                  <input
                    id="primaryColourHover"
                    name="primaryColourHover"
                    type="color"
                    value={formData.webSettings.primaryColourHover}
                    onChange={handleWebSettingsChange}
                    className="h-10 w-10 border border-gray-300 rounded mr-2"
                  />
                  <input
                    type="text"
                    value={formData.webSettings.primaryColourHover}
                    onChange={handleWebSettingsChange}
                    name="primaryColourHover"
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
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Pré-visualização</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  style={{ backgroundColor: formData.webSettings.navBackgroundColour }} 
                  className="p-4 text-white"
                >
                  <div className="font-bold">Barra de Navegação</div>
                </div>
                <div 
                  style={{ backgroundColor: formData.webSettings.backgroundColour }}
                  className="p-6"
                >
                  <h2 className="text-xl font-bold mb-4">Conteúdo da Página</h2>
                  <button 
                    style={{ 
                      backgroundColor: formData.webSettings.primaryColour,
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = formData.webSettings.primaryColourHover;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = formData.webSettings.primaryColour;
                    }}
                    type="button"
                  >
                    Botão de Exemplo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Segurança */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Nova Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Deixe em branco para manter a senha atual"
              />
              <p className="mt-1 text-sm text-gray-500">
                Deixe em branco para manter a senha atual.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Dicas de Segurança</h3>
              <ul className="list-disc pl-5 text-yellow-700 space-y-1">
                <li>Use uma senha forte com pelo menos 8 caracteres</li>
                <li>Combine letras maiúsculas, minúsculas, números e símbolos</li>
                <li>Evite usar informações pessoais facilmente identificáveis</li>
                <li>Não compartilhe suas credenciais com terceiros</li>
                <li>Altere sua senha regularmente para maior segurança</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  );
} 