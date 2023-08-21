require('reflect-metadata');
require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const redisClient = require('./configs/redis.config');
const { AuthRouter } = require('./routers/auth');
const { PostRouter } = require('./routers/post');
const PORT = 3000;
 
PostRouter.forEach((route) => fastify.route(route));
AuthRouter.forEach((route) => fastify.route(route));

const main = async () => {
    try {
        await fastify.listen({ port: PORT });
        fastify.log.info(`Server listening at port: ${PORT}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

main();