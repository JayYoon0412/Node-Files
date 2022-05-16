export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple API Tester',
            version: '1.0.0'
        },
    },
    apis: ['./swagger/*.swagger.js'],
};