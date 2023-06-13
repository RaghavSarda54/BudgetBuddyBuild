const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1]; //second element of the array
    //to directly get the token
    //Bearer 9-uf90ewjfojifj after bearer is our token so [1]
    //now verifying the token on the basis of the JWT_SECRET it will be used to verify
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "AUTH failed",
          success: false,  
        });
      }
      //now for success
      else {
        //decoding the user id
        req.body.userId = decode.id; //this id is in userCtrl id = user._id
        next();
      }
    }); //error scenario
    //and if the token is decoded then we can send that to the user telling which user is logged in
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "AUTH failed",
      success: false,
    });
  }
};