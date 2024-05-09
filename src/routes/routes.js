const { Router } = require("express")
const loginRoutes = require('../routes/login.routes')
const usuariosRoutes = require('../routes/usuarios.routes')
const destinosRoutes = require('../routes/destinos.routes')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json')

const routes = Router()

routes.use('/login', loginRoutes)
routes.use('/usuarios', usuariosRoutes)
routes.use('/destinos', destinosRoutes)

routes.use('/docs', swaggerUi.serve)
routes.get('/docs', swaggerUi.setup(swaggerDocument))




module.exports = routes