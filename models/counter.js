var mongoose = require("mongoose");

var CounterSchema = new mongoose.Schema({
  createUserCount: { type: Number, required: true },
  updateUserCount: { type: Number, required: true }
});

module.exports = mongoose.model("counter", CounterSchema);