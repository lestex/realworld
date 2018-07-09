const request = require('supertest');
const {User} = require('../../models/User');
const fixtures = require('../fixtures/user');

let server;

describe('/api/users', () => {
    beforeEach(() => { 
        server = require('../../app');
    })

    afterEach( async () => {
        server.close();
        await User.remove({});
    })    

    describe('POST /', () => {
        it('should return 422 if username not provided', async () => {
            const user = fixtures.UserNoUsername;
            const res = await request(server).post('/api/users').send(user);
            expect(res.status).toBe(422);            
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toHaveProperty('username');
        });

        it('should return 422 if password not provided', async () => {
            const user = fixtures.UserNoPassword;
            const res = await request(server).post('/api/users').send(user);
            expect(res.status).toBe(422);            
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toHaveProperty('password');
        });

        it('should return 422 if email not provided', async () => {
            const user = fixtures.UserNoEmail;
            const res = await request(server).post('/api/users').send(user);
            expect(res.status).toBe(422);            
            expect(res.body).toHaveProperty('errors');
            expect(res.body.errors).toHaveProperty('email');
        });

        it('should return user with username email and token', async () => {
            const user = fixtures.validUser;
            const res = await request(server).post('/api/users').send(user);
            expect(res.status).toBe(200);
            expect(res.body.user).toHaveProperty('username');
            expect(res.body.user).toHaveProperty('email');
            expect(res.body.user).toHaveProperty('token');
        });
    })

    // login 
    describe('POST /login', () => {
        it('should return 200 if username and password are correct', async () => {
            const user = fixtures.validMongoUser;
            user.save();
            const apiUser = fixtures.validUser;
            const res = await request(server).post('/api/users/login').send(apiUser);
            expect(res.status).toBe(200);
        });
    })
});