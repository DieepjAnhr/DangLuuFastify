const { UserService } = require("../services/user.service");

class UserController {
    async getAll(req, reply) {
        try {
            const query = req?.query;
            const result = await UserService.prototype.getAll(query);
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
    async getById(req, reply) {
        try {
            const postId = req?.params?.id;
            if (!postId) {
                throw new Error('Missing id in params!');
            }
            const result = await UserService.prototype.getById(postId);
            if (!result) {
                throw new Error('Post not found!');
            }
            return reply.code(200).send({
                status: "successs",
                message: "success",
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
    async create(req, reply) {
        try {
            const result = await UserService.prototype.create(req.body);
            return reply.code(200).send({
                status: "successs",
                message: "create post success",
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
    async update(req, reply) {
        try {
            const postId = req?.params?.id;
            if (!postId) {
                throw new Error('Missing id in params!');
            }
            const result = await UserService.prototype.update(postId, req.body);
            return reply.code(200).send({
                status: "successs",
                message: "Update post success!",
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
    async delete(req, reply) {
        try {
            const postId = req?.params?.id;
            if (!postId) {
                throw new Error('Missing id in params!');
            }
            const result = await UserService.prototype.delete(postId);
            return reply.code(200).send({
                status: "successs",
                message: "Delete post success!",
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

module.exports = { UserController };