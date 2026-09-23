const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/database');

const History = sequelize.define(
    'History',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        usuario_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'historiales_usuario',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    }
);

module.exports = History;