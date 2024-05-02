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

    async listaDestino(req, res) {
        try {
            const listar_destino = await Destino.findAll()
            res.json(listar_destino)
        } catch (error) {
            res.status(400).json({ erro: 'Não foi possível listar os destinos do usuário' })
        }
    }

    async listarDestinoDeUsuario(req, res) {
        try {
            const { id } = req.params;
            const destinosUsuario = await Destino.findAll({
                where: {
                    usuario_id: id
                }
            });

            if (!destinosUsuario || destinosUsuario.length === 0) {
                return res.status(400).json({ erro: 'O usuário informado não existe ou não cadastrou nenhum destino.' });
            }

            res.json(destinosUsuario);
        } catch (error) {
            res.status(400).json({ error: 'Não foi possível encontrar.' });
        }
    }




}

module.exports = new DestinosController()