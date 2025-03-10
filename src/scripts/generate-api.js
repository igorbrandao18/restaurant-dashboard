/**
 * Script para gerar código TypeScript a partir da documentação Swagger
 * 
 * Este script:
 * 1. Baixa o arquivo JSON da API Swagger
 * 2. Gera código TypeScript usando openapi-typescript-codegen
 * 3. Configura a URL base da API
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Configurações
const API_URL = 'http://192.168.0.127:3001/api-json';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'services', 'api');
const TEMP_FILE = path.resolve(__dirname, '..', '..', 'swagger.json');

/**
 * Baixa o arquivo JSON da API Swagger
 * @returns {Promise<void>}
 */
function downloadSwaggerJson() {
  return new Promise((resolve, reject) => {
    console.log(`Downloading Swagger JSON from ${API_URL}...`);
    
    // Determinar se é http ou https
    const client = API_URL.startsWith('https') ? https : http;
    
    const request = client.get(API_URL, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download Swagger JSON: ${response.statusCode} ${response.statusMessage}`));
        return;
      }

      const chunks = [];
      
      response.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
      });
      
      response.on('end', () => {
        const data = Buffer.concat(chunks).toString('utf-8');
        
        try {
          // Verificar se o JSON é válido
          const jsonData = JSON.parse(data);
          
          // Salvar o arquivo JSON
          fs.writeFileSync(TEMP_FILE, JSON.stringify(jsonData, null, 2));
          console.log(`Swagger JSON saved to ${TEMP_FILE}`);
          resolve();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          reject(new Error(`Failed to parse Swagger JSON: ${errorMessage}`));
        }
      });
    });
    
    request.on('error', (error) => {
      const errorMessage = error instanceof Error ? error.message : String(error);
      reject(new Error(`Failed to download Swagger JSON: ${errorMessage}`));
    });
    
    request.end();
  });
}

/**
 * Gera o código TypeScript a partir do arquivo JSON
 * @returns {Promise<void>}
 */
function generateTypeScriptCode() {
  return new Promise((resolve, reject) => {
    console.log(`Generating TypeScript code from ${TEMP_FILE}...`);
    
    // Criar o diretório de saída se não existir
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Executar o comando openapi-typescript-codegen
    const command = `npx openapi-typescript-codegen --input ${TEMP_FILE} --output ${OUTPUT_DIR} --client fetch`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        reject(new Error(`Failed to generate TypeScript code: ${errorMessage}\n${stderr}`));
        return;
      }
      
      console.log(stdout);
      console.log(`TypeScript code generated successfully in ${OUTPUT_DIR}`);
      resolve();
    });
  });
}

/**
 * Configura a URL base da API no arquivo OpenAPI.ts
 * @returns {Promise<void>}
 */
function configureBaseUrl() {
  return new Promise((resolve, reject) => {
    const openApiFile = path.join(OUTPUT_DIR, 'core', 'OpenAPI.ts');
    
    if (!fs.existsSync(openApiFile)) {
      reject(new Error(`OpenAPI.ts file not found at ${openApiFile}`));
      return;
    }
    
    try {
      let content = fs.readFileSync(openApiFile, 'utf8');
      
      // Substituir a URL base
      content = content.replace(
        /BASE: '.*?',/,
        `BASE: '${API_URL.substring(0, API_URL.lastIndexOf('/'))}',`
      );
      
      fs.writeFileSync(openApiFile, content);
      console.log(`Base URL configured in ${openApiFile}`);
      resolve();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      reject(new Error(`Failed to configure base URL: ${errorMessage}`));
    }
  });
}

/**
 * Função principal
 */
async function main() {
  try {
    await downloadSwaggerJson();
    await generateTypeScriptCode();
    await configureBaseUrl();
    
    // Limpar o arquivo temporário
    fs.unlinkSync(TEMP_FILE);
    console.log(`Temporary file ${TEMP_FILE} removed`);
    
    console.log('API client generation completed successfully!');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${errorMessage}`);
    process.exit(1);
  }
}

// Executar a função principal
main(); 