var users = require('../controllers/user.js');

module.exports = function (app) {

  app.route('/api/users/')
    .get(users.all)
    .post(users.create);

  app.route('/api/users/:userId')
    .get(users.find)
    .put(users.update)
    .delete(users.remove);

  app.param('userId', users.findOne);

  return app;
};