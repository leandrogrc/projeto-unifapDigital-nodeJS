const express = require('express');
const router = express.Router();
const UserController = require('./controller/UserController');
const { verifyToken } = require('./jwt');

// Rotas protegidas
router.get('/recurso-protegido', verifyToken, (req, res) => {
  res.json({ message: 'Access request granted' });
});

//Login e gerar um token
router.post('/login', UserController.login);

//criar um usuário
router.post('/register', UserController.registerUser);

//buscar um usuário por ID
router.get('/searchUser/:id', UserController.searchUser);

//buscar todos os usuários
router.get('/searchUsers', UserController.searchUsers);

//atualizar um usuário por ID
router.put('/updateUser/:id', UserController.updateUser);

//excluir um usuário por ID
router.delete('/deleteUser/:id', UserController.deleteUser);

module.exports = router;