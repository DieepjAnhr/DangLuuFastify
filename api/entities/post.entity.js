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
        createAt: {
            type: "date",
            default: new Date()
        },
        createBy: {
            type: "text",
            nullable: true
        },
        modifyAt: {
            type: "date",
            default: new Date()
        },
        modifyBy: {
            type: "text",
            nullable: true
        },
        isDeleted: {
            type: "boolean",
            default: false
        },
    },
});