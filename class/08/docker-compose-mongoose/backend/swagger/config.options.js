export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Mini-Tester',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.swagger.js'], // all files ending in .swagger.js
  };