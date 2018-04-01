let model=require('../models/ecurie.js');
let modelPays=require('../models/pays.js');
var async=require('async');


module.exports.menuEcurie = function(request, response) {
    response.title = 'Gérer les ecuries';
    async.parallel ([
            function (callback) {
                model.getEcuries(function (err, result) { callback(null, result) });
            },
        ],
        function (err, result) {
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            //[] sql retourne plusieurs lignes
            //[][] sql retourne une ligne
            response.ecuries = result[0];
            response.render('menuEcurie', response);
        });
}



module.exports.pageAjouterEcurie = function(request, response) {
    response.title = 'Ajouter une ecurie';
    response.css="admin";

    async.parallel([
            function(callback){
                modelPays.getAllPays(function(err,result){
                    callback(null,result);
                });
            }, //fin callback0

            function(callback){
                model.getAllFournisseurs(function(err,result){
                    callback(null,result);
                });
            }, //fin callback1
        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listePays=result[0];
            response.listeFournisseurs=result[1];
            response.render('ajouterEcurie',response);
        }
    );//fin async
}


module.exports.pageModifierEcurie = function(request, response) {
    response.title = 'Modifier une ecurie';
    response.css="admin";
    var num=request.params.numEcurie;

    async.parallel([
            function(callback){
                model.getEcurieParNum(num,function(err,result){
                    callback(null,result);
                });
            }, //fin callback0

            function(callback){
                modelPays.getAllPays(function(err,result){
                    callback(null,result);
                });
            }, //fin callback1
            function(callback){
                model.getAllFournisseurs(function(err,result){
                    callback(null,result);
                });
            }, //fin callback2
        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.infosEcurie=result[0][0];
            response.listePays=result[1];
            response.listeFournisseurs=result[2];
            response.render('modifierEcurie',response);
        }
    );//fin async
}


module.exports.pageSupprimerEcurie = function(request, response){
    response.title = 'Ecurie supprimé';
    response.css="admin";
    var num=request.params.numEcurie;

    async.parallel([
            function(callback){
                model.supprimerEcurieVoiture(num,function(err,result){
                    callback(null,result);
                });
            }, //fin callback0

            function(callback){
                model.supprimerEcurieSponsor(num,function(err,result){
                    callback(null,result);
                });
            }, //fin callback1

            function(callback){
                model.supprimerEcuriePilote(num,function(err,result){
                    callback(null,result);
                });
            }, //fin callback2

            function(callback){
                model.supprimerEcurie(num,function(err,result){
                    callback(null,result);
                });
            }, //fin callback3

        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.render('supprimer',response);
        }
    );//fin async
}

module.exports.ajouterEcurie = function(request, response){
    response.title = 'Ecurie ajoutée';
    response.css="admin";

    var post={
        nom:request.body.nom,
        directeur:request.body.directeur,
        adresse:request.body.adresse,
        points:request.body.points,
        pays:request.body.pays,
        fournisseur:request.body.fournisseur,
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
    response.title = 'Ecurie modifié';
    response.css="admin";
    var num=request.params.numEcurie;

    var post={
        nom:request.body.nom,
        directeur:request.body.directeur,
        adresse:request.body.adresse,
        points:request.body.points,
        pays:request.body.pays,
        fournisseur:request.body.fournisseur,
        image:request.body.adresseImage
    }

    console.log(post);

    model.modifierEcurie(num,post,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        response.modifCircuit=result[0];
        console.log(result);
        response.render('modif',response);
    });
}

