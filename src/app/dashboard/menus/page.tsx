'use client';

import { useState, useEffect } from 'react';
import { MenusService, MenuDto } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

// Interface estendida para incluir o ID
interface MenuWithId extends MenuDto {
  id?: number;
}

export default function MenusPage() {
  const { isAuthenticated } = useAuth();
  const [menus, setMenus] = useState<MenuWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuWithId | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Carregar menus
  useEffect(() => {
    const fetchMenus = async () => {
      if (!isAuthenticated) return;
      
      setLoading(true);
      try {
        const data = await MenusService.menuControllerGetAll();
        setMenus(data as MenuWithId[]);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar menus:', err);
        setError('Falha ao carregar a lista de menus. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [isAuthenticated]);

  // Função para selecionar um menu para edição
  const handleSelectMenu = (menu: MenuWithId) => {
    setSelectedMenu(menu);
    setIsEditing(true);
  };

  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setSelectedMenu(null);
    setIsEditing(false);
  };

  // Função para salvar as alterações
  const handleSaveMenu = async (updatedMenu: MenuWithId) => {
    try {
      if (selectedMenu && selectedMenu.id) {
        // Atualizar menu existente
        await MenusService.menuControllerUpdate(selectedMenu.id, updatedMenu);
        
        // Atualizar a lista de menus
        setMenus(prevMenus => 
          prevMenus.map(m => m.id === selectedMenu.id ? { ...updatedMenu, id: selectedMenu.id } : m)
        );
      } else {
        // Criar novo menu
        const newMenu = await MenusService.menuControllerCreate(updatedMenu) as MenuWithId;
        
        // Adicionar à lista de menus
        setMenus(prevMenus => [...prevMenus, newMenu]);
      }
      
      // Limpar seleção
      setSelectedMenu(null);
      setIsEditing(false);
    } catch (err) {
      console.error('Erro ao salvar menu:', err);
      setError('Falha ao salvar o menu. Por favor, tente novamente.');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gerenciamento de Menus</h1>
        <p className="text-gray-600">Crie e gerencie menus, categorias e itens</p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {isEditing ? (
        <MenuForm 
          menu={selectedMenu} 
          onSave={handleSaveMenu} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <>
          <div className="mb-6">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
            >
              Adicionar Menu
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.length === 0 ? (
              <div className="col-span-full bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                Nenhum menu encontrado. Clique em "Adicionar Menu" para criar um novo.
              </div>
            ) : (
              menus.map((menu) => (
                <div 
                  key={menu.id} 
                  className="bg-white rounded-lg shadow-card overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{menu.name}</h2>
                    <p className="text-gray-600 mb-4">
                      Tipo: {menu.type}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {menu.sections && typeof menu.sections === 'object' && 'sections' in menu.sections
                        ? `${menu.sections.sections.length} categorias`
                        : '0 categorias'}
                    </p>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleSelectMenu(menu)}
                        className="text-primary hover:text-primary-hover"
                      >
                        Editar Menu
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Componente de formulário para menu
interface MenuFormProps {
  menu: MenuWithId | null;
  onSave: (menu: MenuWithId) => void;
  onCancel: () => void;
}

// Interface para seção do menu
interface MenuSection {
  id?: number;
  name: string;
  description: string;
  position: number;
  visible: number;
  items: MenuItem[];
}

// Interface para item do menu
interface MenuItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

function MenuForm({ menu, onSave, onCancel }: MenuFormProps) {
  const [formData, setFormData] = useState<MenuWithId>({
    restaurantId: menu?.restaurantId || 1, // Valor padrão, deve ser obtido do usuário autenticado
    name: menu?.name || '',
    type: menu?.type || 'MENU',
    collapse: menu?.collapse || 0,
    sections: menu?.sections || {
      sections: []
    },
  });

  const [sections, setSections] = useState<MenuSection[]>(
    menu?.sections && typeof menu.sections === 'object' && 'sections' in menu.sections
      ? menu.sections.sections
      : []
  );

  // Função para adicionar uma nova seção
  const handleAddSection = () => {
    const newSection: MenuSection = {
      name: '',
      description: '',
      position: sections.length,
      visible: 1,
      items: []
    };
    setSections([...sections, newSection]);
  };

  // Função para remover uma seção
  const handleRemoveSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    // Atualizar as posições
    updatedSections.forEach((section, idx) => {
      section.position = idx;
    });
    setSections(updatedSections);
  };

  // Função para atualizar uma seção
  const handleUpdateSection = (index: number, field: string, value: string | number) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };
    setSections(updatedSections);
  };

  // Função para adicionar um novo item a uma seção
  const handleAddItem = (sectionIndex: number) => {
    const updatedSections = [...sections];
    const newItem: MenuItem = {
      name: '',
      description: '',
      price: 0,
      available: true
    };
    updatedSections[sectionIndex].items.push(newItem);
    setSections(updatedSections);
  };

  // Função para remover um item de uma seção
  const handleRemoveItem = (sectionIndex: number, itemIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.splice(itemIndex, 1);
    setSections(updatedSections);
  };

  // Função para atualizar um item
  const handleUpdateItem = (sectionIndex: number, itemIndex: number, field: string, value: string | number | boolean) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items[itemIndex] = {
      ...updatedSections[sectionIndex].items[itemIndex],
      [field]: field === 'price' ? parseFloat(value as string) : value
    };
    setSections(updatedSections);
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Atualizar as seções no formData
    const updatedFormData = {
      ...formData,
      sections: {
        sections: sections
      }
    };
    
    onSave(updatedFormData);
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-xl font-bold mb-6">
        {menu ? 'Editar Menu' : 'Adicionar Menu'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Menu
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
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Menu
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="MENU">Menu Principal</option>
              <option value="DRINKS">Bebidas</option>
              <option value="DESSERTS">Sobremesas</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="collapse" className="block text-sm font-medium text-gray-700 mb-1">
              Estado Inicial
            </label>
            <select
              id="collapse"
              name="collapse"
              value={formData.collapse}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value={0}>Expandido</option>
              <option value={1}>Colapsado</option>
            </select>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Categorias</h3>
            <button
              type="button"
              onClick={handleAddSection}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
            >
              + Adicionar Categoria
            </button>
          </div>
          
          {sections.length === 0 ? (
            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 mb-4">
              Nenhuma categoria adicionada. Clique em "Adicionar Categoria" para criar uma.
            </div>
          ) : (
            <div className="space-y-6">
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Categoria {sectionIndex + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(sectionIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Categoria
                      </label>
                      <input
                        type="text"
                        value={section.name}
                        onChange={(e) => handleUpdateSection(sectionIndex, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descrição
                      </label>
                      <input
                        type="text"
                        value={section.description}
                        onChange={(e) => handleUpdateSection(sectionIndex, 'description', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Posição
                      </label>
                      <input
                        type="number"
                        value={section.position}
                        onChange={(e) => handleUpdateSection(sectionIndex, 'position', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Visível
                      </label>
                      <select
                        value={section.visible}
                        onChange={(e) => handleUpdateSection(sectionIndex, 'visible', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value={1}>Sim</option>
                        <option value={0}>Não</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-sm font-medium">Itens</h5>
                      <button
                        type="button"
                        onClick={() => handleAddItem(sectionIndex)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                      >
                        + Adicionar Item
                      </button>
                    </div>
                    
                    {section.items.length === 0 ? (
                      <div className="bg-gray-50 p-3 rounded text-center text-gray-500 text-sm">
                        Nenhum item adicionado.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="border border-gray-200 rounded p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h6 className="text-sm">Item {itemIndex + 1}</h6>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(sectionIndex, itemIndex)}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                Remover
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Nome do Item
                                </label>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => handleUpdateItem(sectionIndex, itemIndex, 'name', e.target.value)}
                                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Descrição
                                </label>
                                <input
                                  type="text"
                                  value={item.description}
                                  onChange={(e) => handleUpdateItem(sectionIndex, itemIndex, 'description', e.target.value)}
                                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Preço (R$)
                                </label>
                                <input
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => handleUpdateItem(sectionIndex, itemIndex, 'price', e.target.value)}
                                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                                  step="0.01"
                                  min="0"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Disponível
                                </label>
                                <select
                                  value={item.available ? 'true' : 'false'}
                                  onChange={(e) => handleUpdateItem(sectionIndex, itemIndex, 'available', e.target.value === 'true')}
                                  className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-sm"
                                >
                                  <option value="true">Sim</option>
                                  <option value="false">Não</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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