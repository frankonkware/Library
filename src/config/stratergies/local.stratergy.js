const passport = require('passport');
const { Stratergy } = require('passport-local');

module.exports = function localStratergy() {
  passport.use(new Stratergy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const user = {
        username, password
      };
      done(null, user);
    }));
};