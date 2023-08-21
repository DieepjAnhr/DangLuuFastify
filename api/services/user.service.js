const { AppDataSource } = require("../configs/pg.config");
const { setCache, getCache, clearCache } = require("../configs/redis.config");
const { hash } = require("../utils/bcrypt");

class UserService {
    constructor () {}
    async getAll(query) {
        try {
            const cache = await getCache('user-' + JSON.stringify(query));
            if (cache) return cache;
            const filter = {};
            if (query?.id) filter.id = Number(query.id);
            const result = await (await AppDataSource).getRepository('users').find({
                where: {
                    ...filter, 
                    isDeleted: false 
                }
            });
            setCache('user-' + JSON.stringify(query), result, 5 * 60);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getById(userId) {
        try {
            const cache = await getCache('user-' + JSON.stringify(userId));
            if (cache) return cache;
            const result = await (await AppDataSource).getRepository('users').findOneBy({ id: Number(userId), isDeleted: false });
            setCache('user-' + JSON.stringify(userId), result, 5 * 60);
            return result;
        } catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const hashedPassword = hash(data.password);
            data.password = hashedPassword;
            const result = await (await AppDataSource).getRepository('users').save(data);
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
            const result = await (await AppDataSource).getRepository('users').save(updateData);
            clearCache('user-*');
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
            const result = await (await AppDataSource).getRepository('users').save(updateData);
            clearCache('user-*');
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { UserService: UserService };