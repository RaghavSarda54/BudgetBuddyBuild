// // import bcrypt from "bcrpyt";
// const userModel = require("../model/UserModel");
// // const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// //register callback
// const registerController = async (req, res) => {
//   try {
//     console.log(req);
//     console.log(res);
//     //first checking if the user is already a existing user or not and if already user then
//     //we will redirect the user to the login page else we will let the user to register
//     const existingUser = await userModel.findOne({ email: req.body.email }); //boolean type
//     if (existingUser) {
//       return res
//         .status(200)
//         .send({ message: "User Already Exits", success: false });
//     }
//     //NOW THE SUCCESS SCENARIO(letting the user register his details)
//     const password = req.body.password;
//     const salt = await bcrypt.genSalt(10); //no. of rounds 10 ex.
//     const hashedPassword = await bcrypt.hash(password, salt); //now this is encrypted password
//     req.body.password = hashedPassword;

//     //now with the help of the userModel we will create a new user
//     const newUser = new userModel(req.body); //as it gets the req.body we will await
//     await newUser.save(); //async request is going so await and we need to save the user
//     //and when the .save() function is called then we need to send back a response
//     res
//       .status(201)
//       .send({ message: `Registration  Succesfull`, success: true });
//   } catch (error) {
//     //handling the error scenario
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: `Register Controller ${error.message}`,
//     });
//   }
// };

// //login callbak
// const loginController = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email }); //it is an object
//     //checking if email entered exists or not
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: "User not Found", success: false });
//     }
//     //to compare the password we first need to decrypt it first
//     const isMatch = await bcrypt.compare(req.body.password, user.password); //boolean
//     //if email is correct and checked then:
//     //for password matching //matching the password we get
//     if (!isMatch) {
//       //200 means that ok request just the password is wrong
//       return res
//         .status(200)
//         .send({ message: "Invalid Email or Password", success: false });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res.status(200).send({ message: "Login Success", success: true, token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
//   }
// };

// const authController = async (req, res) => {
//   try {
//     //we have to get the user and then await
//     const user = await userModel.findById({ _id: req.body.userId }); //CHANGED TO BYID EARLIER ONE
//     user.password = undefined; //hiding the user's password
//     if (!user) {
//       console.log(user);
//       return res.status(200).send({
//         message: "User Not Found",
//         success: false,
//       });
//     } else {
//       //if we got the user
//       res.status(200).send({
//         success: true,
//         // data: {
//         //   name: user.name,
//         //   email: user.email,
//         //   //both the above things we will return and pass
//         // },
//         //earlier above was right but after logging with admin also the text was user and not admin
//         //AND EVEN FOR ADMIN WE WERE GETTING THE USER SECTION AS:
//         //name: user, email: user123@gmail.com instead of the ADMIN
//         data: user, //passing the whole user that we get above from the req
//         // and not just the email and pass of him
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "AUTH error",
//       success: false,
//       error,
//     });
//   }
// };

// module.exports = {
//   loginController,
//   registerController,
//   authController,
// };
