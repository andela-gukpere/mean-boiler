var Users = require("./models/user.js");

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.status(200).send('OK');
  });

  app.get('/api/users', function(req, res) {
    Users.find(function(err, users) {
      if(err) {
        res.status(500).send(err);
      }
      else {
        res.send(users);
      }
    });
  });

  app.get('/api/users/:id', function (req, res){
    Users.find({id: req.params.id}, function (err, user) {
      if(err) {
         res.status(500).send(err);
      }
      else {
        res.send(user);
      }
    });
  });

  app.get('/home', function(req, res) {
      res.sendfile('./public/views/index.html');
  });

  return app;
};