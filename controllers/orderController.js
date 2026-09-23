const { Order } = require('../models');

async function createOrder(req, res, next) {
    try {
        const { usuario_id, producto, total } = req.body;

        if (!usuario_id || !producto || total === undefined) {
            return res.status(400).json({
                status: 'error',
                message: 'usuario_id, producto y total son obligatorios',
                data: null
            });
        }

        const order = await Order.create({
            usuario_id,
            producto,
            total
        });

        return res.status(201).json({
            status: 'ok',
            message: 'Pedido creado correctamente',
            data: order
        });
    } catch (error) {
        next(error);
    }
}

async function getOrders(req, res, next) {
    try {
        const orders = await Order.findAll({
            order: [['id', 'ASC']]
        });

        return res.json({
            status: 'ok',
            message: 'Pedidos obtenidos correctamente',
            data: orders
        });
    } catch (error) {
        next(error);
    }
}
async function updateOrder(req, res, next) {
    try {
        const { id } = req.params;
        const { producto, total } = req.body;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: 'Pedido no encontrado',
                data: null
            });
        }

        await order.update({
            producto: producto ?? order.producto,
            total: total ?? order.total
        });

        return res.json({
            status: 'ok',
            message: 'Pedido actualizado correctamente',
            data: order
        });

    } catch (error) {
        next(error);
    }
}
async function deleteOrder(req, res, next) {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: 'Pedido no encontrado',
                data: null
            });
        }

        await order.destroy();

        return res.json({
            status: 'ok',
            message: 'Pedido eliminado correctamente',
            data: {
                id: order.id,
                usuario_id: order.usuario_id,
                producto: order.producto,
                total: order.total
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
};