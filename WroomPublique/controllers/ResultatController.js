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