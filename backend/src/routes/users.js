const { Router } = require('express');
const { getUsers, getUserById } = require('../controller/users');

const router = Router();

router.get('/', getUsers);           // GET /api/users
router.get('/:id', getUserById);     // GET /api/users/:id

module.exports = router;