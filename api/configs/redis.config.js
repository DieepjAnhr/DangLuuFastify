const redis = require('redis');
let redisClient;

(async () => {
    redisClient = redis.createClient();
    redisClient.on('error', (error) => console.error(`Error Redis: ${error}`));
    await redisClient.connect();
    console.log('redis connect success!');
})();

const getCache = async (key) => {
    const cache = await redisClient.get(key);
    return JSON.parse(cache);
}

const setCache = async (key, value, time) => {
    await redisClient.set(key, JSON.stringify(value), { EX: time });
    return true;
};

const clearCache = async (key) => {
    await redisClient.del(key);
    return true;
}

module.exports = {
    redisClient,
    getCache,
    setCache,
    clearCache
}


