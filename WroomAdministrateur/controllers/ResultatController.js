let model = require('../models/resultat.js');
var async=require('async');
// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
    response.title = 'Liste Grand Prix';
    model.getListeGrandPrix(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        response.render('listerEcurie', response);
    });
}