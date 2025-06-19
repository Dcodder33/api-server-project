const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book API',
            version: '1.0.0',
            description: 'A simple Express Book API with MongoDB',
        },
        servers: [
            { url: 'http://localhost:3000' }
        ],
        components: {
            schemas: {
                Book: {
                    type: 'object',
                    required: ['title', 'author', 'year'],
                    properties: {
                        _id: { type: 'string', description: 'The auto-generated id of the book' },
                        title: { type: 'string' },
                        author: { type: 'string' },
                        year: { type: 'integer' }
                    },
                    example: {
                        _id: '60f7c0c2e1b1c8a1b8e4d123',
                        title: 'Book Title',
                        author: 'Author Name',
                        year: 2024
                    }
                }
            }
        },
        paths: {
            '/books': {
                get: {
                    summary: 'Retrieve all books',
                    tags: ['Books'],
                    responses: {
                        200: {
                            description: 'List of books',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Book' }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    summary: 'Add a new book',
                    tags: ['Books'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Book' }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: 'The created book',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Book' }
                                }
                            }
                        }
                    }
                }
            },
            '/books/{id}': {
                put: {
                    summary: 'Update a book by ID',
                    tags: ['Books'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            schema: { type: 'string' },
                            required: true,
                            description: 'The book id'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Book' }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'The updated book',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Book' }
                                }
                            }
                        },
                        404: { description: 'Book not found' }
                    }
                },
                delete: {
                    summary: 'Delete a book by ID',
                    tags: ['Books'],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            schema: { type: 'string' },
                            required: true,
                            description: 'The book id'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'Book deleted',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: { type: 'string', example: 'Book deleted' }
                                        }
                                    }
                                }
                            }
                        },
                        404: { description: 'Book not found' }
                    }
                }
            }
        }
    },
    apis: []
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
