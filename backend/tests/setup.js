// This file contains setup code for Jest tests

// Mock environment variables
process.env.JWT_SECRET_KEY = 'test-secret-key';
process.env.PORT = '3000';

// Global teardown
afterAll(() => {
  // Clean up any global resources if needed
});