const EntitySchema = require("typeorm").EntitySchema

module.exports.PostDto = new EntitySchema({
    name: "Post",
    tableName: "posts",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
        },
        content: {
            type: "text",
        },
        isDeleted: {
            type: "boolean",
            default: false
        },
    },
});