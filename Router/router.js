const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { LoginUser } = require("../Authentication/Login");
const { registerUser } = require("../Authentication/Register");
const { getHistoryData } = require("../model/post");
const { historyData, countData } = require("../model/post");

const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/history").get(getHistoryData);
router.route("/history").post(historyData);
//router.route("").post(countData);

module.exports = {routerFolder: router};