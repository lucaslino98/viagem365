const Endereco = require('../models/Endereco')

class EnderecoController {
    async cadastrarEndereco(req, res) {
        try {
            const { cidade, bairro, rua, complemento, numero, usuario_id } = req.body
            const endereco = await Endereco.create({
                cidade,
                bairro,
                rua,
                complemento,
                numero,
                usuario_id
            })
            res.status(201).json(endereco)

        } catch (error) {
            console.log(error)
            res.status(400).json({ error: 'Falha ao cadastrar seu endereço, favor verificar.' })
        }

    }
}


module.exports = new EnderecoController()