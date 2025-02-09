const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Dev books API documentation',
      version: '1.0.0',
      description: 'Dev books API documentation with examples',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Provide a valid JWT token in the Authorization header',
        },
        RefreshCookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
          description: 'Provide a valid refresh token in the cookie',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
      {
        RefreshCookie: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

module.exports = swaggerDocs