import mongoose from 'mongoose';

const postScema = mongoose.Schema({
    title:
    {
        type: String,
    },
    creator: {
        type: String,
    },
    tags: {
        type: [String]
    },
    message: {
        type: String
    },

    selectedFile: String,

    likes: { type: [String], default: [] },


},
    {
        timestamps: true,
    }
)


const Post = mongoose.model('Post', postScema);

export default Post;


