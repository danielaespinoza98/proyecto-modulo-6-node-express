const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email y password son obligatorios',
                data: null
            });
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Credenciales inválidas',
                data: null
            });
        }

        // Para este proyecto se compara con los datos existentes
        // creados previamente en el Módulo 7.
        if (user.password !== password) {
            return res.status(401).json({
                status: 'error',
                message: 'Credenciales inválidas',
                data: null
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1h'
            }
        );

        return res.json({
            status: 'ok',
            message: 'Login realizado correctamente',
            data: {
                usuario: {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email
                },
                token
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    login
};