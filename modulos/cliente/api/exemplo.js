//placeholder
(function(){
  var defineRoutes = function (app, models) {
    app.get('/api/isEmailTaken/:email', function(req, res){
      models.user.findAll({
        where : {
          email : req.params.email
        }
      }).then(function(user) {
        res.json(user);
      });
    });
  };
  module.exports = defineRoutes;
}());
