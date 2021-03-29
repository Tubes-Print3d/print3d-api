const express = require("express");
const passport = require("passport");
const router = express.Router();
const controller = require("../../controllers/user.controller");
const validator = require("../../middleware/validators/user.validator");
const Pengguna = require("../../models/pengguna/pengguna.model");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-auth").Strategy;

router.post("/register", validator.register, controller.register);
passport.use(new LocalStrategy(Pengguna.authenticate()));
passport.serializeUser(Pengguna.serializeUser());
passport.deserializeUser(Pengguna.deserializeUser());

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET, GOOGLE_CALLBACK } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: GOOGLE_CALLBACK,
      accessType: "offline",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, extractProfile(profile));
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
app.get(
  "/callback",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  (req, res) => {
    return res.send("Congrats");
  }
);

router.post("/login", () => {});

module.exports = router;
