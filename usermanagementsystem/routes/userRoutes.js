
const express = require('express')

const router = express.Router();

const userController = require('../controllers/userController');
const { authMiddleware, isAdmin, isSelfOrAdmin } = require('../middlewares/authMiddleware');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authMiddleware, isAdmin, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, isSelfOrAdmin, userController.updateUserById);
router.delete('/:id', authMiddleware, isSelfOrAdmin, userController.deleteUserById);

router.post('/:id/follow', authMiddleware, userController.followUser);
router.get('/:id/followers', authMiddleware, userController.getFollowers);
router.get('/:id/following', authMiddleware, userController.getFollowing);

module.exports = router;