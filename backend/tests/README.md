# Tests for Backend API

This directory contains tests for the backend API routes using Jest and Supertest.

## Structure

- `routes/` - Tests for API routes
  - `auth.test.js` - Tests for authentication routes
  - `user-routes.test.js` - Tests for user routes
  - `document-routes.test.js` - Tests for document routes
- `setup.js` - Global setup for tests

## Running Tests

To run all tests:

```bash
npm test
```

To run a specific test file:

```bash
npm test -- tests/routes/auth.test.js
```

To run tests with coverage report:

```bash
npm test -- --coverage
```

## Test Coverage

The tests cover the following functionality:

### Authentication Routes
- Login with valid credentials
- Login with invalid email
- Login with invalid password
- Error handling

### User Routes
- Get all users
- Modify user information
- Error handling

### Document Routes
- Get all documents for a user
- Add a new document
- Delete a document
- Permission handling
- Error handling

## Mocking

The tests use Jest's mocking capabilities to mock:
- Prisma client for database operations
- JWT for authentication
- bcrypt for password hashing

This allows testing the routes without requiring a real database connection.