const request = require('supertest');
let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../../app'); })
    afterEach(() => { server.close(); })

    describe('GET /', () => {
        it('should return OK - 200', async () => {
            const res = await request(server).get('/api/user');
            expect(res.status).toBe(200);
        });
    })
});