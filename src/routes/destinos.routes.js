const { Router } = require('express')
const { auth } = require('../middleware/auth')
const DestinosController = require('../controllers/DestinosController')
const DestinosRoutes = new Router()

DestinosRoutes.post('/', DestinosController.cadastrarDestino)

module.exports = DestinosRoutes