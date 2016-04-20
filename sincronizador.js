var http = require('http');

var models;

var isDisponivelOptions = {
  host: 'gestortarifacao.azurewebsites.net',
  path: '/api/Disponibilidade/isDisponivel',
  method: 'GET',
};

var addTarifacaoOptions = {
  host: 'gestortarifacao.azurewebsites.net',
  path: '/api/tarifacao/addTarifacao',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

function init(m){
  models = m;
}

function sendRequest(data, options, successCallback, errorCallback, dataMigue){
  var r = http.request(options, function(req) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
      if(successCallback)
        successCallback(body, dataMigue);
    });
  }).on('error', function(e){
    if(errorCallback)
      errorCallback(e);
  });
  if(options.method == 'POST'){
    r.write(data);
  }
  r.end();
}

function checarDisponibilidade(successCallback){
  sendRequest({}, isDisponivelOptions, function(body){
    if(body.search("false") != -1){
      console.log('indisponivel');
      return
    }
    console.log('Disponivel');
    successCallback();
  }, function(e){
    console.error('Http request error: ', e);
  });
}

function enviarTarifacao(tarifa, successCallback){
  var postData = {
    Data: new Date().toISOString(),
    Item: "Requisiçoes",
    Quantidade: String(tarifa.requisicoes),
    UsuarioId: String(tarifa.promoter_id),
    ModuloId: "7630486"
  }

  sendRequest(JSON.stringify(postData), addTarifacaoOptions,function(body, tarifacao){
    if(body.search("false") != -1){
      console.error('Não foi possivel adicionar a tarifa');
      return;
    }
    console.log('Tarifacao adicionada com sucesso');
    successCallback(tarifacao);
  }, function(e){
    console.error('Http request error: ', e);
  }, tarifa);
}

function sincronizar(){
  checarDisponibilidade(function(){
    models.tarifacao.findAll({
      where : {
         requisicoes: {
          $gt: 0
        }
      }
    }).then(function(tarifacaos){
      if(tarifacaos.length == 0){
        console.log("Nada a sincronizar");
        return;
      }
      console.log("sincronizando");
      for (var i = tarifacaos.length - 1; i >= 0; i--) {
        enviarTarifacao(tarifacaos[i], function(tarifacao){
          tarifacao.update({
            requisicoes: 0
          }).then(function(tarifa) {
            console.log('Tarifacao atualizada');
          });
        });
      }
    });
  });
}

module.exports = {
  sincronizar: sincronizar,
  init: init
};
