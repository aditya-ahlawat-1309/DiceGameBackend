const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
//const ObjectId = require("mongoose").Types.ObjectId;
const historySchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  history: [
    {
      id: String,
      text: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
const History = mongoose.model("History", historySchema); 

module.exports = {
User,
History
}

