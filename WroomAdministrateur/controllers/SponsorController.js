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