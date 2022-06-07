const express = require('express');
const router = express.Router();

//Authentication
const authController = require('../controllers/auth.controller');
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.post('/logout', authController.logout);

//User controller
const userController = require('../controllers/user.controller');

//GET Users Information
router.get('/', userController.getAllUsers);
router.get('/specific/:id', userController.getUserInfo);

//Update
router.put('/:id', userController.updateUser);
router.put('/:id/:set', userController.updateUserPassword);

//Delete
router.delete('/:id', userController.deleteUser);

//Permission
router.get('/permission/:id', userController.readPermission);
router.patch('/permission/:id', userController.addPermission);
router.patch('/permission/:id', userController.removePermission);

//Visibility
module.exports = router;