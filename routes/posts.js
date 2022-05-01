import express from 'express';
import { getAllPosts, createPost }
    from '../controllers/posts.js';
const postsRoute = express.Router();
postsRoute.get('/getAllPosts', getAllPosts);
postsRoute.post('/createPost', createPost);
postsRoute.use('/*', (req, res) => { res.status(404).json({ message: 'wrong route' }) });


export default postsRoute;