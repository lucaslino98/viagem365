const Usuario = require('../models/Usuario')

class usuarioController {
    async cadastrarUsuario(req, res) {
        try {
            const { nome, sexo, cpf, email, senha, data_nascimento } = req.body

            if (!nome) {
                return res.status(400).json({ erro: 'O nome deve ser informado' })
            }
            if (!sexo) {
                return res.status(400).json({ erro: "O sexo deve ser informado" })
            }
            if (!cpf) {
                return res.status(400).json({ erro: 'O cpf deve ser informado' })
            }
            if (!email) {
                return res.status(400).json({ erro: 'O email deve ser informado' })
            }
            if (!senha) {
                return res.status(400).json({ erro: "A senha deve ser informada" })
            }
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ erro: 'A data de nascimento deve estar no formato AAAA-MM-DD' })
            }

            const usuario = await Usuario.create({
                nome,
                sexo,
                cpf,
                email,
                senha,
                data_nascimento
            })

            res.status(201).json(usuario)
        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro, revise as informações' })
        }

    }
}

module.exports = new usuarioController()