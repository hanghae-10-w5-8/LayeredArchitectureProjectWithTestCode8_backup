require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersRepository = require('../repositories/users.repository.js');
const { ValidationError } = require('../exceptions/index.exception.js');
const { Users } = require('../models');
const { hash } = require('../util/auth-encryption.util');

class UsersService {
    constructor() {
        this.usersRepository = new UsersRepository(Users);
    }

    findUser = async ({ nickname }) => {
        const user = await this.usersRepository.findUser({
            nickname,
        });

        return user;
    };

    createUser = async ({ nickname, password, confirm }) => {
        const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
        const re_password = /^[a-zA-Z0-9]{4,30}$/;
        function isRegexValidation(target, regex) {
            return target.search(regex) !== -1;
        }

        const isExistUser = await this.findUser({ nickname });

        if (isExistUser.length) {
            throw new ValidationError('중복된 닉네임입니다.', 412);
        } else if (password !== confirm) {
            throw new ValidationError('패스워드가 일치하지 않습니다.', 412);
        } else if (nickname.search(re_nickname) === -1) {
            throw new ValidationError('ID 형식이 일치하지 않습니다.', 412);
        } else if (password.search(re_password) === -1) {
            throw new ValidationError(
                '패스워드 형식이 일치하지 않습니다.',
                412
            );
        } else if (isRegexValidation(password, nickname)) {
            throw new ValidationError(
                '패스워드에 닉네임이 포함되어 있습니다.',
                412
            );
        }

        const hashValue = hash(password);

        const user = await this.UsersRepository.createUser({
            nickname,
            password: hashValue,
        });

        return user;
    };
}

module.exports = UsersService;
