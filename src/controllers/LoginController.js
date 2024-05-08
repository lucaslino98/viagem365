const { sign } = require('jsonwebtoken')
const Usuario = require("../models/Usuario")

class LoginController {
    async login(req, res) {
        try {
            const { email, senha } = req.body
            if (!email) {
                return res.status(400).json({ erro: 'Informe o email' })
            }

            if (!senha) {
                return res.status(400).json({ erro: 'Informe a sua senha' })
            }

            const usuario = await Usuario.findOne({
                where: { email: email, senha: senha }
            })
            if (!usuario) {
                return res.status(404).json({ erro: 'Nenhum usuario corresponde ao email e senha informados' })
            }

            const payload = { usuario_id: usuario.id, email: usuario.email, nome: usuario.nome }
            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({ Token: token })
        } catch (error) {
            return res.status(500).json({ error: error, message: 'Algo deu errado' })
        }
    }
}

module.exports = new LoginController()