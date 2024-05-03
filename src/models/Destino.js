const { DataTypes, STRING } = require('sequelize')
const { connection } = require('../database/connection')


const Destino = connection.define('destinos', {
    cep: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.STRING
    },
    longetude: {
        type: DataTypes.STRING
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


