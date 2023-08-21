const PostController = require('../controllers/post.controller');

const PostRouter = [
    {
        method: 'GET', 
        url: '/api/posts',
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: {
                            type: "array",
                            items: { 
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    title: { type: 'string' },
                                    content: { type: 'string' },
                                } 
                            }
                        }
                    }
                }
            }
        },
        handler: PostController.prototype.getAll
    },
    {
        method: 'GET',
        url: '/api/post/:id',
        schema: {
            paramstring: {
                type: 'object',
                properties: {
                    id: { type: 'string'}
                },
                required: ['id'],
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        message: { type: 'string' },
                        data: { 
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                title: { type: 'string' },
                                content: { type: 'string' },
                            } 
                        }
                    }
                }
            }
        },
        handler: PostController.prototype.getById
    },
    {
        method: 'POST', 
        url: '/api/post/create',
        handler: PostController.prototype.create
    },
    {
        method: 'PATCH',
        url: '/api/post/update/:id',
        handler: PostController.prototype.update
    },
    {
        method: 'DELETE',
        url: '/api/post/delete/:id',
        handler: PostController.prototype.delete
    }
];

module.exports = PostRouter