const { AppDataSource } = require("../configs/pg.config");

class PostService {
    constructor () {}
    async getAll(query) {
        try {
            const filter = {};
            if (query?.id) filter.id = Number(query.id);
            const result = await (await AppDataSource).getRepository('posts').find({
                where: {
                    ...filter, 
                    isDeleted: false 
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getById(postId) {
        try {
            const result = await (await AppDataSource).getRepository('posts').findOneBy({ id: Number(postId), isDeleted: false });
            return result;
        } catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const result = await (await AppDataSource).getRepository('posts').save(data);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async update(id, newData) {
        try {
            const oldData = await this.getById(Number(id));
            if (!oldData) {
                throw new Error('Not found!');
            }
            const updateData = { ...oldData, ...newData };
            const result = await (await AppDataSource).getRepository('posts').save(updateData);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const oldData = await this.getById(Number(id));
            if (!oldData) {
                throw new Error('Not found!');
            }
            const updateData = { ...oldData, isDeleted: true };
            const result = await (await AppDataSource).getRepository('posts').save(updateData);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { PostService: PostService };