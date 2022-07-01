const express = require("express");
const { User, History } = require("../Database/schema");
const app = express();

app.use(express.json());

const getHistoryData =async (req, res) => {
  try{
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const { data } = await History.findOne({ userId: user._id }).exec();
  res.json(data);
    }
    catch(err)
    {
        console.log(err);
    }
};

module.exports = {
    getHistoryData
}