module.exports = function (app) {
  require('./user')(app);
  app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html');
  });
  return app;
};
