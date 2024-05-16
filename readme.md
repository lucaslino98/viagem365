
#  VIAGEM 365

Projeto voltado para troca de informações entre usuários. Onde cada usuário vai poder cadastrar destinos que frequentou em sua viajem e dar uma breve descrição sobre o mesmo.



## Tecnologias Utilizadas

-   **Linguagem:** JavaScript
-   **Framework:**  Express
-   **Banco de Dados:** PostgreSQL

## Como utilizar esta API

Na primeira vez você ira ter que clonar o respositório 
```bash
cd "caminho/da/sua/pasta"
git clone https://github.com/lucaslino98/viagem365
cd "viagem365"
code ./ #Abrirá o Vscode na raiz do projeto
```

Após isso precisamos instalar as dependencias

```bash
`npm install`
 Se for em ambiente local: `npm install --dev`
```
## Configure o ambiente
Na raiz do projeto, localize o arquivo .env.example, duplique-o e altere seu nome para .env, neste arquivo ficarão as credenciais do banco de dados e outras configurações sensíveis que não são compartilháveis.

```bash
DIALECT=postgres
HOST=localhost
USERNAMEDB= #Nome do usuario para acessar o banco de dados
PASSWORDDB= #Senha para acessar o banco
DATABASE=trip
PORT=5432
PORT_API= #Utilizar a porta que sua API irá rodar
SECRET_JWT= #Senha do seu token JWT
```

Execute este comando para criar as migrações no banco de dados
```bash
`sequelize db:migrate`
`npx sequelize db:migrate`
```
Execute este comando para popular o banco de dados com as SEEDERS
```bash
`sequelize db:seed:all` 
```

Para rodar o repositório em um ambiente local

```bash
`npm run start:dev`
```

Para acessar os endpoints utilize
```bash
http://localhost:3100/docs
```



    
## Bibliotecas utilizadas

[axios](https://www.npmjs.com/package/axios) \
[cors](https://www.npmjs.com/package/cors) \
[dotenv](https://www.npmjs.com/package/dotenv) \
[express](https://www.npmjs.com/package/express) \
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) \
[pg](https://www.npmjs.com/package/pg) \
[pg-connection-string](https://www.npmjs.com/package/pg-connection-string) \
[sequelize](https://www.npmjs.com/package/sequelize) \
[swagger-autogen](https://www.npmjs.com/package/swagger-autogen) \
[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) 


## Melhorias

- Criar uma interface para melhor experiência do usuário.
- Ter um sistema de roteiros. Após a pessoa cadastrar um destino a mesma pode adicionar seu roteiro utilizado pela cidade, sendo assim ajudando um outro usúario a otimizar tempo antes de criar o roteiro.
- Criar campos para o usuário adicionarem fotos dos destinos.
- Criar um sistema dentro desta API, onde quando o cliente vizualizar o destino após cadstrar o mesmo poder ter opções de hotéis, restaurantes.


