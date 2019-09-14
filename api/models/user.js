import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import userRoles from'../config/main';
const Schema = mongoose.Schema;
const saltRounds = 10;
const userSchema = new Schema({
    name: { type: String,required: true},
    gender: {type: String},
    email: {type: String, lowercase: true, unique: true, required: true},
    password: {type: String, required: true},
    // role: {
    //     type: String,
    //     enum: ['User','Admin'],
    //     default: 'User'
    // }
    role:{
        type: Number,
        default: userRoles.user
    },
});

// Saves the user's password hashed (plain text password storage is not good)
userSchema.pre('save', function (next) {
     //'this' refers to the current document about to be saved  
    const user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(saltRounds, function (err, salt) {
            // Generate a salt  
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in our password DB
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });
  
  //  method to compare password input to password saved in database
  userSchema.methods.comparePassword = async function(pw,cb) {  
    const user  = this;
    
    // match the hashed passwords
    bcrypt.compare(pw, user.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

const User = mongoose.model('User', userSchema);

export default User;