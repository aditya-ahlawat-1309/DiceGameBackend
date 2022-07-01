const express = require("express");
const { History, User } = require("../Database/schema");
const app = express();
app.use(express.json());

const historyData =async(req,res) => {
    try{
    const { authorization } = req.headers;
    //console.log(req.headers.authorization.split(" "));
    const username = authorization.split(" ")[1].split(":")[1];
  const Items = req.body;
  
  const user = await User.findOne({ username }).exec();
 // console.log(user);
  //console.log(username);
  if (!user) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }

  const history = await History.findOne({ userId: user._id }).exec();
 //console.log(Items.body);
  if (!history) {
    await History.create({
      userId: user._id,
      history: Items.body,
    });
  } else {
    history.history = Items.body;
    await history.save();
  }
  res.json(Items.body);

} catch(err)
{
    console.log(err);
}
}

// const countData =async(req,res) => {
//     const total = History.collection.count();
//     res.json(total);
// };


const getHistoryData = async (req, res) => {
  try {
    const { authorization } = req.headers;
    //console.log(req.headers.authorization.split(" "));
    const username = authorization.split(" ")[1].split(":")[1];
    const user = await User.findOne({ username }).exec();
     //console.log(user);
    if (!user) {
      res.status(403);
      res.json({
        message: "invalid access",
      });
      return;
    }
   const  { history } = await History.findOne({ userId: user._id }).exec();
   console.log(history);
   res.json(history);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
historyData,
getHistoryData 
//countData
};