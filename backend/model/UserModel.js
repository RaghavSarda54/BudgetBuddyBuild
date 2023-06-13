const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  id:{
    type:String, //from MONGODB
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: Number,
    required: [true, "password is required"],
  },
  contact: {
    type: Number,
    required: [true, "contact no. is required"],
  },
},
{timestamps:true}
);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
