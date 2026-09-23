const express = require('express');

const {
  getUsers,
  getUsersSQL,
  createUser,
  updateUser,
  deleteUser,
  createUserWithHistory,
  getUserWithOrders
} = require('../controllers/userController');

const router = express.Router();


router.get('/', getUsers);
router.get('/sql', getUsersSQL);
router.get('/:id/pedidos', getUserWithOrders);


router.post('/', createUser);
router.post('/con-historial', createUserWithHistory);

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;