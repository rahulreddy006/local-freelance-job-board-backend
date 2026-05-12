
export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Freelance Platform API',
    version: '1.0.0',
    description: 'Core APIs for Auth, Users, Gigs, and Applications. Features advanced querying, role-based access, Google OAuth, and workflow logic.',
  },
  servers: [
    {
      url: 'http://localhost:4000/api/v1',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }], 

  paths: {
    
    // ==========================================
    // 1️⃣ AUTHENTICATION APIs
    // ==========================================
    '/register': { post: {
        summary: 'Register a new user (Local)',
        operationId: 'registerUser',
        tags: ['Authentication'],
        security: [], 
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'], // ✅ Added required array
                properties: {
                  name: { type: 'string', example: 'Jane Doe' },
                  email: { type: 'string', example: 'jane@example.com' },
                  password: { type: 'string', example: 'securepassword123' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered successfully.' },
          400: { description: 'User already exists or validation error.' },
        },
      },
     },
    '/login': {
      post: {
        summary: 'Log in with email and password',
        operationId: 'loginUser',
        tags: ['Authentication'],
        security: [], 
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'], // ✅ Added required array
                properties: {
                  email: { type: 'string', example: 'jane@example.com' },
                  password: { type: 'string', example: 'securepassword123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful! Returns JWTs.' },
          401: { description: 'Invalid credentials.' },
        },
      },
    },

    '/complete-profile': { patch: {
        summary: 'Complete Google OAuth onboarding',
        operationId: 'completeProfile',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['role'], // ✅ Added required array
                properties: {
                  role: { type: 'string', enum: ['student', 'business'], example: 'student' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Onboarding complete.' },
          400: { description: 'Invalid role or already onboarded.' },
        },
      },
    },

    // ✅ NEW: Refresh Token
    '/refresh-token': {
      post: {
        summary: 'Get a new access token using a refresh token',
        operationId: 'refreshToken',
        tags: ['Authentication'],
        security: [], // Public (auth is done via the token in the body)
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['refreshToken'],
                properties: {
                  refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5c...' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'New access token generated successfully.' },
          401: { description: 'Invalid or expired refresh token.' },
        },
      },
    },

    // ✅ NEW: Google OAuth Routes
    '/auth/google': {
      get: {
        summary: 'Initiate Google OAuth Login',
        tags: ['Authentication'],
        security: [], // Public
        responses: {
          302: { description: 'Redirects the user to the Google Consent Screen.' },
        },
      },
    },
    '/auth/google/callback': {
      get: {
        summary: 'Google OAuth Callback (Handled by Google)',
        tags: ['Authentication'],
        security: [], // Public
        responses: {
          200: { description: 'Returns JWTs and onboarding status, or redirects to frontend dashboard.' },
          401: { description: 'OAuth Authentication failed.' },
        },
      },
    },

    // ==========================================
    // 2️⃣ GIG APIs
    // ==========================================
    '/gigs': { get: {
        summary: 'Get all active gigs (with advanced querying)',
        operationId: 'getAllGigs',
        tags: ['Gigs'],
        security: [], // Public
        parameters: [
          { 
            name: 'page', 
            in: 'query', 
            schema: { type: 'integer', default: 1 }, 
            description: 'Page number for pagination' 
          },
          { 
            name: 'limit', 
            in: 'query', 
            schema: { type: 'integer', default: 10 }, 
            description: 'Number of items per page' 
          },
          { 
            name: 'search', 
            in: 'query', 
            schema: { type: 'string', example: 'react' }, 
            description: 'Search by gig title or description' 
          },
          { 
            name: 'skill', 
            in: 'query', 
            schema: { type: 'string', example: 'nodejs' }, 
            description: 'Filter by specific required skill' 
          },
          { 
            name: 'sort', 
            in: 'query', 
            schema: { type: 'string', example: 'newest' }, 
            description: 'Sort criteria (e.g., newest, -price)' 
          },
        ],
        responses: {
          200: { description: 'Paginated array of gig objects.' },
        },
      },
      post: {
        summary: 'Create a new gig (Business Role)',
        operationId: 'createGig',
        tags: ['Gigs'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'description', 'price'], // ✅ Added required array
                properties: {
                  title: { type: 'string', example: 'Build a React website' },
                  description: { type: 'string', example: 'Need a 5-page portfolio.' },
                  price: { type: 'number', example: 500 },
                  skillsRequired: { 
                    type: 'array', 
                    items: { type: 'string' }, 
                    example: ['React', 'Tailwind', 'Node.js'] 
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Gig created successfully.' },
          401: { description: 'Unauthorized.' },
          403: { description: 'Forbidden (Must be a business).' },
        },
      }, },

    // ✅ NEW: Get Single Gig
    '/gigs/{gigId}': {
      get: {
        summary: 'Get gig details by ID',
        operationId: 'getGigById',
        tags: ['Gigs'],
        security: [], // Public
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'The ID of the gig' },
        ],
        responses: {
          200: { description: 'Detailed gig object.' },
          404: { description: 'Gig not found.' },
        },
      },
    },

    '/my-gigs': {
      get: {
        summary: 'Get all gigs created by the current business',
        operationId: 'getMyGigs',
        tags: ['Gigs'],
        // Uses global security (Requires Token)
        responses: {
          200: { description: 'Array of gig objects owned by the business.' },
          401: { description: 'Unauthorized.' },
          403: { description: 'Forbidden (Must be a business).' },
        },
      },
    },

    // ==========================================
    // 3️⃣ APPLICATION APIs
    // ==========================================
    '/gigs/{gigId}/apply': { post: {
        summary: 'Apply to a specific gig (Student Role)',
        operationId: 'applyToGig',
        tags: ['Applications'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The ID of the gig',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['proposal'], // ✅ Added required array
                properties: {
                  proposal: { type: 'string', example: 'I can build this in 3 days using Next.js.' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Application submitted.' },
          400: { description: 'Already applied to this gig.' },
          404: { description: 'Gig not found.' },
        },
      }, },
    '/applications/{applicationId}/status': {
      patch: {
        summary: 'Update application status (Business Role)',
        operationId: 'updateApplicationStatus',
        tags: ['Applications'],
        parameters: [
          {
            name: 'applicationId',
            in: 'path',
            required: true,
            description: 'The ID of the application to update',
            schema: { type: 'string' },
          },
        ],
        // 🔥 The crucial body documentation
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: { 
                    type: 'string', 
                    enum: ['accepted', 'rejected'], 
                    example: 'accepted' 
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Application status updated successfully.' },
          400: { description: 'Invalid status provided.' },
          401: { description: 'Unauthorized (Token missing or invalid).' },
          403: { description: 'Forbidden (You do not own the gig this application belongs to).' },
          404: { description: 'Application not found.' },
        },
      },
    },


    // ✅ NEW: My Applications (Student Dashboard)
    '/my-applications': {
      get: {
        summary: 'Get all applications submitted by the current student',
        operationId: 'getMyApplications',
        tags: ['Applications'],
        // Uses global security (Requires Token)
        responses: {
          200: { description: 'Array of application objects belonging to the student.' },
          401: { description: 'Unauthorized.' },
          403: { description: 'Forbidden (Must be a student).' },
        },
      },
    },

    // ✅ NEW: View Applications for a Gig (Business Action)
    '/gigs/{gigId}/applications': {
      get: {
        summary: 'Get all applications for a specific gig (Business Role)',
        operationId: 'getGigApplications',
        tags: ['Applications'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'The ID of the gig' },
        ],
        responses: {
          200: { description: 'Array of applications for the specified gig.' },
          401: { description: 'Unauthorized.' },
          403: { description: 'Forbidden (You do not own this gig).' },
          404: { description: 'Gig not found.' },
        },
      },
    },

  },
};