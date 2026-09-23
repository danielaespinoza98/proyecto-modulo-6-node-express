const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/database');

const Order = sequelize.define(
    'Order',
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
        producto: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: 'pedidos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    }
);

module.exports = Order;