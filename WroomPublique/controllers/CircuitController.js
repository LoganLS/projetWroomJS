let model=require('../models/circuit.js');
var async=require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';    
	model.getListeCircuit(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeCircuit=result;	
        console.log(result);
        response.render('listerCircuit', response);
	});
}

module.exports.detailCircuit = function(request, response){
    response.title = 'Détail circuit';    
    var num=request.params.numCircuit;
	/*model.getInfosCircuit(num,function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.detCircuit = result;	
        console.log(result);
        response.render('detailCircuit', response);
	});*/
    async.parallel([
        function(callback){
            model.getInfosCircuit(num,function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
        function(callback){
            model.getListeCircuit(function(err,result){
               callback(null,result);
            });
        }, //fin callback1
    
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.detCircuit=result[0];
            response.listeCircuit=result[1];
            response.render('detailCircuit',response);
        }
    );//fin async
}

module.exports.menuCircuit = function(request, response){
    response.title = 'Menu des circuits';    
    response.css="admin";
	model.getMenuCircuit(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.menuCircuit = result;	
        console.log(result);
        response.render('menuCircuits', response);
	});
}

module.exports.pageAjouterCircuit = function(request, response){
    response.title = 'Ajouter un circuit';    
    response.css="admin";
	model.getPays(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePays = result;	
        console.log(result);
        response.render('ajouterCircuit', response);
	});
}

module.exports.pageModifierCircuit = function(request, response){
    response.title = 'Modifier un circuit';    
    response.css="admin";
    var num=request.params.numCircuit;
    
    async.parallel([
        function(callback){
            model.getInfosCircuit(num,function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
        function(callback){
            model.getAllPays(function(err,result){
               callback(null,result);
            });
        }, //fin callback1
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.infosCircuit=result[0][0];
            response.listePays=result[1];
            response.render('modifierCircuit',response);
        }
    );//fin async
}