const Usuario = require('../../models/Usuario')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await Usuario.bulkCreate([
      {
        nome: "Lucas Lino Martins",
        sexo: "Masculino",
        cpf: "00000000000",
        endereco: "Gov Celso Ramos, Canto dos ganchos",
        email: "lucas.teste@hotmail.com",
        senha: "teste123",
        data_nascimento: "1998-04-06"
      },
      {
        nome: "Lucas Lino ",
        sexo: "Masculino",
        cpf: "00000000001",
        endereco: "Gov Celso Ramos, Calheiros",
        email: "lino.teste@hotmail.com",
        senha: "teste123",
        data_nascimento: "1998-04-21"
      },
      {
        nome: "Lino",
        sexo: "Masculino",
        cpf: "10000000001",
        endereco: "Florianópolis-SC",
        email: "luquinha@gmail.com",
        senha: "teste123",
        data_nascimento: "1998-04-21"
      }
    ])
  },
  async down(queryInterface, Sequelize) {
    await Aluno.destroy({
      email: [
        "lucas.teste@hotmail.com",
        "lino.teste@hotmail.com",
        "luquinha@gmail.com"
      ]
    })
  }
}