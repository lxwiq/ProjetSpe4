/**
 * Configuration Swagger pour la documentation API
 */
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Options de base pour Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Collaboration Documentaire',
      version: '1.0.0',
      description: 'API pour la gestion de documents collaboratifs, l\'authentification et la communication en temps réel',
      contact: {
        name: 'Équipe de développement',
        email: 'dev@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'jwt_token'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            code: {
              type: 'integer',
              example: 400
            },
            message: {
              type: 'string',
              example: 'Message d\'erreur'
            },
            details: {
              type: 'object',
              example: {}
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            username: {
              type: 'string',
              example: 'johndoe'
            },
            email: {
              type: 'string',
              example: 'john@example.com'
            },
            full_name: {
              type: 'string',
              example: 'John Doe'
            },
            is_admin: {
              type: 'boolean',
              example: false
            }
          }
        },
        Document: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            title: {
              type: 'string',
              example: 'Document de test'
            },
            content: {
              type: 'string',
              example: 'Contenu du document'
            },
            owner_id: {
              type: 'integer',
              example: 1
            },
            is_folder: {
              type: 'boolean',
              example: false
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'user@example.com'
            },
            password: {
              type: 'string',
              example: 'password123'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Authentification réussie'
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                },
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                requireTwoFactor: {
                  type: 'boolean',
                  example: false
                }
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      },
      {
        cookieAuth: []
      }
    ]
  },
  apis: [
    './src/authentification/*.js',
    './src/routes/*.js',
    './src/controllers/*.js',
    './src/middlewares/*.js'
  ]
};

// Initialiser Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Fonction pour configurer Swagger dans l'application Express
const setupSwagger = (app) => {
  // Route pour la documentation Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Route pour le fichier JSON de spécification Swagger
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log('Documentation API disponible sur /api-docs');
};

module.exports = {
  setupSwagger
};
