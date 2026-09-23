require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: false
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a MySQL establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a MySQL:', error.message);
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    testConnection
};