require('reflect-metadata');
const fastify = require('fastify')({ logger: true });
const redisClient = require('./configs/redis.config');
const PORT = 3000;

const PostRouter = require("./routers/post")
 
PostRouter.forEach((route) => {
    fastify.route(route)
});

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