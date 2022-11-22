// collection name - user
// We’ll define our schema for the user details when signing up for the first time and validate them against the saved credentials when logging in.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
          first_name: { type: String, default: null },
          last_name: { type: String, default: null },
          email: { type: String, unique: true },
          password: { type: String },
          token: { type: String },
});

// we are creating a new collection(user)
module.exports = mongoose.model("user", userSchema);