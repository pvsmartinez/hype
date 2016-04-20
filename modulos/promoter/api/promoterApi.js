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
        },
        attributes: ['id', 'biografia', 'dataNascimento', 'email', 'especialidade', 'experiencia', 'nome', 'senha']
      }).then(function(promoter){
        if (!promoter) {
          res.json({ success: false, message: 'Authentication failed. promoter not found.' });
          return;
        }

        if (promoter.senha != req.body.senha) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          var tokenPromoter = promoter.dataValues;
          delete tokenPromoter.senha
          var token = jwt.sign(tokenPromoter, app.get('superSecret'), {
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

    app.post('/api/novoPromoter', function(req, res){
      models.promoter
        .build(req.body)
        .save()
        .then(function(promoter) {
          models.tarifacao
          .build({
            valorTarifa: 0.01,
            requisicoes: 0,
            promoter_id: promoter.id})
          .save()
          .then(function(promoter) {
            res.send();
          }).catch(function(error){
            res.status(400).json({message: 'Failed to create tarifacao'});
          });
        }).catch(function(error) {
          res.status(400).json({message: 'Failed to create promoter'});
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

    app.get('/api/loadPerfil', function(req, res){
      models.promoter.findById(req.decoded.id, {
        attributes: ['id', 'biografia', 'dataNascimento', 'email', 'especialidade', 'experiencia', 'nome']
      }).then(function(promoter){
        if (!promoter) {
          res.status(500).json({ success: false, message: 'Server Error' });
        }else{
          res.json(promoter.dataValues);
        }
      });
    });

    app.get('/api/loadFornecedors', function(req, res){
      models.fornecedor.findAll({
        include: [
          { model: models.favorito, where:{ promoter_id: req.decoded.id}, required: false}
        ],
      }).then(function(promoters){
        var formatedPromoters = [];
        promoters.forEach(function(element){
          var formatedPromoter = element.dataValues;
          formatedPromoter.favorito = formatedPromoter.Favoritos.length > 0; 
          delete formatedPromoter.Favoritos;
          formatedPromoters.push(formatedPromoter);
        });
        res.json(formatedPromoters);
      });
    });

    app.get('/api/loadServicos', function(req, res){
      models.servico.findAll({
        where:{ promoter_id: req.decoded.id}
      }).then(function(promoters){
        res.json(promoters);
      });
    });

    app.post('/api/addToFavoritos', function(req, res){
      models.favorito
        .build({promoter_id: req.decoded.id, fornecedor_id: req.body.fornecedorId})
        .save()
        .then(function(favorito) {
          res.send();
        }).catch(function(error) {
          res.status(400).json({message: 'Failed to create Favorito'});
        });
    });

    app.post('/api/removeFromFavoritos', function(req, res){
      models.favorito.findOne({
        where: {promoter_id: req.decoded.id, fornecedor_id: req.body.fornecedorId}
      }).then(function(favorito){
        if(favorito){
          favorito.destroy({ force: true });
        }
        res.json();
      });
    });

    app.post('/api/cancelServico', function(req, res){
      models.servico.findById(req.body.servicoId).then(function(servico){
        if(!servico){
          res.status(400).json({message: 'Failed to cancel serviço'});
          return;
        }
        servico.update({ estado: 'Cancelado'}).then(function (servico){
          res.json(servico.dataValues);
        });
      });
    });
  };
  module.exports = defineRoutes;
}());
