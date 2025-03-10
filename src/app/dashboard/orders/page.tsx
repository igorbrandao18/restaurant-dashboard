'use client';

import { useState, useEffect } from 'react';
import { OrdersService, OrderDto } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

// Interface estendida para incluir o ID
interface OrderWithId extends OrderDto {
  id?: number;
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<OrderWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithId | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isViewingDetails, setIsViewingDetails] = useState<boolean>(false);

  // Carregar pedidos
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      
      setLoading(true);
      try {
        const data = await OrdersService.orderControllerGetAll();
        setOrders(data as OrderWithId[]);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar pedidos:', err);
        setError('Falha ao carregar a lista de pedidos. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  // Função para selecionar um pedido para edição
  const handleSelectOrder = (order: OrderWithId) => {
    setSelectedOrder(order);
    setIsEditing(true);
    setIsViewingDetails(false);
  };

  // Função para visualizar detalhes de um pedido
  const handleViewOrderDetails = (order: OrderWithId) => {
    setSelectedOrder(order);
    setIsViewingDetails(true);
    setIsEditing(false);
  };

  // Função para cancelar a edição/visualização
  const handleCancel = () => {
    setSelectedOrder(null);
    setIsEditing(false);
    setIsViewingDetails(false);
  };

  // Função para atualizar o status de um pedido
  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      const orderToUpdate = orders.find(order => order.id === orderId);
      
      if (!orderToUpdate) {
        setError('Pedido não encontrado.');
        return;
      }
      
      const updatedOrder = {
        ...orderToUpdate,
        status: newStatus
      };
      
      await OrdersService.orderControllerUpdate(orderId, updatedOrder);
      
      // Atualizar a lista de pedidos
      setOrders(prevOrders => 
        prevOrders.map(order => order.id === orderId ? { ...order, status: newStatus } : order)
      );
      
      setError(null);
    } catch (err) {
      console.error('Erro ao atualizar status do pedido:', err);
      setError('Falha ao atualizar o status do pedido. Por favor, tente novamente.');
    }
  };

  // Função para salvar as alterações em um pedido
  const handleSaveOrder = async (updatedOrder: OrderWithId) => {
    try {
      if (selectedOrder && selectedOrder.id) {
        // Atualizar pedido existente
        await OrdersService.orderControllerUpdate(selectedOrder.id, updatedOrder);
        
        // Atualizar a lista de pedidos
        setOrders(prevOrders => 
          prevOrders.map(order => order.id === selectedOrder.id ? { ...updatedOrder, id: selectedOrder.id } : order)
        );
      } else {
        // Criar novo pedido
        const newOrder = await OrdersService.orderControllerCreate(updatedOrder) as OrderWithId;
        
        // Adicionar à lista de pedidos
        setOrders(prevOrders => [...prevOrders, newOrder]);
      }
      
      // Limpar seleção
      setSelectedOrder(null);
      setIsEditing(false);
      setIsViewingDetails(false);
    } catch (err) {
      console.error('Erro ao salvar pedido:', err);
      setError('Falha ao salvar o pedido. Por favor, tente novamente.');
    }
  };

  // Função para formatar o valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para obter a classe de cor com base no status
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PREPARING':
        return 'bg-blue-100 text-blue-800';
      case 'READY':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'ACCEPTED':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para traduzir o status
  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': 'Pendente',
      'PREPARING': 'Preparando',
      'READY': 'Pronto',
      'COMPLETED': 'Concluído',
      'CANCELLED': 'Cancelado',
      'ACCEPTED': 'Aceito',
      'DELIVERED': 'Entregue'
    };
    
    return statusMap[status] || status;
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gerenciamento de Pedidos</h1>
        <p className="text-gray-600">Acompanhe e gerencie os pedidos em tempo real</p>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {isEditing ? (
        <OrderForm 
          order={selectedOrder} 
          onSave={handleSaveOrder} 
          onCancel={handleCancel} 
        />
      ) : isViewingDetails && selectedOrder ? (
        <OrderDetails 
          order={selectedOrder} 
          onUpdateStatus={handleUpdateStatus}
          onEdit={() => setIsEditing(true)}
          onBack={handleCancel}
        />
      ) : (
        <>
          <div className="mb-6">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
            >
              Novo Pedido
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        Nenhum pedido encontrado.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cliente #{order.customerId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(order.total)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(order.status)}`}>
                            {translateStatus(order.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleViewOrderDetails(order)}
                            className="text-blue-500 hover:text-blue-700 mr-3"
                          >
                            Detalhes
                          </button>
                          <button 
                            onClick={() => handleSelectOrder(order)}
                            className="text-primary hover:text-primary-hover"
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

// Componente para exibir detalhes do pedido
interface OrderDetailsProps {
  order: OrderWithId;
  onUpdateStatus: (orderId: number, newStatus: string) => Promise<void>;
  onEdit: () => void;
  onBack: () => void;
}

function OrderDetails({ order, onUpdateStatus, onEdit, onBack }: OrderDetailsProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  // Função para formatar o valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Função para traduzir o status
  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': 'Pendente',
      'PREPARING': 'Preparando',
      'READY': 'Pronto',
      'COMPLETED': 'Concluído',
      'CANCELLED': 'Cancelado',
      'ACCEPTED': 'Aceito',
      'DELIVERED': 'Entregue'
    };
    
    return statusMap[status] || status;
  };
  
  // Função para atualizar o status
  const handleStatusUpdate = async (newStatus: string) => {
    if (!order.id) return;
    
    setIsUpdating(true);
    try {
      await onUpdateStatus(order.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Detalhes do Pedido #{order.id}</h2>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          Voltar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Informações do Pedido</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2"><span className="font-medium">Cliente:</span> #{order.customerId}</p>
            <p className="mb-2"><span className="font-medium">Restaurante:</span> #{order.restaurantId}</p>
            <p className="mb-2"><span className="font-medium">Total:</span> {formatCurrency(order.total)}</p>
            <p><span className="font-medium">Status:</span> {translateStatus(order.status)}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Atualizar Status</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleStatusUpdate('PENDING')}
                disabled={isUpdating || order.status === 'PENDING'}
                className={`px-3 py-2 rounded text-sm ${
                  order.status === 'PENDING' 
                    ? 'bg-yellow-200 text-yellow-800 cursor-default' 
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Pendente
              </button>
              
              <button
                onClick={() => handleStatusUpdate('ACCEPTED')}
                disabled={isUpdating || order.status === 'ACCEPTED'}
                className={`px-3 py-2 rounded text-sm ${
                  order.status === 'ACCEPTED' 
                    ? 'bg-blue-200 text-blue-800 cursor-default' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Aceito
              </button>
              
              <button
                onClick={() => handleStatusUpdate('PREPARING')}
                disabled={isUpdating || order.status === 'PREPARING'}
                className={`px-3 py-2 rounded text-sm ${
                  order.status === 'PREPARING' 
                    ? 'bg-blue-200 text-blue-800 cursor-default' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Preparando
              </button>
              
              <button
                onClick={() => handleStatusUpdate('READY')}
                disabled={isUpdating || order.status === 'READY'}
                className={`px-3 py-2 rounded text-sm ${
                  order.status === 'READY' 
                    ? 'bg-green-200 text-green-800 cursor-default' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Pronto
              </button>
              
              <button
                onClick={() => handleStatusUpdate('DELIVERED')}
                disabled={isUpdating || order.status === 'DELIVERED'}
                className={`px-3 py-2 rounded text-sm ${
                  order.status === 'DELIVERED' 
                    ? 'bg-purple-200 text-purple-800 cursor-default' 
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Entregue
              </button>
              
              <button
                onClick={() => handleStatusUpdate('COMPLETED')}
                disabled={isUpdating || order.status === 'COMPLETED'}
                className={`px-3 py-2 rounded text-sm ${
                  order.status === 'COMPLETED' 
                    ? 'bg-green-200 text-green-800 cursor-default' 
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Concluído
              </button>
              
              <button
                onClick={() => handleStatusUpdate('CANCELLED')}
                disabled={isUpdating || order.status === 'CANCELLED'}
                className={`px-3 py-2 rounded text-sm ${
                  order.status === 'CANCELLED' 
                    ? 'bg-red-200 text-red-800 cursor-default' 
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Cancelado
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Itens do Pedido</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {order.items && order.items.items && order.items.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Preço Unitário</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-sm">Item #{item.menuItemId}</td>
                      <td className="px-4 py-2 text-sm">{item.quantity}</td>
                      <td className="px-4 py-2 text-sm">-</td>
                      <td className="px-4 py-2 text-sm">-</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Total:</td>
                    <td className="px-4 py-2 text-sm font-medium">{formatCurrency(order.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Nenhum item encontrado.</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onEdit}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
        >
          Editar Pedido
        </button>
      </div>
    </div>
  );
}

// Componente de formulário para pedido
interface OrderFormProps {
  order: OrderWithId | null;
  onSave: (order: OrderWithId) => void;
  onCancel: () => void;
}

// Interface para item do pedido
interface OrderItem {
  menuItemId: number;
  quantity: number;
}

function OrderForm({ order, onSave, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderWithId>({
    restaurantId: order?.restaurantId || 1, // Valor padrão, deve ser obtido do usuário autenticado
    customerId: order?.customerId || 1,
    items: order?.items || { items: [] },
    total: order?.total || 0,
    status: order?.status || 'PENDING',
  });

  const [items, setItems] = useState<OrderItem[]>(
    order?.items?.items || []
  );

  // Função para adicionar um novo item
  const handleAddItem = () => {
    const newItem: OrderItem = {
      menuItemId: 0,
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  // Função para remover um item
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Função para atualizar um item
  const handleUpdateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'quantity' ? parseInt(value as string) : parseInt(value as string)
    };
    setItems(updatedItems);
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'total' ? parseFloat(value) : value 
    }));
  };

  // Função para enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Atualizar os itens no formData
    const updatedFormData = {
      ...formData,
      items: {
        items: items
      }
    };
    
    onSave(updatedFormData);
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-xl font-bold mb-6">
        {order ? 'Editar Pedido' : 'Novo Pedido'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
              ID do Cliente
            </label>
            <input
              id="customerId"
              name="customerId"
              type="number"
              value={formData.customerId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              min="1"
            />
          </div>
          
          <div>
            <label htmlFor="restaurantId" className="block text-sm font-medium text-gray-700 mb-1">
              ID do Restaurante
            </label>
            <input
              id="restaurantId"
              name="restaurantId"
              type="number"
              value={formData.restaurantId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              min="1"
            />
          </div>
          
          <div>
            <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-1">
              Total (R$)
            </label>
            <input
              id="total"
              name="total"
              type="number"
              value={formData.total}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="PENDING">Pendente</option>
              <option value="ACCEPTED">Aceito</option>
              <option value="PREPARING">Preparando</option>
              <option value="READY">Pronto</option>
              <option value="DELIVERED">Entregue</option>
              <option value="COMPLETED">Concluído</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Itens do Pedido</h3>
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
            >
              + Adicionar Item
            </button>
          </div>
          
          {items.length === 0 ? (
            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 mb-4">
              Nenhum item adicionado. Clique em "Adicionar Item" para adicionar um item ao pedido.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID do Item do Menu
                      </label>
                      <input
                        type="number"
                        value={item.menuItemId}
                        onChange={(e) => handleUpdateItem(index, 'menuItemId', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        min="1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantidade
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(index, 'quantity', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                        min="1"
                      />
                    </div>
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