import express from 'express';
import { signup, signin } from './../controllers/users.js'
const router = express.Router();

router.get('/signup', signup);
router.get('/signin', signin);


export default router;
