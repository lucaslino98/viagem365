const { verify } = require('jsonwebtoken')
const Destino = require('../models/Destino')
const Usuario = require('../models/Usuario')
const axios = require('axios')
class DestinosController {

    async cadastrarDestino(req, res) {
/* 
 
            #swagger.tags = ['Destinos'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo Destino',
                schema: {
                $nome_destino:"Praia de gov"
                $cep:"88190000"
                $descricao:"boa praia"
                $latitude: "123123"
                $longetude:"44421"
                $endereco: "hipotito de azevedo"
                $usuario_id: 2
            }
        }
    

*/
        try {
            const { cep, descricao, nome_destino } = req.body
            const decoded = verify(req.headers.authorization, process.env.SECRET_JWT)
            const usuario_inf = decoded.usuario_id

            if (!nome_destino) {
                return res.status(400).json({ error: 'Favor verificar o Nome(É obrigatório)' })
            }

            if (!cep) {
                return res.status(400).json({ error: 'Favor verificar o CEP(É obrigatório)' })
            }
            if (!descricao) {
                return res.status(400).json({ error: 'Descrição obrigatória, favor fazer uma breve descrição da localidade.' })
            }

            const existeUsuario = await Usuario.findByPk(usuario_inf);
            if (!existeUsuario) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }
            const ceps = req.body.cep
            let buscaCoordenadas = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${ceps}&format=json&addressdetails=1&limit=1`)
            let lat = null
            let lon = null
            let display_name = null

            if (buscaCoordenadas.data && buscaCoordenadas.data.length > 0) {
                lat = buscaCoordenadas.data[0].lat
                lon = buscaCoordenadas.data[0].lon
                display_name = buscaCoordenadas.data[0].display_name
            }

            const destino = await Destino.create({
                nome_destino,
                cep,
                descricao,
                latitude: lat,
                longetude: lon,
                endereco: display_name,
                usuario_id: usuario_inf
            })
            res.status(201).json(destino)

        } catch (error) {
            console.log(error)
            res.status(400).json({ error: 'Não foi possível cadastrar.' })
        }
    }

    async listaDestino(req, res) {
        try {
            const decoded = verify(req.headers.authorization, process.env.SECRET_JWT)
            const autDestino = decoded.usuario_id
            const listar_destino = await Destino.findAll({ where: { usuario_id: autDestino } })
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
        const { cep, descricao, latitude, longetude, endereco, usuario_id } = req.body
        const decoded = verify(req.headers.authorization, process.env.SECRET_JWT)
        const usuario_inf = decoded.usuario_id

        try {
            const destino = await Destino.findByPk(id)
            if (!destino) {
                res.status(400).json({ error: 'Este destino não foi encontrado, favor verificar!' })
            }
            if (destino.usuario_id === usuario_inf) {
                await destino.update({
                    cep,
                    descricao,
                    latitude,
                    longetude,
                    endereco,
                    usuario_id
                })
                await destino.save()
                res.status(200).json({ mensagem: "Alterado com sucesso" })
            } else {
                res.status(401).json({ error: 'Você não tem permissão para atualizar este destino.' })
            }
        } catch (error) {
            res.status(400).json({ error: 'Error ao atulizar o destino' })
        }
    }

    async deletarDestino(req, res) {
        const { id } = req.params
        const decoded = verify(req.headers.authorization, process.env.SECRET_JWT)
        const usuario_del = decoded.usuario_id
        try {
            const destino = await Destino.findByPk(id)
            if (usuario_del !== destino.usuario_id) {
                res.json({ mensagem: 'Você não tem permissão de excluir esse usuário' })
            } else {
                await destino.destroy()
                res.status(204)
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

module.exports = new DestinosController()