import { catchAsync } from '../utils/utils.js';
import Post from '../models/Post.js';
import mongoose from 'mongoose';
export const getPosts = catchAsync(async (req, res) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/(gt|gte|lt|lte)/, (match) => `$${match}`);
    let posts = Post.find(JSON.parse(query));

    if (req.query.page !== undefined) {
        const limit = req.query.limit;
        posts.skip((+req.query.page - 1) * limit);
        posts.limit(limit);
    }
    if (req.query.sort != undefined && req.query.orderby != undefined) {
        const sortObject = {};
        sortObject[req.query.sort] = req.query.orderby === "asc" ? 1 : -1;
        posts.sort(sortObject);
    }
    res.json({
        status: "success",
        data: await posts,
    });
});
export const createPost = catchAsync(async (req, res, next) => {
    console.log("create Post");
    const posts = await Post.create(req.body);
    res.status(201).json({ status: "success", data: posts });
});
export const deletePost = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
});
export const likePost = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
});