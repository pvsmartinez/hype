//placeholder
(function(){
  var defineRoutes = function (app, models) {
    app.get('/api/promoters/', function(req, res){
      models.promoter.findAll({
        attributes: ['id', 'bio'],
        include: [
          {
            model: models.user, as: 'user',
            attributes: ['id'], 
            include: 
            [{
              model: models.perfil, as: 'perfil', 
              attributes: ['id', 'nome', 'birthday', 'sexo']
            }] 
          },
          {
            model: models.tipoEvento, as:'especialidades'
          }
        ]
      }).then(function(promoters){
        if(promoters.length > 0 )
          res.json(promoters);
        else
          res.status(404).json({message: "Not Found", erros:[]});
      });
    });

    app.get('/api/promoters/:id', function(req, res){
      var where;
      if(req.params.id){
        where = {id: req.params.id};
      }
      models.promoter.findOne({
        where: where,
        attributes: ['id', 'bio'],
        include: [
          {
            model: models.user, as: 'user',
            attributes: ['id'], 
            include: 
            [{
              model: models.perfil, as: 'perfil', 
              attributes: ['id', 'nome', 'birthday', 'sexo']
            }] 
          },
          {
            model: models.tipoEvento, as:'especialidades'
          }
        ]
      }).then(function(promoter){
        if(promoter)
          res.json(promoter);
        else
          res.status(404).json({message: "Not Found", erros:[]});
      });
    });

  };
  module.exports = defineRoutes;
}());
