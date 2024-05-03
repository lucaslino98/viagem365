const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')


const Destino = connection.define('destinos', {
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    }
})

module.exports = Destino


