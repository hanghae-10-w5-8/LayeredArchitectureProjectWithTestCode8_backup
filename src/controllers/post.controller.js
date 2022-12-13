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

            const data = await this.postService.createPost({
                userId,
                title,
                content,
            });
            res.json({ result: data });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = PostController;
