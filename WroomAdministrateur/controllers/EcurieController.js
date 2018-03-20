let model = require('../models/ecurie.js');
let modelPays = require('../models/pays.js');
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


module.exports.menuEcurie = function(request, response){
    response.title = 'Menu des Ecuries';
    response.css="admin";
    model.getMenuEcurie(function(err,result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.menuEcurie = result;
        console.log(result);
        response.render('menuEcurie', response);
    });
}

module.exports.pageAjouterEcurie = function(request, response){
    response.title = 'Ajouter une écurie';
    response.css="admin";
    async.parallel([
            function(callback){
                modelPays.getAllPays(function(err,result){
                    callback(null,result);
                });
            }, //fin callback0
        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listePays=result[0];
            response.render('ajouterEcurie',response);
        }
    );//fin async
}

module.exports.pageModifierEcurie = function(request, response){
    response.title = 'Modifier une écurie';
    response.css="admin";
    var num=request.params.numEcurie;
    async.parallel([
            function(callback){
                model.getInfosEcuries(num,function(err,result){
                    callback(null,result);
                });
            }, //fin callback0
            function(callback){
                modelPays.getAllPays(function(err,result){
                    callback(null,result);
                });
            }, //fin callback1

        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.infosEcurie=result[0];
            response.listePays=result[1];
            response.render('modifierEcurie',response);
        }
    );//fin async
}

module.exports.pageSupprimerEcurie = function(request, response){
    response.title = 'Supprimer une écurie';
    response.css="admin";
    var num=request.params.numEcurie;

    model.supprimerEcurie(num,function(err,result){
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.render('supprimerEcurie', response);
    });
}


module.exports.ajouterEcurie = function(request, response){
    response.title = 'Ecurie ajoutée';
    response.css="admin";

    var post={
        nom:request.body.nom,
        nomdir:request.body.directeur,
        adressesiege:request.body.adresse,
        nbpoints:request.body.points,
        pays:request.body.pays,
        image:request.body.adresseImage
    }

    console.log(post);

    model.ajouterEcurie(post,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.ajoutEcurie=result[0];
        console.log(result);
        response.render('ajout',response);
    });
}

module.exports.modifierEcurie = function(request, response){
    response.title = 'Ecurie modifiée';
    response.css="admin";
    var num=request.params.numEcurie;

    var post={
        nom:request.body.nom,
        nomdir:request.body.directeur,
        adressesiege:request.body.adresse,
        nbpoints:request.body.points,
        pays:request.body.pays,
        image:request.body.adresseImage
    }

    console.log(post);

    model.modifierEcurie(num,post,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.modifEcurie=result[0];
        console.log(result);
        response.render('modif',response);
    });
}