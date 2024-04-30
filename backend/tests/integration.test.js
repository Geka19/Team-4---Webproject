
const request = require('supertest');
const app = require('../server');

describe('Integration tests for server endpoints', () => {
    it('GET /api/auth/login should return 404', async () => {
        const response = await request(app).get('/api/auth/login');
        expect(response.status).toBe(404);
    });

    it('POST /api/auth/register should return 400 for invalid input', async () => {
        const response = await request(app)
        .post('/api/auth/register')
        .send({}); // Send empty body to trigger validation error
        expect(response.status).toBe(400);
    });
});
