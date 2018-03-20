let model=require('../models/sponsor.js');
let modelEcurie=require('../models/ecurie.js');
var async=require('async');

module.exports.menuSponsor = function(request, response){
	response.title = 'Menu des Sponsors';
    response.css="admin";
	model.getMenuSponsor(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.menuSponsor = result;	
        console.log(result);
        response.render('menuSponsors', response);
	});
 }

module.exports.pageAjouterSponsor = function(request, response){
	response.title = 'Ajouter un sponsor';
    response.css="admin";
    modelEcurie.getAllEcurie(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;	
        console.log(result);
        response.render('ajouterSponsor', response);
	});
 }

module.exports.pageModifierSponsor = function(request, response){
    response.title = 'Modifier un sponsor';    
    response.css="admin";
    var num=request.params.numSponsor;
    
    async.parallel([
        function(callback){
            model.getInfosSponsor(num,function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
        function(callback){
            model.getEcurieSponsor(num,function(err,result){
               callback(null,result);
            });
        }, //fin callback1
        
        function(callback){
            modelEcurie.getAllEcurie(function(err,result){
               callback(null,result);
            });
        }, //fin callback2
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.infosSponsor=result[0][0];
            response.ecurieSponsor=result[1][0];
            response.listeEcurie=result[2];
            console.log(result[0][0]);
            console.log(result[1][0]);
            response.render('modifierSponsor',response);
        }
    );//fin async
}

module.exports.ajouterSponsor = function(request, response){
	response.title = 'Sponsor ajouté';
    response.css="admin";
    
    var post={
        nom:request.body.nom,
        activite:request.body.activite
    }
    
    var numEcurie=request.body.ecurie;
    
    console.log(post);
    
    async.parallel([
        function(callback){
            model.ajouterSponsor(post,function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
       /* function(callback){
            if(numEcurie!=0){
                model.ajouterFinance(numEcurie,function(err,result){
                   callback(null,result);
                });
             }
        }, //fin callback1
        */
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.ajoutSponsor=result[0];
            //response.ajoutEcurieSponsor=result[1];
            response.render('ajout',response);
        }
    );//fin async
 }

module.exports.modifierSponsor = function(request, response){
	response.title = 'Sponsor modifié';
    response.css="admin";
    var numSponsor=request.params.numSponsor;
    
    var post={
        nom:request.body.nom,
        activite:request.body.activite
    }
    
    var numEcurie=request.body.ecurie;
    
    console.log(post);
    
    async.parallel([
        function(callback){
            model.modifierSponsor(numSponsor,post,function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
        function(callback){
            if(numEcurie!=0){
                /*model.modifierFinance(numSponsor,numEcurie,function(err,result){
                   callback(null,result);
                });*/
             }
        }, //fin callback1
        
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.modifSponsor=result[0];
            //response.modifEcurieSponsor=result[1];
            response.render('modif',response);
        }
    );//fin async
 }

module.exports.pageSupprimerSponsor = function(request, response){
	response.title = 'Sponsor supprimé';
    response.css="admin";
    var numSponsor=request.params.numSponsor;
    
    async.parallel([
        function(callback){
            model.supprimerSponsorTableSponsorise(numSponsor,function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
        function(callback){
            model.supprimerSponsorTableFinance(numSponsor,function(err,result){
               callback(null,result);
            });
        }, //fin callback1
        
        function(callback){
            model.supprimerSponsorTableSponsor(numSponsor,function(err,result){
               callback(null,result);
            });
        }, //fin callback2
        
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