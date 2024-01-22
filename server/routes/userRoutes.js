import { Router } from 'express';
import UserController from '../controllers/userController.js';
import isLoggedIn from '../middleware/authentication.js';

const router = Router();

// GET
router.get('/notes', isLoggedIn,  UserController.notes);
router.get('/note/:id', isLoggedIn, UserController.getNote);

// DELETE
router.delete('/note/:id', isLoggedIn, UserController.deleteNote);

// PUT
router.put('/note/:id', isLoggedIn, UserController.updateNote);

// POST
router.post('/register', UserController.register);
router.post('/addNote', isLoggedIn, UserController.addNote);

export default router;
