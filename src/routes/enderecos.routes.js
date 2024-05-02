const { Router } = require('express')
const { auth } = require('../middleware/auth')
const EnderecoController = require('../controllers/EnderecosController')
const EnderecoRoutes = new Router()

EnderecoRoutes.post('/', EnderecoController.cadastrarEndereco)


module.exports = EnderecoRoutes