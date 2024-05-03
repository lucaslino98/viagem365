const Destino = require('../models/Destino')
const Usuario = require('../models/Usuario')
const axios = require('axios')
class DestinosController {

    async cadastrarDestino(req, res) {

        try {
            const { cep, descricao, usuario_id } = req.body

            if (!cep) {
                return res.status(400).json({ error: 'Favor verificar o CEP(É obrigatório)' })
            }
            if (!descricao) {
                return res.status(400).json({ error: 'Descrição obrigatória, favor fazer uma breve descrição da localidade.' })
            }

            const existeUsuario = await Usuario.findByPk(usuario_id);
            if (!existeUsuario) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
            if (!usuario_id) {
                return res.status(400).json({ error: 'ID do usuario obrigatório, favor verificar.' })
            }

            const ceps = req.body.cep
            let buscaCoordenadas = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${ceps}&format=json&addressdetails=1&limit=1`);
            let lat = null;
            let lon = null;
            let display_name = null;

            if (buscaCoordenadas.data && buscaCoordenadas.data.length > 0) {
                lat = buscaCoordenadas.data[0].lat
                lon = buscaCoordenadas.data[0].lon
                display_name = buscaCoordenadas.data[0].display_name
            }


            const destino = await Destino.create({
                cep,
                descricao,
                latitude: lat,
                longetude: lon,
                endereco: display_name,
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

    async atualizarDestino(req, res) {
        const { id } = req.params
        const { cep, descricao, latitude, longetude, endereco } = req.body
        try {
            const destino = await Destino.findByPk(id)
            if (!destino) {
                res.status(400).json({ error: 'Este destino não foi encontrado, favor verificar!' })
            }
            await destino.update({
                cep,
                descricao,
                latitude,
                longetude,
                endereco
            })
            await destino.save()
            res.status(200).json({ menssagem: "Alterado com sucesso" })
        } catch (error) {
            res.status(400).json({ error: 'Error ao atulizar o destino' })
        }
    }

    async deletarDestino(req, res) {
        const { id } = req.params
        try {
            const destino = await Destino.findByPk(id)
            if (!destino) {
                res.status(400).json({ error: 'Este destino não existe, favor verificar!' })
            }
            destino.destroy({
                where: {
                    id
                }
            })
            res.status(204).json({ mensagem: 'Destino excluído' })
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

}

module.exports = new DestinosController()