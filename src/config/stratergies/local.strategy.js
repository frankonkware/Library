/* eslint-disable linebreak-style */
require('dotenv').config();
const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app.local.strategy');


module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = process.env.DATABASE_URL;
      const dbName = process.env.DATABASE_NAME;
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);

          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('users');
          
          const user = await col.findOne({ username });

          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          console.log(err.stack);
        }

        // client.close();
      }());
    }
  ));
};
