'use strict';
const Destino = require('../../models/Destino')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await Destino.bulkCreate([
      {
        nome_destino: "Praia de Palmas",
        cep: "88190000",
        descricao: "A praia de palmas e muito boa fora de temporada",
        usuario_id: 1
      },
      {
        nome_destino: "Praia do cagão",
        cep: "88160000",
        descricao: "A praia do cagão e muito boa fora de temporada",
        usuario_id: 2
      },
      {
        nome_destino: "Praia do GF",
        cep: "88140000",
        descricao: "A praia do gf e muito boa fora de temporada",
        usuario_id: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await Destino.destroy({
      cep: [
        "88190000",
        "88160000",
        "88140000"
      ]
    })
  }
}
