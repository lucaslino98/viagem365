const swaggerAutogen = require('swagger-autogen')();
const { config } = require('dotenv')
config()

const doc = {
  info: {
    title: 'Api para o projeto viajem',
    description: 'Description'
  },
  host:`${process.env.HOST}:${process.env.PORT_API}`
};

const outputFile = './swagger.json';
const routes = ['./src/routes/routes.js'];


swaggerAutogen(outputFile, routes, doc);