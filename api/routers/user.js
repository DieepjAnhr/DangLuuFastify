
const { UserController } = require('../controllers/user.controller');
const { auth } = require('../middleware/jwt');

const UserRouter = [
    {
        method: 'GET', 
        url: '/api/users',
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
                                    username: { type: 'string' },
                                    firstName: { type: 'string' },
                                    lastName: { type: 'string' },
                                    address: { type: 'string' },
                                } 
                            }
                        }
                    }
                }
            }
        },
        preHandler: auth,
        handler: UserController.prototype.getAll
    },
    {
        method: 'GET',
        url: '/api/user/:id',
        schema: {
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
                                username: { type: 'string' },
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                address: { type: 'string' },
                            } 
                        }
                    }
                }
            }
        },
        preHandler: auth,
        handler: UserController.prototype.getById
    },
    {
        method: 'POST', 
        url: '/api/user/create',
        schema: {
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
                                username: { type: 'string' },
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                address: { type: 'string' },
                            } 
                        }
                    }
                }
            }
        },
        preHandler: auth,
        handler: UserController.prototype.create
    },
    {
        method: 'PATCH',
        url: '/api/user/update/:id',
        schema: {
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
                                username: { type: 'string' },
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                address: { type: 'string' },
                            } 
                        }
                    }
                }
            }
        },
        preHandler: auth,
        handler: UserController.prototype.update
    },
    {
        method: 'DELETE',
        url: '/api/user/delete/:id',
        schema: {
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
                                username: { type: 'string' },
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                address: { type: 'string' },
                            } 
                        }
                    }
                }
            }
        },
        preHandler: auth,
        handler: UserController.prototype.delete
    }
];

module.exports = { UserRouter };