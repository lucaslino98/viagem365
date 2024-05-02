const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')


const Destino = connection.define('destinos', {
    nome_destino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    localidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordenadas_geograficas: {
        type: DataTypes.STRING,
        allowNull: false
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


