var Users = require("../models/user.js"),
passport = require('passport');

var _user_ = {};
_user_.all  = function(req, res) {
  console.log('hot here');
  Users.find({}, function(err, users) {

    if(err) {
      res.status(500).send(err);
    }
    else {
      res.send(users);
    }
  });
};

_user_.find = function (req, res) {
    res.send(req.user);
};

_user_.update = function (req, res) {
   res.send(req.user);
};

_user_.remove = function (req, res) {
  var user = req.user;
  user.remove(function(err,data){
    if(err) {
      res.status(500).send(err);
    }
    else {
      res.send(data);
    }
  });
};

_user_.findOne = function (req, res, next) {
   Users.find({id: req.params.id}, function (err, user) {
    if(err) {
       res.status(500).send(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};

_user_.login = function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
      if (err) {
          return next(err);
      }

      if (user) {
          req.login(user, function(err) {
              if (err) {
                  res.send(400, err);
              } else {
                  res.jsonp(user);
              }
          });
      } else {
          return res.status(401).json(info);
      }
  })(req, res, next);
};

_user_.create = function (req, res) {
  var user = new Users(req.body);
  user.save(function(err, data) {
    if(err) {
      res.status(500).send(err);
    }
    else {
      res.jsonp(data);
    }
  });
};

module.exports = _user_;