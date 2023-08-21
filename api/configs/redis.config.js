const redis = require('redis');
let redisClient;

(async () => {
    redisClient = redis.createClient({
        host: '127.0.0.0',
        port: 6379,
        password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
    });
    redisClient.on('error', (error) => console.error(`Error Redis: ${error}`));
    await redisClient.connect();
    console.log('redis connect success!');
})();

const setCache = async (key, value, time) => {
    try {
        await redisClient.set(key, JSON.stringify(value), { EX: time });
        return true;
    } catch (error) {
        console.log(error);
    }
};

const getCache = async (key) => {
    try {
        const cache = await redisClient.get(key);
        return JSON.parse(cache);
    } catch (error) {
        console.log(error);
    }
}

const clearCache = async (key) => {
    try {
        await redisClient.del(key);
        return true;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    redisClient,
    getCache,
    setCache,
    clearCache
}


