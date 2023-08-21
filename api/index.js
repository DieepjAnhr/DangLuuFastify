require('reflect-metadata');
require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const redisClient = require('./configs/redis.config');
const { AuthRouter } = require('./routers/auth');
const { UserRouter } = require('./routers/user');
const { PostRouter } = require('./routers/post');
const PORT = 3000;
 
AuthRouter.map((route) => fastify.route(route));
UserRouter.map((route) => fastify.route(route));
PostRouter.map((route) => fastify.route(route));

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