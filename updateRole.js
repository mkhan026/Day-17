const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const users = await User.find({ email: "test@test.com" });
    console.log(users);
    mongoose.disconnect();
  })
  .catch((err) => console.log(err));