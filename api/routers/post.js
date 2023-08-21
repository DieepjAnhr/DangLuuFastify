const PostController = require('../controllers/post.controller');

const PostRouter = [
    {
        method: 'GET', 
        url: '/api/posts',
        handler: PostController.prototype.getAll
    },
    {
        method: 'GET',
        url: '/api/post/:id',
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