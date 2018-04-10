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

module.exports.menuResultats = function(request, response){
    response.title = 'Menu des résultats';
    response.css="admin";
    async.parallel ([

            function (callback) {
                model.getListeGrandPrix(function (err, result) { callback(null, result) });
            },
            function (callback) {
                model.initialiserPointsPilotes(function (err, result) { callback(null, result) });
            },
            function (callback) {
                model.initialiserPointsEcuries(function (err, result) { callback(null, result) });
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
        response.listeGp = result[0]
        response.render('menuResultats', response);
    });
}

module.exports.ModifierResultats = function(request,response){
    response.title = 'Modifier Resultats';
    let tableau = [];
    let num = request.params.numGp;
    let placeSuivante;
    let nbPointsSuivant;
    let tempsMini;

    async.parallel ([
            function (callback) {
                model.getPointsParPlace(function (err, result) { callback(null, result) });
            },
            function (callback) {
                model.getGrandPrixParNum(num, function (err, result) { callback(null, result) });
            },
            function (callback) {
                model.getPilotesParNum(num, function (err, result) { callback(null, result) });
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            for (let i = 0 ; i <= result[1].length ; i++) {
                if (i < result[1].length) {
                    tableau[i] = [result[0][i], result[1][i]];
                } else {
                    if (result[0][i - 1].ptplace != 10) {
                        nbPointsSuivant = result[0][i].PTNBPOINTSPLACE;
                    } else {
                        nbPointsSuivant = 0;
                    }
                    tempsMini = result[1][i - 1].TEMPSCOURSE;
                }
            }
            //[] sql retourne plusieurs lignes
            //[][] sql retourne une ligne
            response.tableau = tableau;
            response.placeSuivante = placeSuivante;
            response.nbPointsSuivant = nbPointsSuivant;
            response.gpnum = num;
            response.tempsMini = tempsMini;
            response.patternTempsMini = fonctions.patternTempsMini(tempsMini);
            response.listePilotes= result[2];
            console.log(result[1]);
            console.log(result[1][0]);
            console.log(result[0]);
            response.render('modifierResultat',response);
        }
    );//fin async
}