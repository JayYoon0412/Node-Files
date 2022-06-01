export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Mini Project API Docs',
        version: '1.0.0',
      },
    },
    apis: ['./swagger/*.swagger.js'], // all files ending in .swagger.js
  };