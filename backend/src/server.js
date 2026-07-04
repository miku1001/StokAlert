const pool = require('./config/db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');

const productRoutes = require('./routes/product');


const app=express()

app.use(cors(
  {origin: 'https://localhost:5173',
  credentials: true}
));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false,
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.use('/products', productRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Stokalerto API Running'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running:${PORT}`)
});



