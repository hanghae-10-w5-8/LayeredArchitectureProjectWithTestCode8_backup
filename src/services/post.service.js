const PostRepository = require('../repositories/post.repository.js');

class PostService {
    #postRepository;
    constructor() {
        this.#postRepository = new PostRepository();
    }

    createPost = async ({ userId, title, content }) => {
        console.log(userId, title, content);
        const data = await this.#postRepository.createPost({
            userId,
            title,
            content,
        });
        return data;
    };
}

module.exports = PostService;
