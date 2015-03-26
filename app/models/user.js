var mongoose = require('mongoose'),
crypto = require('crypto');
// define our nerd model
// module.exports allows us to pass this to other files when it is called
var User = new mongoose.Schema({

  username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: "Please fill in your username"
  },

  name : {
    type : String,
    trim: true,
    required: 'Enter your name',
    default: ''
  },

  email: {
    type: String,
    trim: true,
    default: '',
    required: 'Please fill in your email',
    match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill in a valid email address']
  },

  gender: {
      type: String,
      trim: true,
      default: 'M',
  },

  password: {
      type: String,
      default: '',
      required: "Please fill in your password",
      match: [/\w{5}/, 'Password should be a minimum of 5 characters']
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  salt: {
      type: String
  },

  provider: {
      type: String
  }
});

User.pre('save', function (next) {
  if (this.password) {
      this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
      this.password = this.hashPassword(this.password);
  }

    next();
});

User.methods.hashPassword = function(password){
  if (this.salt && password) {
      return crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  } else {
      return password;
  }
};

User.methods.authentication = function(password) {
  return this.password === this.hashPassword(password);
};

User.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
};

module.exports =  mongoose.model('User', User, 'user document');