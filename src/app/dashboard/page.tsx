'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Definindo a interface para os pedidos
interface Order {
  id: number;
  customer: string;
  items: number;
  total: string;
  status: string;
  time: string;
}

// Interface para os dados do dashboard
interface DashboardData {
  restaurantName: string;
  totalOrders: string;
  pendingOrders: string;
  completedOrders: string;
  totalMenuItems: string;
  recentOrders: Order[];
  isLoading: boolean;
}

// Componente de card para estatísticas
const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => (
  <div className="bg-white rounded-lg shadow-card p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
      <span className={`text-2xl ${color}`}>{icon}</span>
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default function Dashboard() {
  // Estado para armazenar dados do dashboard (simulados por enquanto)
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    restaurantName: 'Restaurante Demo',
    totalOrders: '0',
    pendingOrders: '0',
    completedOrders: '0',
    totalMenuItems: '0',
    recentOrders: [],
    isLoading: true,
  });

  // Simular carregamento de dados
  useEffect(() => {
    const loadDashboardData = async () => {
      // Simulando uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDashboardData({
        restaurantName: 'Burger House',
        totalOrders: '156',
        pendingOrders: '12',
        completedOrders: '144',
        totalMenuItems: '48',
        recentOrders: [
          { id: 1, customer: 'João Silva', items: 3, total: 'R$ 87,50', status: 'Pendente', time: '15 min atrás' },
          { id: 2, customer: 'Maria Oliveira', items: 2, total: 'R$ 45,90', status: 'Preparando', time: '30 min atrás' },
          { id: 3, customer: 'Pedro Santos', items: 5, total: 'R$ 124,30', status: 'Entregue', time: '1 hora atrás' },
          { id: 4, customer: 'Ana Costa', items: 1, total: 'R$ 32,00', status: 'Entregue', time: '2 horas atrás' },
        ],
        isLoading: false,
      });
    };

    loadDashboardData();
  }, []);

  if (dashboardData.isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao painel de controle do {dashboardData.restaurantName}</p>
      </header>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total de Pedidos" 
          value={dashboardData.totalOrders} 
          icon="📊" 
          color="text-blue-500" 
        />
        <StatCard 
          title="Pedidos Pendentes" 
          value={dashboardData.pendingOrders} 
          icon="⏳" 
          color="text-yellow-500" 
        />
        <StatCard 
          title="Pedidos Concluídos" 
          value={dashboardData.completedOrders} 
          icon="✅" 
          color="text-green-500" 
        />
        <StatCard 
          title="Itens no Menu" 
          value={dashboardData.totalMenuItems} 
          icon="🍔" 
          color="text-red-500" 
        />
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Pedidos Recentes</h2>
          <Link 
            href="/dashboard/orders" 
            className="text-primary hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Itens</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'Preparando' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Links rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/orders/new" className="block p-6 bg-white rounded-lg shadow-card hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-primary mb-2">Novo Pedido</h3>
          <p className="text-gray-600">Criar um novo pedido manualmente</p>
        </Link>
        <Link href="/dashboard/menus" className="block p-6 bg-white rounded-lg shadow-card hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-primary mb-2">Gerenciar Menu</h3>
          <p className="text-gray-600">Atualizar itens e categorias do menu</p>
        </Link>
        <Link href="/dashboard/settings" className="block p-6 bg-white rounded-lg shadow-card hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-primary mb-2">Configurações</h3>
          <p className="text-gray-600">Atualizar informações do restaurante</p>
        </Link>
      </div>
    </div>
  );
} 