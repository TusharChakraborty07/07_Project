const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  content: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("todo", todoSchema);
