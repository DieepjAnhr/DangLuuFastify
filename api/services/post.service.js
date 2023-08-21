const { AppDataSource } = require("../configs/pg.config");
const { setCache, getCache, clearCache } = require("../configs/redis.config");

class PostService {
    constructor () {}
    async getAll(query) {
        try {
            const cache = await getCache('post-' + JSON.stringify(query));
            if (cache) return cache;
            const filter = {};
            if (query?.id) filter.id = Number(query.id);
            const result = await (await AppDataSource).getRepository('posts').find({
                where: {
                    ...filter, 
                    isDeleted: false 
                }
            });
            setCache('post-' + JSON.stringify(query), result, 5 * 60);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getById(postId) {
        try {
            const cache = await getCache('post-' + JSON.stringify(postId));
            if (cache) return cache;
            const result = await (await AppDataSource).getRepository('posts').findOneBy({ id: Number(postId), isDeleted: false });
            setCache('post-' + JSON.stringify(postId), result, 5 * 60);
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
            clearCache('post-*');
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
            clearCache('post-*');
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { PostService: PostService };