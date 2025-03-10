'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Divider
} from '@mui/material';
import { 
  Restaurant as RestaurantIcon, 
  MenuBook as MenuIcon, 
  ShoppingCart as OrderIcon, 
  AttachMoney as MoneyIcon,
  CheckCircle,
  ArrowForward,
  Settings,
  Edit
} from '@mui/icons-material';

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

// Componente de card estatístico
const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: React.ReactNode; color: string }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      p: 3
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}.light`,
            color: `${color}.dark`,
            borderRadius: '50%',
            p: 1,
            mr: 2,
            width: 48,
            height: 48
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 'auto' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    restaurantName: '',
    totalOrders: '0',
    pendingOrders: '0',
    completedOrders: '0',
    totalMenuItems: '0',
    recentOrders: [],
    isLoading: true,
  });

  useEffect(() => {
    // Simular carregamento de dados
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simulando uma chamada de API
    setTimeout(() => {
      setDashboardData({
        restaurantName: 'Restaurante Demo',
        totalOrders: '156',
        pendingOrders: '23',
        completedOrders: '133',
        totalMenuItems: '48',
        recentOrders: [
          { id: 1, customer: 'João Silva', items: 3, total: 'R$ 89,90', status: 'completed', time: '10:30' },
          { id: 2, customer: 'Maria Oliveira', items: 2, total: 'R$ 67,80', status: 'pending', time: '11:15' },
          { id: 3, customer: 'Pedro Santos', items: 5, total: 'R$ 125,50', status: 'completed', time: '12:00' },
          { id: 4, customer: 'Ana Souza', items: 1, total: 'R$ 32,90', status: 'pending', time: '12:45' },
          { id: 5, customer: 'Carlos Ferreira', items: 4, total: 'R$ 98,70', status: 'completed', time: '13:30' },
        ],
        isLoading: false,
      });
    }, 1500);
  };

  // Função para renderizar o chip de status
  const renderStatusChip = (status: string) => {
    let color: 'success' | 'warning' | 'error' | 'default' = 'default';
    let label = status;

    switch (status) {
      case 'completed':
        color = 'success';
        label = 'Concluído';
        break;
      case 'pending':
        color = 'warning';
        label = 'Pendente';
        break;
      case 'cancelled':
        color = 'error';
        label = 'Cancelado';
        break;
    }

    return <Chip size="small" color={color} label={label} />;
  };

  if (dashboardData.isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Bem-vindo ao Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visão geral do seu restaurante e pedidos recentes
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total de Pedidos" 
            value={dashboardData.totalOrders} 
            icon={<OrderIcon />} 
            color="primary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Pedidos Pendentes" 
            value={dashboardData.pendingOrders} 
            icon={<OrderIcon />} 
            color="warning" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Pedidos Concluídos" 
            value={dashboardData.completedOrders} 
            icon={<CheckCircle />} 
            color="success" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Itens no Menu" 
            value={dashboardData.totalMenuItems} 
            icon={<MenuIcon />} 
            color="info" 
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Pedidos Recentes
          </Typography>
          <Button 
            variant="outlined" 
            component={Link} 
            href="/dashboard/orders"
            endIcon={<ArrowForward />}
          >
            Ver Todos
          </Button>
        </Box>
        
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell align="center">Itens</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Hora</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardData.recentOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell align="center">{order.items}</TableCell>
                  <TableCell align="right">{order.total}</TableCell>
                  <TableCell align="center">
                    {renderStatusChip(order.status)}
                  </TableCell>
                  <TableCell align="right">{order.time}</TableCell>
                  <TableCell align="center">
                    <Button 
                      size="small" 
                      component={Link} 
                      href={`/dashboard/orders?id=${order.id}`}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Acesso Rápido
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  component={Link} 
                  href="/dashboard/menus" 
                  startIcon={<MenuIcon />}
                  sx={{ py: 1.5, justifyContent: 'flex-start' }}
                >
                  Gerenciar Menus
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  component={Link} 
                  href="/dashboard/orders" 
                  startIcon={<OrderIcon />}
                  sx={{ py: 1.5, justifyContent: 'flex-start' }}
                >
                  Gerenciar Pedidos
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  component={Link} 
                  href="/dashboard/restaurants" 
                  startIcon={<RestaurantIcon />}
                  sx={{ py: 1.5, justifyContent: 'flex-start' }}
                >
                  Gerenciar Restaurante
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  component={Link} 
                  href="/dashboard/settings" 
                  startIcon={<Settings />}
                  sx={{ py: 1.5, justifyContent: 'flex-start' }}
                >
                  Configurações
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Informações do Restaurante
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Nome
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {dashboardData.restaurantName}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Endereço
              </Typography>
              <Typography variant="body1">
                Av. Exemplo, 123 - Centro
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Contato
              </Typography>
              <Typography variant="body1">
                (11) 98765-4321
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button 
                variant="contained" 
                component={Link} 
                href="/dashboard/settings"
                endIcon={<Edit />}
              >
                Editar Informações
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 