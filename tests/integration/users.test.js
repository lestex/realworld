const request = require('supertest');
let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../../app'); })
    afterEach(() => { server.close(); })

    describe('POST /', () => {
        it('should return 422 if username not provided', async () => {
            const invalidUser = { user: {
                username: "",
                email: "user@email.com",
                password: "123456"
            }};
            const res = await request(server).post('/api/users').send(invalidUser);
            expect(res.status).toBe(422);            
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toHaveProperty('username');
        });
    })

    describe('POST /', () => {
        it('should return 422 if password not provided', async () => {
            const invalidUser = { user: {
                username: "testUser",
                email: "user@email.com",
                password: ""
            }};
            const res = await request(server).post('/api/users').send(invalidUser);
            expect(res.status).toBe(422);            
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toHaveProperty('password');
        });
    })

    describe('POST /', () => {
        it('should return 422 if email not provided', async () => {
            const invalidUser = { user: {
                username: "testUser",
                email: "",
                password: "12345678"
            }};
            const res = await request(server).post('/api/users').send(invalidUser);
            expect(res.status).toBe(422);            
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toHaveProperty('email');
        });
    })

    describe('POST /', () => {
        it('should return user with username email and token', async () => {
            const User = { user: {
                                username: "testUser",
                                email: "user@email.com",
                                password: "123456"
                         }};
            const res = await request(server).post('/api/users').send(User);
            expect(res.status).toBe(200);
            expect(res.body.user).toHaveProperty('username');
            expect(res.body.user).toHaveProperty('email');
            expect(res.body.user).toHaveProperty('token');
        });
    })
});