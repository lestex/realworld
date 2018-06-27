const {validate} = require('../../models/User');
const {validUser, invalidUser} = require('../fixtures/user');

describe('User', function() {
    it('user should be valid', () => {
        const result = validate(validUser);
        expect(result).toBeTruthy();
    });

    it('user without username should not be valid', () => {
        const result = validate(invalidUser);
        expect(result).toHaveProperty('error');
    });

    it('user.toJson', () => {
        const result = validUser.toJSON();
        resultObj = {email: "email@mail.com", username: "user1"}
        expect(result).toMatchObject(resultObj);
        expect(result).toHaveProperty('username');
        expect(result).toHaveProperty('email');
    });
});

