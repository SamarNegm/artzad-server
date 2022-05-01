import { catchAsync } from '../utils/utils.js';
import Post from '../models/Post.js';

export const getAllPosts = catchAsync(async (req, res) => {
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
