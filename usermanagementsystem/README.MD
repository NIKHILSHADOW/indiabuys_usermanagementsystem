# USER MANAGEMENT SYSTEM

### STEPS

==============

1. Go to folder where project is created.
2. open cmd and type npm init, to intailise

Backend API – User Management System

MY Api's

```
POST /api/users/register
POST /api/users/login
GET /api/users/
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id

POST /api/users/:id/follow
GET  /api/users/:id/followers
GET /api/users/:id/following
```

### Authentication & User Registration

##### POST /register

```
Description: Register a new user.
Access: Public (No authentication required).
Request Body: email, name, password, phone
Response: Confirmation of user creation or error.
```

##### POST /login

```
Description: Log in an existing user.
Access: Public.
Request Body: email, passowrd
Response: JWT token for authenticated requests.
```

### User CRUD Operations

##### GET /

```
Description: Get a list of all users.
Access: Admin only.
Headers: Authorization: Bearer <token>
Response: List of user objects (excluding passwords).
```

##### GET /:id

```
Description: Get details of a user by ID.
Access: Authenticated users only.
Headers: Authorization: Bearer <token>
Response: User data (excluding password), if exists.
```

##### PUT /:id

```
Description: Update a user’s data.
Access: User themself or Admin.
Headers: Authorization: Bearer <token>
Request Body: Partial or full user data to update.
Response: Confirmation of update or error.
```

##### DELETE /:id

```
Description: Delete a user account.
Access: User themself or Admin.
Headers: Authorization: Bearer <token>
Response: Confirmation of deletion or error.
```

##### Follow System

```
POST /:id/follow
Description: Follow a user by their ID.
Access: Authenticated users.
Headers: Authorization: Bearer <token>
Response: Success message or error
```

##### GET /:id/followers

```
Description: Get a list of followers of a user.
Access: Authenticated users.
Headers: Authorization: Bearer <token>
Response: Array of users who follow the given user.
```

##### GET /:id/following

```
Description: Get a list of users the specified user is following.
Access: Authenticated users.
Headers: Authorization: Bearer <token>
Response: Array of followed users.
```

### Authentication Middleware

All protected routes use:

authMiddleware Verifies JWT token and adds req.user.

isAdmin Grants access only if req.user.role === 'admin'.

isSelfOrAdmin Grants access if the logged-in user is the target user or an admin.
