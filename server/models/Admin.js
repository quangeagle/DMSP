import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const adminModel = mongoose.model('Admin', adminSchema);
export {adminModel as Admin}






// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema({
//     username: {type: String, required: true, unique: true},
//     password: {type: String, required: true}
// })

// const adminModel = mongoose.model('Admin', adminSchema)
// export {adminModel as Admin}