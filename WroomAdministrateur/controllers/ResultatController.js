let model = require('../models/resultat.js');
var async=require('async');
// //////////////////////// L I S T E R  R E S U L T A T S

module.exports.ListerResultats = function(request, response){
    response.title = 'Liste Grand Prix';
    model.getListeGrandPrix(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeResultats = result;
        console.log(result);
        response.render('listerResultat', response);
    });
}


module.exports.DetailResultat = function(request,response){
    response.title = 'Détail grand prix';
    var num = request.params.numGp;

    async.parallel([
            function(callback){
                model.getListeGrandPrix(function (err, result) {
                    callback(null,result);
                });
            }, //fin callback0

            function(callback){
                model.getResultatGrandPrix(num,function (err, result) {
                    callback(null,result);
                });
            }, //fin callback1


        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listeGP= result[0];
            response.listeRes= result[1];
            console.log(result[1]);
            console.log(result[1][0]);
            console.log(result[0]);
            response.render('detailResultat',response);
        }
    );//fin async
}