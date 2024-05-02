const Destino = require('../models/Destino')

class DestinosController {

    async cadastrarDestino(req, res) {
        try {
            const { nome_destino, descricao, localidade, coordenadas_geograficas, usuario_id } = req.body
            
            const destino = await Destino.create({
                nome_destino,
                descricao,
                localidade,
                coordenadas_geograficas,
                usuario_id
            })
            res.status(201).json(destino)

        } catch (error) {
            console.log(error)
            res.status(400).json({ error: 'Não foi possível cadastrar.' })
        }
    }

}

module.exports = new DestinosController()