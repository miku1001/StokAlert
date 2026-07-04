const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const pool = require('./db');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user is existing
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE google_id = $1',
        [profile.id]
      );

      if (existingUser.rows.length > 0) {
        return done(null, existingUser.rows[0]);
      }

      // 2. Create new store if none
      const newStore = await pool.query(
        'INSERT INTO stores (name) VALUES ($1) RETURNING *',
        [`${profile.displayName}'s Store`]
      );
      const storeId = newStore.rows[0].id;

      // 3. Link the store to the user
      const newUser = await pool.query(
        `INSERT INTO users (store_id, email, google_id, role)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [storeId, profile.emails[0].value, profile.id, 'owner']
      );

      return done(null, newUser.rows[0]);
    } catch (err) {
      return done(err, null);
    }
  }
));

// save user session
passport.serializeUser((user, done) => {
  done(null, user.id); // save session id
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]); // return user
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;