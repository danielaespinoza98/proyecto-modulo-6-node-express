const { User, Order } = require('../models');
const History = require('../models/History');
const { sequelize } = require('../services/database');


async function getUsers(req, res, next) {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            order: [['id', 'ASC']]
        });

        return res.json({
            status: 'ok',
            message: 'Usuarios obtenidos correctamente',
            data: users
        });

    } catch (error) {
        next(error);
    }
}

async function getUsersSQL(req, res, next) {
    try {
        const [users] = await sequelize.query(`
            SELECT
                id,
                nombre,
                email,
                created_at,
                updated_at
            FROM usuarios
            ORDER BY id ASC
        `);

        return res.json({
            status: 'ok',
            message: 'Usuarios obtenidos mediante SQL manual',
            data: users
        });

    } catch (error) {
        next(error);
    }
}
async function createUser(req, res, next) {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Nombre, email y password son obligatorios',
                data: null
            });
        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'El email ya está registrado',
                data: null
            });
        }

        const user = await User.create({
            nombre,
            email,
            password
        });

        const safeUser = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        };

        return res.status(201).json({
            status: 'ok',
            message: 'Usuario creado correctamente',
            data: safeUser
        });

    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const { nombre, email } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
                data: null
            });
        }
        if (email && email !== user.email) {
            const emailExists = await User.findOne({
                where: { email }
            });

            if (emailExists) {
                return res.status(409).json({
                    status: 'error',
                    message: 'El email ya está registrado',
                    data: null
                });
            }
        }

        await user.update({
            nombre: nombre ?? user.nombre,
            email: email ?? user.email
        });

        return res.json({
            status: 'ok',
            message: 'Usuario actualizado correctamente',
            data: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            }
        });

    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
                data: null
            });
        }

        await user.destroy();

        return res.json({
            status: 'ok',
            message: 'Usuario eliminado correctamente',
            data: {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
}
async function createUserWithHistory(req, res, next) {
    const transaction = await sequelize.transaction();

    try {
        const {
            nombre,
            email,
            password,
            forzarError
        } = req.body;

        if (!nombre || !email || !password) {
            await transaction.rollback();

            return res.status(400).json({
                status: 'error',
                message: 'Nombre, email y password son obligatorios',
                data: null
            });
        }

        const existingUser = await User.findOne({
            where: { email },
            transaction
        });

        if (existingUser) {
            await transaction.rollback();

            return res.status(409).json({
                status: 'error',
                message: 'El email ya está registrado',
                data: null
            });
        }
        const user = await User.create(
            {
                nombre,
                email,
                password
            },
            {
                transaction
            }
        );

        const history = await History.create(
            {
                usuario_id: user.id,
                descripcion: forzarError
                    ? null
                    : 'Usuario registrado correctamente'
            },
            {
                transaction
            }
        );

        await transaction.commit();

        console.log(
            `Transacción exitosa: usuario ${user.id} e historial ${history.id} creados`
        );

        return res.status(201).json({
            status: 'ok',
            message: 'Usuario e historial creados correctamente',
            data: {
                usuario: {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email
                },
                historial: {
                    id: history.id,
                    descripcion: history.descripcion
                }
            }
        });

    } catch (error) {
        await transaction.rollback();

        console.error(
            `Transacción revertida mediante ROLLBACK: ${error.message}`
        );

        return res.status(500).json({
            status: 'error',
            message: 'Transacción revertida mediante ROLLBACK',
            data: null
        });
    }
}

async function getUserWithOrders(req, res, next) {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Order,
                    as: 'pedidos',
                    attributes: [
                        'id',
                        'producto',
                        'total',
                        'created_at'
                    ]
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
                data: null
            });
        }

        return res.json({
            status: 'ok',
            message: 'Usuario y pedidos obtenidos correctamente',
            data: user
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUsersSQL,
    createUser,
    updateUser,
    deleteUser,
    createUserWithHistory,
    getUserWithOrders
};