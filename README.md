link site: https://onda-bank.vercel.app

# React + TypeScript + Vite

📌 Projeto
Este repositório contém um projeto front-end desenvolvido com foco em boas práticas de desenvolvimento, organização de código e escalabilidade.

🚀 Como rodar o projeto
Pré-requisitos
Node.js >= 18
npm ou yarn

Instalação
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>

# Acessar a pasta do projeto
cd nome-do-projeto

# Instalar dependências
npm install
# ou
yarn install

Executar em modo desenvolvimento
npm run dev
# ou
yarn dev

Decisões técnicas adotadas
Vite como bundler pela rapidez no desenvolvimento
Tailwind CSS para estilização utilitária e produtividade
React Hook Form para gerenciamento eficiente de formulários
Separação de responsabilidades entre componentes e hooks
Organização baseada em componentes reutilizáveis
Uso de aliases (@/) para facilitar imports

Melhorias futuras
Adição de autenticação real com backend
Integração com API externa
Internacionalização (i18n)
Melhor cobertura de responsividade mobile

🔐 Proteção contra Engenharia Reversa
Remover nomes claros de funções e variáveis no build
Evitar lógica crítica no front-end

🛡️ Proteção contra Vazamento de Dados

Criptografia de dados sensíveis
* Senhas nunca armazenadas em texto puro
* Uso de hash seguro (bcrypt, Argon2)

Segurança de armazenamento
* Nunca salvar token sensível em localStorage sem cuidado
* Evitar expor dados no front-end desnecessariamente
