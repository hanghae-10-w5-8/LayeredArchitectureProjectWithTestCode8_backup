const PostService = require('../services/post.service.js');
const { InvalidParamsError } = require('../exceptions/index.exception.js');

class PostController {
    constructor() {
        this.postService = new PostService();
    }
    createPost = async (req, res, next) => {
        try {
            console.log(req.body);
            const { userId, title, content } = req.body;

            if (!title || !content) {
                throw new InvalidParamsError();
            }

            const posts = await this.postService.createPost({
                userId,
                title,
                content,
            });
            res.json({ result: posts });
        } catch (error) {
            next(error);
        }
    };

    getPosts = async (req, res, next) => {
        const post = await this.postService.findAllPost();
        res.json({ result: post });
    };
}

module.exports = PostController;
