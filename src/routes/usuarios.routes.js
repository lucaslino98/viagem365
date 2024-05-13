const { Router } = require('express')
const { auth } = require('../middleware/auth')
const UsuarioController = require('../controllers/UsuariosController')
const UsuarioRoutes = new Router()

UsuarioRoutes.post('/', UsuarioController.cadastrarUsuario)


module.exports = UsuarioRoutes