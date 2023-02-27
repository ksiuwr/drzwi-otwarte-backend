import express from 'express';

import { addUser, deleteUser, editUser, getUser, getUsers } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.post('/', addUser);
router.post('/:id', editUser);

export default router;
