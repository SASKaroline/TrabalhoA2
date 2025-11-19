# TrabalhoA2

**Nome do Projeto**

E-commerce PetShop Online – Plataforma B2C

# Tecnologias Utilizadas
  - Node.js


  - Express


  - MongoDB Atlas


  - Mongoose


  - Yup


  - Postman


  - Git e GitHub



# Descrição Geral do Sistema
A plataforma foi desenvolvida para atender às demandas de um e-commerce de PetShop voltado ao público B2C, permitindo que usuários realizem compras de produtos, agendem serviços e gerenciem seus pets. O sistema também disponibiliza ferramentas administrativas para gerenciamento de categorias, produtos e serviços. Toda a aplicação foi organizada com uma estrutura modular, garantindo clareza, manutenção simples e escalabilidade.

# Funcionalidades Implementadas
  - Cadastro e autenticação de usuários


  - Gerenciamento de pets vinculados ao usuário


  - CRUD completo de todas as collections


  - Agendamento de serviços para pets


  - Sistema de pedidos e itens de pedido


  - Avaliação de produtos


  - Registro e controle de pagamentos


  - Relacionamentos estruturados entre collections utilizando populate


  - Validações completas com Yup



# Endpoints – Exemplos
**Usuários**

*POST /usuarios*

Request body:
 
{

  "nome": "Maria Silva",
  
  "cpf": "12345678900",
  
  "email": "maria@email.com",
  
  "senha": "123456",
  
  "telefone": "61999999999"
  
}

*GET /usuarios/:id*

 Response:
 
{

  "id": "6710d3...",
  
  "nome": "Maria Silva",
  
  "email": "maria@email.com"
  
}

**Pets**

*POST /pets*

{

  "nome": "Thor",
  
  "especie": "Cachorro",
  
  "raca": "Labrador",
  
  "idade": 3,
  
  "peso": 18,
  
  "usuarioId": "6710d3..."
  
}

**Agendamentos**

*POST /agendamentos*

{
  
  "data": "2025-02-20",
  
  "hora": "14:00",
  
  "petId": "6721f3...",
  
  "servicoId": "6721e9...",
  
  "usuarioId": "6710d3..."

}

A coleção completa de endpoints está disponível no arquivo Postman exportado.

# Diagrama de Modelagem
O diagrama do banco de dados encontra-se em:

/docs/PETSHOP ONLINE E-COMMERCE.png

Representa todas as 10 collections e seus relacionamentos.

# Fluxo do Sistema – PetShop Online
O sistema integra e-commerce de produtos, agendamento de serviços e gestão de pets. A seguir, o fluxo geral:

1. Usuário
  - Realiza cadastro/login.
  - Pode cadastrar seus pets.
  - A partir disso, consegue fazer agendamentos e compras.


2. Pets
  - Cada usuário cadastra um ou mais pets.
  - Os pets são vinculados aos agendamentos de serviços.


3. Agendamento de Serviços
  - Usuário escolhe um serviço (banho, tosa, consulta etc.).
  - Seleciona data e horário.
  - Escolhe qual pet será atendido.
  - Sistema cria o registro de Agendamento (status inicial: pendente).
  - Após realização, o status muda para concluído.
  - O usuário pode registrar avaliação do serviço.


4. E-commerce de Produtos
  - Usuário navega por produtos e categorias.
  - Adiciona itens ao carrinho.
  - Finaliza o pedido → sistema cria o Pedido.
  - Cada item é registrado em ItensPedido.
  - O estoque do produto é atualizado.


5. Pagamentos
  - Associados diretamente aos pedidos.
  - Métodos: cartão, pix, boleto.
  - Após confirmação:
  - Pedido muda para pago → enviado → entregue.


6. Avaliações
  - Usuário pode avaliar produtos comprados e serviços realizados.
  - Avaliações são vinculadas ao usuário e ao item avaliado.


# Resumo das Relações
  - Usuário → possui pets, pedidos, agendamentos e pagamentos.

  - Pet → vinculado a agendamentos.

  - Pedido → contém itens e um pagamento.

  - ItensPedido → podem representar produtos ou serviços.

  - Avaliações → podem ser de produtos ou serviços.



# Collections e Relacionamentos
O diagrama do banco de dados encontra-se em:
/docs/diagrama-banco.png

Representa todas as 10 collections e seus relacionamentos.

# Collections e Relacionamentos
**Usuários**

Clientes e administradores; relaciona com pets, pedidos e avaliações.

**Pets**

Pertencem a um usuário; usados em agendamentos.

**Categorias**

Organizam produtos por tipo.

**Produtos**

Vinculados a categorias; compõem pedidos e avaliações.

**Serviços**

Banho, tosa, vacinação, consultas.

**Agendamentos**

Relacionam usuário + pet + serviço.

**Pedidos**

Associados ao usuário; contêm itens.

**ItensPedido**

Relacionam produtos e pedidos.

**Avaliações**

Relacionam usuário e produto.

**Pagamentos**

Vinculados ao pedido e ao usuário.

# Instalação, Configuração e Execução
1. Instalação das dependências

npm install

2. Configuração do .env

Criar um .env baseado no .env.example:

MONGO_URI= mongodb+srv://usuario:<db_password>@cluster0.gfi4s0j.mongodb.net/
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000

3. Execução do servidor
npm start

A API estará disponível em:
http://localhost:3000


# Comunicação com o Banco de Dados
A configuração da conexão está em:

/src/index.js

A comunicação utiliza Mongoose para modelagem, validação, tratamento de erros e relacionamentos via populate.

# Integrantes do Projeto
Nome              | GitHub

Karol             | SASKaroline

Yasmin            | Yassanalitics

Ygor              | Yguin77

Alex              | AraujoS2025

Davi              | davimoreira061



# Contribuições dos Integrantes
*Karol – Configuração e Estrutura Inicial*

  - Estruturação do projeto e pastas
  - Configuração de Express e Mongoose
  - Criação de .gitignore e .env.example
  - Organização inicial do README
  - Criação do repositório e fluxo de branches


*Yasmin – Modelagem e Documentação Técnica*

  - Criação do diagrama com as 10 collections
  - Desenvolvimento dos models
  - Organização via issues


*Ygor – CRUDs Principais*

  - Usuários, Pets, Categorias, Produtos, Serviços
  - Controllers, rotas e respostas REST
  - Implementação de status HTTP
  - Agendamentos, Pedidos, ItensPedido, Avaliações, Pagamentos
  - Implementação de relacionamentos com populate


*Alex – Validações (Yup)*

  - Regras de tipos, tamanhos e formatos
  - Validação de ObjectId
  - Revisão das rotas


*Davi – Documentação no Postman*

  - Organização da collection por entidade
  - Exemplos de requisições
  - Exportação do arquivo .json
