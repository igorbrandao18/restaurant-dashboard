import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary font-heading">
          Dashboard de Restaurantes
        </h1>
        <p className="text-lg mb-8">
          Sistema de gerenciamento para restaurantes, menus e pedidos
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-3 text-primary">Gerenciamento de Restaurantes</h2>
            <p className="mb-4">Cadastre e gerencie informações dos restaurantes, incluindo configurações visuais.</p>
            <Link 
              href="/login" 
              className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition-colors"
            >
              Acessar
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-3 text-primary">Gerenciamento de Menus</h2>
            <p className="mb-4">Crie e edite menus, categorias e itens para seus restaurantes.</p>
            <Link 
              href="/login" 
              className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition-colors"
            >
              Acessar
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-3 text-primary">Gerenciamento de Pedidos</h2>
            <p className="mb-4">Acompanhe e gerencie pedidos em tempo real.</p>
            <Link 
              href="/login" 
              className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-hover transition-colors"
            >
              Acessar
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-3 text-primary">Documentação da API</h2>
            <p className="mb-4">Acesse a documentação completa da API para integração.</p>
            <Link 
              href="/api-docs" 
              className="inline-block bg-secondary text-primary px-6 py-2 rounded hover:bg-secondary-hover transition-colors"
            >
              Ver Documentação
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 