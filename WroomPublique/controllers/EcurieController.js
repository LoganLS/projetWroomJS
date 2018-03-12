let model = require('../models/ecurie.js');
var async=require('async');
// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
    response.title = 'Liste des écuries';
    model.getListeEcurie(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        response.render('listerEcurie', response);
    });
}

module.exports.DetailEcurie = function(request,response){
    response.title = 'Détail ecurie';
    var num = request.params.numEcurie;

    async.parallel([
            function(callback){
                model.getListeEcurie(function (err, result) {
                    callback(null,result);
                });
            }, //fin callback0

            function(callback){
                model.getInfosEcuries(num, function(err,result){
                    callback(null,result);
                });
            }, //fin callback1
            function(callback){
                model.getPiloteNumEcurie(num, function(err,result){
                    callback(null,result);
                });
            },
            function(callback){
                model.getVoitureNumEcurie(num, function(err,result){
                    callback(null,result);
                });
            },//fin callback3

        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listeEcurie= result[0];
            response.infosEcurie = result[1][0];
            response.infosPilotes = result[2];
            response.infosVoitures = result[3];
            console.log(result[3]);
            response.render('detailEcurie',response);
        }
    );//fin async
}