const EntitySchema = require("typeorm").EntitySchema

module.exports.UserDto = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        username: {
            type: "text",
        },
        password: {
            type: "text",
        },
        firstName: {
            type: "text",
            nullable: true
        },
        lastName: {
            type: "text",
            nullable: true
        },
        address: {
            type: "text",
            nullable: true
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