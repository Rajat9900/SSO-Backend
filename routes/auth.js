const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/auth');
const router = express.Router();

const SECRET_KEY = 'your_secret_key'; 


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = Users.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ accessToken: token, username: user.username });
});


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  Users.push({
    id: Users.length + 1,
    username,
    password: hashedPassword,
  });

  res.json({ message: 'User registered successfully' });
});

module.exports = router;
