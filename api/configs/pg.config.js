const typeorm = require("typeorm");
const { PostDto } = require("../entities/post.entity");

const AppDataSource = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: [PostDto],
    synchronize: true,
    logging: false,
});

module.exports = { AppDataSource: AppDataSource.initialize() };