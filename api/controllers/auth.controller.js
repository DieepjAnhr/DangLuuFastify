const { AuthService } = require("../services/auth.service");


class AuthController {
    async register(req, reply) {
        try {
            const result = await AuthService.prototype.register(req.body);
            return reply.code(200).send({
                status: "successs",
                message: "Success!",
                data: result
            });
        } catch (error) {
            return reply.code(400).send({
                status: "error",
                message: error.message,
                data: null
            });
        }
    }
    async login(req, reply) {
        try {
            const result = await AuthService.prototype.login(req.body);
            return reply.code(200).send({
                status: "successs",
                message: "Success!",
                data: result
            });
        } catch (error) {
            return reply.code(400).send({
                status: "error",
                message: error.message,
                data: null
            });
        }
    }
}

module.exports = { AuthController };