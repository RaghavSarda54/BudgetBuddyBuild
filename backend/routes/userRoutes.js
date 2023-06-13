const express = require("express");
const {
  loginController,
  registerController,
  authController,
} = require("../controllers/userCtrl");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router(); //creating the router object

router.post("/income"); 

router.post("/expense");

router.use("/accounts", require("./AccountsDisplay"));
router.use("/transactions", require("./TransactionDisplay"));

//routes
//LOGIN || POST
// router.post("/login", loginController);

//REGISTER || POST
// router.post("/register", registerController);

//AUTh || POST
// router.post("/getUserData", authMiddleware, authController);

module.exports = router;
