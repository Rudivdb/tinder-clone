const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tinder-clone', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  name: String,
  image: String,
  swipes: [{ userId: String, direction: String }]
});

const User = mongoose.model('User', UserSchema);

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    await User.create([
      { name: 'Jane Doe', image: 'https://via.placeholder.com/150', swipes: [] },
      { name: 'John Smith', image: 'https://via.placeholder.com/150', swipes: [] },
    ]);
  }
  const updatedUsers = await User.find();
  res.json(updatedUsers);
});

app.post('/api/swipe', async (req, res) => {
  const { direction, userId } = req.body;
  const user = await User.findById(userId);
  if (user) {
    user.swipes.push({ userId, direction });
    await user.save();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});