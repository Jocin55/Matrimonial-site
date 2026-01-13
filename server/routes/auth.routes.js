const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/signin', async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
  if (!user) return res.status(400).json({ message: 'Not a registered user!' });
  if (!user.approved) return res.status(403).json({ message: 'User not approved by admin yet!' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Password does not match!' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, role: user.role });
});

module.exports = router;
