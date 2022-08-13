const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    // User creation is not going to be implemented but for the future, we set some validators
    required: [true, "You must provide a first name."],
    trim: true,
    maxLength: [100, "First name cannot have more than 100 characters."],
  },
  lastName: {
    type: String,
    required: [true, "You must provide a last name."],
    trim: true,
    maxLength: [100, "Last name cannot have more than 100 characters."],
  },
});

module.exports = mongoose.model("User", UserSchema);
