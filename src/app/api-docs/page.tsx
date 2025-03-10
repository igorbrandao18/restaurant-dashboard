'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import Link from 'next/link';

export default function ApiDocs() {
  const [spec, setSpec] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSwaggerSpec = async () => {
      try {
        const response = await fetch('http://192.168.0.127:3001/api-json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Falha ao buscar documentação da API: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setSpec(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar especificação Swagger:', err);
        setError(err instanceof Error ? err.message : 'Falha ao carregar documentação da API');
        setLoading(false);
      }
    };

    fetchSwaggerSpec();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Documentação da API</h1>
          <Link href="/" className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition-colors">
            Voltar
          </Link>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {loading && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Carregando documentação da API...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-3xl mx-auto my-8">
            <h2 className="text-xl font-bold mb-2">Erro ao carregar documentação</h2>
            <p className="mb-4">{error}</p>
            <p className="mb-4">
              Certifique-se de que o servidor da API está em execução e acessível em:
              <code className="block bg-red-100 p-2 mt-2 rounded">http://192.168.0.127:3001/api-json</code>
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}
        
        {!loading && !error && spec && (
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <SwaggerUI 
              spec={spec} 
              docExpansion="list"
              defaultModelsExpandDepth={1}
              displayOperationId={false}
            />
          </div>
        )}
      </main>
    </div>
  );
} 