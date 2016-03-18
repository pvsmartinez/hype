//placeholder
(function(){
  var defineRoutes = function (app, models) {
    app.get('/api/tipoEventos/', function(req, res){
      models.tipoEvento.findAll({
        attributes: ['id', 'nome']
      }).then(function(tipoEventos){
        res.json(tipoEventos);
      });
    });

    app.get('/api/tipoEventos/:like', function(req, res){
      var where;
      if(req.params.like){
        where = {nome: {$like: ('%' + req.params.like + '%')}};
      }
      models.tipoEvento.findAll({
        where: where,
        attributes: ['id', 'nome']
      }).then(function(tipoEventos){
        if(tipoEventos.length > 0 )
          res.json(tipoEventos);
        else
          res.status(404).json({message: "Not Found", erros:[]});
      });
    });

  };
  module.exports = defineRoutes;
}());
