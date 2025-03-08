'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { restaurantService } from '@/lib/api/restaurant';
import { orderService } from '@/lib/api/order';
import { Restaurant, Order } from '@/types';
import { Loading } from '@/components/ui/Loading';

const Header = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CardValue = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
`;

const RecentOrders = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const OrdersTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const OrderId = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

const OrderDate = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = styled.span<StatusBadgeProps>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background: ${({ theme, status }) => {
    switch (status) {
      case 'PENDING':
        return theme.colors.warning + '20';
      case 'PREPARING':
        return theme.colors.info + '20';
      case 'READY':
        return theme.colors.success + '20';
      case 'DELIVERED':
        return theme.colors.secondary + '20';
      case 'CANCELLED':
        return theme.colors.danger + '20';
      default:
        return theme.colors.secondary + '20';
    }
  }};
  color: ${({ theme, status }) => {
    switch (status) {
      case 'PENDING':
        return theme.colors.warning;
      case 'PREPARING':
        return theme.colors.info;
      case 'READY':
        return theme.colors.success;
      case 'DELIVERED':
        return theme.colors.secondary;
      case 'CANCELLED':
        return theme.colors.danger;
      default:
        return theme.colors.secondary;
    }
  }};
`;

export default function DashboardPage() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [restaurantData, ordersData] = await Promise.all([
          restaurantService.getProfile(),
          orderService.getAll(),
        ]);

        setRestaurant(restaurantData);
        setRecentOrders(ordersData.slice(0, 5));
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header>
        <Title>Bem-vindo, {restaurant?.name}!</Title>
        <Subtitle>{restaurant?.email}</Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardTitle>Total de Pedidos</CardTitle>
          <CardValue>{restaurant?.orders?.length || 0}</CardValue>
        </Card>
        <Card>
          <CardTitle>Menus Ativos</CardTitle>
          <CardValue>{restaurant?.menus?.length || 0}</CardValue>
        </Card>
        <Card>
          <CardTitle>Pedidos Pendentes</CardTitle>
          <CardValue>
            {restaurant?.orders?.filter((order) => order.status === 'PENDING').length || 0}
          </CardValue>
        </Card>
      </Grid>

      <RecentOrders>
        <OrdersTitle>Últimos Pedidos</OrdersTitle>
        <OrdersList>
          {recentOrders.map((order) => (
            <OrderItem key={order.id}>
              <OrderInfo>
                <OrderId>Pedido #{order.id}</OrderId>
                <OrderDate>
                  {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </OrderDate>
              </OrderInfo>
              <div>
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </div>
            </OrderItem>
          ))}
        </OrdersList>
      </RecentOrders>
    </>
  );
}