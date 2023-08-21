const { AuthController } = require("../controllers/auth.controller");

const AuthRouter = [
    {
        method: 'POST', 
        url: '/api/auth/register',
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string'},
                    password: { type: 'string'}
                },
                required: ['username', 'password'],
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
                                username: { type: 'string' },
                                firstName: { type: 'string' },
                                lastName: { type: 'string' },
                                address: { type: 'string' }
                            } 
                        }
                    }
                }
            }
        },
        handler: AuthController.prototype.register
    },
    {
        method: 'POST',
        url: '/api/auth/login',
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string'},
                    password: { type: 'string'}
                },
                required: ['username', 'password'],
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
                                accessToken: { type: 'string' },
                                refreshToken: { type: 'string' }
                            } 
                        }
                    }
                }
            }
        },
        handler: AuthController.prototype.login
    },
];

module.exports = { AuthRouter }