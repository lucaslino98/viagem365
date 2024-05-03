const { Router } = require("express")
const loginRoutes = require('../routes/login.routes')
const usuariosRoutes = require('../routes/usuarios.routes')
const destinosRoutes = require('../routes/destinos.routes')


const routes = Router()

routes.use('/login', loginRoutes)
routes.use('/usuarios', usuariosRoutes)
routes.use('/destinos', destinosRoutes)




module.exports = routes