//placeholder
(function(){
  var defineRoutes = function (app, models, jwt) {
    app.get('/api/isEmailTaken/:email', function(req, res){
      models.promoter.findAll({
        where : {
          email : req.params.email
        }
      }).then(function(promoter) {
        res.json(promoter);
      });
    });
    app.post('/api/login', function(req, res){
      models.promoter.findOne({
        where : {
          email : req.body.email
        }
      }).then(function(promoter){
        if (!promoter) {
          res.json({ success: false, message: 'Authentication failed. promoter not found.' });
        }

        if (promoter.senha != req.body.senha) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          var token = jwt.sign(promoter.dataValues, app.get('superSecret'), {
            expiresIn: 1440*60 // expires in 24 hours
          });
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      });
    });
    app.use(function(req, res, next) {
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
          if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });
      } else {
        // if there is no token
        // return an error
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
      }
    });
    app.use(function(req, res, next) {
      // check header or url parameters or post parameters for token
      var promoter = req.decoded;
      models.tarifacao.findOne({
        where : {
          promoter_id : promoter.id
        }
      }).then(function(tarifacao) {
        tarifacao.increment('requisicoes');
        next();
      });
    });
    // app.get('/api/promoters/', function(req, res){
    //   models.promoter.findAll({
    //     attributes: ['id', 'bio'],
    //     include: [
    //       {
    //         model: models.user, as: 'user',
    //         attributes: ['id'],
    //         include:
    //         [{
    //           model: models.perfil, as: 'perfil',
    //           attributes: ['id', 'nome', 'birthday', 'sexo']
    //         }]
    //       },
    //       {
    //         model: models.tipoEvento, as:'especialidades'
    //       }
    //     ]
    //   }).then(function(promoters){
    //     if(promoters.length > 0 )
    //       res.json(promoters);
    //     else
    //       res.status(404).json({message: "Not Found", erros:[]});
    //   });
    // });
    // app.get('/api/promoters/:id', function(req, res){
    //   var where;
    //   if(req.params.id){
    //     where = {id: req.params.id};
    //   }
    //   models.promoter.findOne({
    //     where: where,
    //     attributes: ['id', 'bio'],
    //     include: [
    //       {
    //         model: models.user, as: 'user',
    //         attributes: ['id'],
    //         include:
    //         [{
    //           model: models.perfil, as: 'perfil',
    //           attributes: ['id', 'nome', 'birthday', 'sexo']
    //         }]
    //       },
    //       {
    //         model: models.tipoEvento, as:'especialidades'
    //       }
    //     ]
    //   }).then(function(promoter){
    //     if(promoter)
    //       res.json(promoter);
    //     else
    //       res.status(404).json({message: "Not Found", erros:[]});
    //   });
    // });

  };
  module.exports = defineRoutes;
}());
