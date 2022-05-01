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

    selectedFiles: {
        type: [String],

    },
    likeCount: {
        type: Number,
        default: 0
    },


},
    {
        timestamps: true,
    }
)


const Post = mongoose.model('Post', postScema);

export default Post;


