const request = require('supertest');

let server;

describe('/api/profiles', () => {
    beforeEach(() => { 
        server = require('../../app');
    })

    afterEach( async () => {
        server.close();        
    })

    it('GET / should return 200', async () => {
        const res = await request(server).get('/api/profiles');
        expect(res.status).toBe(200);
    });

    it('GET /me should return 200', async () => {
        const res = await request(server).get('/api/profiles/me');
        expect(res.status).toBe(200);
    });

});
