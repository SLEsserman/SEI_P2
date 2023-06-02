const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')

// Configure and use Google OAuth2 strategy with Passport
passport.use(new GoogleStrategy(
  // Configuration object
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  // The verify callback function
  // Let's use async/await!
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // Find an existing user in the database based on the Google ID
      let user = await User.findOne({ googleId: profile.id });
      // If an existing user is found, provide it to Passport
      if (user) return cb(null, user);
      // If no existing user is found, create a new user using the profile data from OAuth
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
      // Provide the newly created user to Passport
      return cb(null, user);
    } catch (err) {
      // If an error occurs during the process, return the error to Passport
      return cb(err);
    }
  }
));

// Serialize the user object to store in the session
passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

// take out the user object from the session
passport.deserializeUser(async function(userId, cb) {
  cb(null, await User.findById(userId));
});
