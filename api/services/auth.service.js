const { AppDataSource } = require("../configs/pg.config");
const { createToken } = require("../middleware/jwt");
const { compare } = require("../utils/bcrypt");
const { UserService } = require("./user.service");

class AuthService {
    constructor () {}
    async register(data) {
        try {
            const result = await UserService.prototype.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async login(data) {
        try {
            const userList = await UserService.prototype.getAll({ username: data?.username });
            if (!Array.isArray(userList) || !userList[0]) {
                throw new Error('User not found!');
            }
            const user = userList[0];
            if (!compare(data.password, user.password)) {
                throw new Error('Wrong password!');
            }
            const tokenData = {
                id: user.id,
                username: user.username
            }
            const [accessToken, refreshToken] = await Promise.all([
                createToken(tokenData, 30 * 60),
                createToken(tokenData, 24 * 60 * 60)
            ]);
            return {
                accessToken,
                refreshToken
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { AuthService: AuthService };