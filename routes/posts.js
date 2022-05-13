import express from 'express';

import { getPosts, createPost, deletePost, likePost, updatePost } from '../controllers/posts.js';
import authenticated from './../middelware/auth.js'
const router = express.Router();

router.get('/', getPosts);
router.post('/', authenticated, createPost);
router.delete('/:id', authenticated, deletePost)
router.patch('/:id/likePost', authenticated, likePost)
router.patch('/:id', authenticated, updatePost)

export default router;