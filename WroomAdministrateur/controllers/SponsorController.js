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
            response.render('modifierSponsor',response);
        }
    );//fin async
}