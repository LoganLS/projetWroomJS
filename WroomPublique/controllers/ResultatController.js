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
    var tableau = [];
    var placeSuivante;
    var nbPointsSuivant;
    var tempsMini;

    async.parallel ([
            function (callback) {
                model.getPointsParPlace(function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getGrandPrixParNum(num, function (err, result) {
                    callback(null, result)
                });
            },
            function (callback) {
                model.getPilotesParNum(num, function (err, result) {
                    callback(null, result)
                });
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            else if (typeof result !== 'undefined' && result.length > 0) {

                for (let i = 0 ; i <= result[1].length ; i++) {
                    if (i < result[1].length) {
                        tableau[i] = [result[0][i], result[1][i]];
                    } else {
                        if (i + 1 <= 10) {
                            nbPointsSuivant = result[0][i].PTNBPOINTSPLACE;
                        } else {
                            nbPointsSuivant = 0;
                        }
                        tempsMini = result[1][i - 1].TEMPSCOURSE;
                    }
                }
            }
            //[] sql retourne plusieurs lignes
            //[][] sql retourne une ligne
            response.tableau = tableau;
            response.placeSuivante = placeSuivante;
            response.nbPointsSuivant = nbPointsSuivant;
            response.gpnum = num;
            response.tempsMini = tempsMini;
            response.listePilotes= result[2];
            response.render('detailResultat',response);
        }
    );//fin async
}


