import express from 'express';
import LocalStrategy from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import 'dotenv/config'
import User from '../models/user.model.js'
import isLoggedIn from '../middleware/authentication.js';


const router = express.Router();

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username })
      if (!user) {
        done(null, false);
      }
      if (!user.verifyPassword(password)) {
        done(null, false);
      }
      console.log('useer found')
      done(null, user);
    } catch (error) {
      done(error)
    }
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        done(null, user);
      } else {
        const newUser = await User.create({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profileImage: profile.photos[0].value,
        });
        done(null, newUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_URL,
    successRedirect: process.env.CLIENT_URL + '/dashboard'
  }));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (!user) {
      return res.status(401).send('Authentication failed');
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      return res.send('Login successful');
    });
  })(req, res, next);
});

router.get('/status', isLoggedIn, (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'User is logged in',
    user: req.user,
  })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send({
      success: true,
      message: 'User Logged out Successfully',
    });
  });
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(err);
  }
});

export default router;
