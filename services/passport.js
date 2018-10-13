const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).exec().then(user => {
    done(null, user);
  });
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne( { googleID: profile.id }).exec();
      if (!existingUser) {
        new User({ googleID: profile.id })
          .save()
          .then(user => done(null, user));
      } else {
        done(null, existingUser);
      }
		}
	)
);
