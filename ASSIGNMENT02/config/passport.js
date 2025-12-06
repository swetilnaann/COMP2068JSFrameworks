// config/passport.js
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

module.exports = (passport) => {
  // ===== Local (email + password) =====
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // ===== Google OAuth =====
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0]?.value;
          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }],
          });

          if (!user) {
            user = await User.create({
              name: profile.displayName || "Google User",
              email,
              googleId: profile.id,
              avatar: profile.photos && profile.photos[0]?.value,
            });
          } else {
            // link googleId if missing
            let changed = false;
            if (!user.googleId) {
              user.googleId = profile.id;
              changed = true;
            }
            if (profile.photos && profile.photos[0]?.value && user.avatar !== profile.photos[0].value) {
              user.avatar = profile.photos[0].value;
              changed = true;
            }
            if (changed) await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // ===== GitHub OAuth =====
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const primaryEmail =
            (profile.emails && profile.emails[0]?.value) ||
            profile._json?.email ||
            undefined;

          let user = await User.findOne({
            $or: [{ githubId: profile.id }, { email: primaryEmail }],
          });

          if (!user) {
            user = await User.create({
              name: profile.displayName || profile.username || "GitHub User",
              email: primaryEmail,
              githubId: profile.id,
              avatar: profile.photos && profile.photos[0]?.value,
            });
          } else {
            let changed = false;
            if (!user.githubId) {
              user.githubId = profile.id;
              changed = true;
            }
            if (profile.photos && profile.photos[0]?.value && user.avatar !== profile.photos[0].value) {
              user.avatar = profile.photos[0].value;
              changed = true;
            }
            if (changed) await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
