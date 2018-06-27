const request = require('supertest');
const {User} = require('../../models/User')

let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../../app'); })
    afterEach(() => { server.close(); })
    afterAll(() => { User.collection.drop(); })

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

    // login 
    describe('POST /login', () => {
        it('should return 200 if username and password are correct', async () => {
            const user = new User({
                username: "testUser",
                email: "user@email.com",
                password: "123456"
            });
            user.save();
            const apiUser = { user: {
                username: "testUser",
                email: "user@email.com",
                password: "123456"
            }};
            const res = await request(server).post('/api/users/login').send(apiUser);
            expect(res.status).toBe(200);
        });
    })
});