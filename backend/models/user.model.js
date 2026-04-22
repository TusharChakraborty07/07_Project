const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: {
    type: mongoose.Schema.Types.ObjectId,
    res: "todo",
  },
});

module.exports = mongoose.model("user", userSchema);
