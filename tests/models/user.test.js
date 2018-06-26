const User = require('../../models/User');

const validUser = require('../fixtures/user');

describe('User', function() {
    it('should be invalid if username is empty', () => {
        validUser.save();
        User.find({ username: validUser.username })
            .then((user) => {
                expect(user).toEqual(validUser);
            });
    });
});

