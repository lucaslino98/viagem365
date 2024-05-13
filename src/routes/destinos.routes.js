const { Router } = require('express')
const { auth } = require('../middleware/auth')
const DestinosController = require('../controllers/DestinosController')
const DestinosRoutes = new Router()

DestinosRoutes.post('/', auth, DestinosController.cadastrarDestino)
DestinosRoutes.get('/', auth, DestinosController.listaDestino)
DestinosRoutes.get('/:id', auth, DestinosController.listarDestinoDeUsuario)
DestinosRoutes.put('/:id', auth, DestinosController.atualizarDestino)
DestinosRoutes.delete('/:id', auth, DestinosController.deletarDestino)

module.exports = DestinosRoutes