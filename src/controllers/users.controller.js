const UsersService = require('../services/users.service.js');
const { InvalidParamsError } = require('../exceptions/index.exception.js');

class UsersController {
    construct() {
        this.usersService = new UsersService();
    }

    createUser = async (req, res, next) => {
        try {
            const { nickname, password, confirm } = req.body;

            if (!nickname || !password || !confirm) {
                throw new InvalidParamsError();
            }

            await this.usersService.createUser({
                nickname,
                password,
                confirm,
            });

            res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UsersController;
