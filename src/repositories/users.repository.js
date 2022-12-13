const { Op } = require('sequelize');

// 회원의  password는 최대한 서버에 노출되지 않도록 처리
class UsersRepository {
    constructor(PostsModel) {
        this.postsModel = PostsModel;
    }

    findUser = async ({ nickname }) => {
        return await this.postsModel.findOne({
            where: { nickname },
            attributes: { exclude: ['password'] },
        });
    };

    authUser = async ({ nickname, password }) => {
        return await this.postsModel.findOne({
            where: {
                [Op.and]: [{ nickname }, { password }],
            },
            attributes: { exclude: ['password'] },
        });
    };

    createUser = async ({ nickname, password }) => {
        return await this.postsModel.create({
            nickname,
            password,
        });
    };
}

module.exports = UsersRepository;
