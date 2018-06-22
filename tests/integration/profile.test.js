const request = require('supertest');
let server;

describe('/api/profiles', () => {
    beforeEach(() => { server = require('../../app'); })
    afterEach(() => { server.close(); })

    describe('GET /', () => {
        it('should return OK - 200', async () => {
            const res = await request(server).get('/api/profiles');
            expect(res.status).toBe(200);
            //expect(res.body).toMatch(/profiles/);
        });
    })

    describe('GET /me', () => {
        it('should return OK - 200', async () => {
            const res = await request(server).get('/api/profiles/me');
            expect(res.status).toBe(200);
            //expect(res.body).toMatch(/me/);
        });
    })
});