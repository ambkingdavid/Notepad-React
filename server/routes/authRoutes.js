import express from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv'
import User from '../models/user.model.js'
dotenv.config()

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = await User.create({
          googleId: profile.id,
          fullName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profileImage: profile.photos[0].value,
        });
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

router.get('/login', (req, res) => {
  if (!req.user) {
    return res.status(401).redirect(process.env.CLIENT_URL)
  }
  res.status(200).send({
    success: true,
    message: 'Login Successful',
    user: req.user,
  })
});

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
  done(null, { id: user.id });
});

passport.deserializeUser(async (user, done) => {
  const obj = await User.findById(user.id);
  if (obj) {
    done(null, obj);
  }
});

export default router;
