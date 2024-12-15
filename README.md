<h1 align="center">📄 OCR Project - Case Técnico</h1>

<p align="center">
  <strong>API para leitura e interpretação de notas fiscais utilizando a API OpenAI</strong>
</p>

<hr />

<h2>📝 Descrição</h2>
<p>
  Este projeto é um case técnico que envolve a criação de uma aplicação incompleta para leitura de notas fiscais. A aplicação em seu estado final ira processar dados utilizando a <strong>API OpenAI</strong> para interpretar o conteúdo extraído das notas fiscais. O sistema conta com frontend, backend e banco de dados integrados.
</p>

<h2>🛠️ Tecnologias Utilizadas</h2>
<ul>
  <li><strong>Frontend:</strong> React</li>
  <li><strong>Backend:</strong> NestJS</li>
  <li><strong>Banco de Dados:</strong> MongoDB (não relacional)</li>
  <li><strong>ORM:</strong> Prisma</li>
  <li><strong>Linguagem:</strong> TypeScript</li>
  <li><strong>Integração:</strong> API OpenAI</li>
  <li><strong>Deploy:</strong> Vercel (frontend) e Render (backend)</li>
</ul>

<h2>🔧 Funcionalidades</h2>
<ul>
  <li>Upload de notas fiscais</li>
  <li>Processamento do texto extraído utilizando OCR</li>
  <li>Interpretação de dados com a API OpenAI</li>
  <li>Exibição das informações no frontend</li>
  <li>Gerenciamento de usuários com autenticação</li>
</ul>

<h2>📂 Estrutura do Projeto</h2>
<pre>
ocr-project/
├── client/            # Frontend React
│   ├── src/
│   │   ├── App.js
│   │   ├── login.js
│   │   ├── openaiService.js
│   │   └── ...
│   ├── package.json
│   └── ...
│
|            
|
|── src/          # Backend NestJS
│   ├── app.module.ts
│   ├── main.ts
│   ├── prisma/
│   │   └── ...
│   ├── file/
│   │   └── ...
│   ├── openai/
│   │   └── ...
│   ├── user/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── uploads/           # Diretório de arquivos processados
├── prisma/            # Configuração do Prisma ORM
</pre>

<h2>🚀 Instalação e Execução</h2>

<h3>Backend</h3>
<pre>
<code>
# Acesse o diretório do servidor
cd ocr-project

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute o servidor
npm run start
</code>
</pre>

<h3>Frontend</h3>
<pre>
<code>
# Acesse o diretório do cliente
cd client

# Instale as dependências
npm install

# Inicie o frontend
npm start
</code>
</pre>

<h2>🌐 Deploy</h2>
<ul>
  <li><strong>Frontend:</strong> Vercel</li>
  <li><strong>Backend:</strong> Render</li>
</ul>

<h2>🎯 Objetivo do Projeto</h2>
<p>
  O principal objetivo deste projeto é demonstrar a integração entre uma aplicação de frontend em <strong>React</strong>, um backend robusto com <strong>NestJS</strong>, e um banco de dados <strong>MongoDB</strong>, além do uso da <strong>API OpenAI</strong> para processamento avançado de texto extraído via OCR.
</p>

<h2>🧑‍💻 Desenvolvedor</h2>
<ul>
  <li>Nome: <strong>[Eros Franklin Soares Felix]</strong></li>
  <li>Email: <strong>[erosfranklinfelix2016@gmail.com]</strong></li>
</ul>

