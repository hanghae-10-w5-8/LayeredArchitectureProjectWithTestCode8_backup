const { Op } = require('sequelize');
class UsersRepository {
    constructor(PostsModel) {
        this.postsModel = PostsModel;
    }

    findUser = async ({ nickname }) => {
        return await this.postsModel.findOne({
            where: { nickname },
            include: { except: password },
        });
    };

    authUser = async ({ nickname, password }) => {
        return await this.postsModel.findOne({
            where: {
                [Op.and]: [{ nickname }, { password }],
                include: { except: password },
            },
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
