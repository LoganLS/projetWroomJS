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
        response.listeGp = result[0];;
        response.render('menuResultats', response);
    });
}

module.exports.ModifierResultats = function(request,response){
    response.title = 'Modifier Resultats';
    response.css = 'admin';
    let tableau = [];
    let num = request.body.gp;
    let placeSuivante;
    let nbPointsSuivant;
    let tempsMini;

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
            response.render('modifierResultats',response);
        }
    );//fin async
}


module.exports.ajouterResultat = function(request, response){
    response.title = 'Résultat ajouté';
    response.css="admin";

    let num = request.body.num;
    let pilnum = request.body.pilnum;
    let temps =  request.body.temps;
    let nbpoints = request.body.nbpoints;

    console.log(num);
    console.log(pilnum);
    console.log(temps);
    console.log(nbpoints);

    async.parallel ([
        function (callback) {
            model.ajouterPointsPilote(pilnum, nbpoints, function (err, result) {
                callback(null, result)
            });
        },
        function (callback) {
            model.ajouterPointsEcurie(pilnum, nbpoints, function (err, result) {
                callback(null, result)
            });
        },
        function (callback) {
            model.ajouterResultat(num, pilnum, temps, function (err, result) {
                callback(null, result)
            });
        },
    ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.render('ajout', response);
    });
}


module.exports.pageSupprimerResultat = function(request, response){
    response.title = 'Résultat supprimé';
    response.css="admin";
    var num=request.params.numGrandPrix;
    var pilote=request.params.numPilote;
    var nbpoints = request.params.nbPoints;

    async.parallel ([
        function (callback) {
            model.supprimerPtsPilote(pilote, nbpoints, function (err, result) { callback(null, result) });
        },
        function (callback) {
            model.supprimerPtsEcurie(pilote, nbpoints, function (err, result) { callback(null, result) });
        },
        function (callback) {
            model.supprimerResultat(num, pilote, function (err, result) { callback(null, result) });
        },
    ],
        function (err, result) {
        if (err) {
            return;
        }

        response.render('supprimer', response);
    });
}