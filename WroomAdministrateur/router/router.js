let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let ConnexionController = require('./../controllers/ConnexionController');
let SponsorController = require('./../controllers/SponsorController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/',ConnexionController.connexion);
    app.post('/homeAdministration', HomeController.Index);

// pilotes
    app.get('/menuPilotes',PiloteController.menuPilote);
    app.get('/menuPilotes/ajouterPilote',PiloteController.pageAjouterPilote);
    app.post('/menuPilotes/ajouterPilote/ajout',PiloteController.ajouterPilote);
    app.get('/menuPilotes/modifierPilote/:numPilote',PiloteController.pageModifierPilote);
    app.post('/menuPilotes/modifierPilote/:numPilote/modifier',PiloteController.modifierPilote);
    app.get('/menuPilotes/supprimerPilote/:numPilote',PiloteController.pageSupprimerPilote);

 // circuits
    app.get('/menuCircuits',CircuitController.menuCircuit);
    app.get('/menuCircuits/ajouterCircuit',CircuitController.pageAjouterCircuit);
    app.post('/menuCircuits/ajouterCircuit/ajout',CircuitController.ajouterCircuit);
    app.get('/menuCircuits/modifierCircuit/:numCircuit',CircuitController.pageModifierCircuit);
    app.post('/menuCircuits/modifierCircuit/:numCircuit/modifier',CircuitController.modifierCircuit);
    app.get('/menuCircuits/supprimerCircuit/:numCircuit',CircuitController.pageSupprimerCircuit);

// Ecuries
    app.get('/menuEcurie', EcurieController.menuEcurie);
    app.get('/detailEcurie/:numEcurie', EcurieController.DetailEcurie);
    app.get('/menuEcurie/ajouterEcurie',EcurieController.pageAjouterEcurie);
    app.post('/menuEcurie/ajouterEcurie/ajout',EcurieController.ajouterEcurie);
    app.get('/menuEcurie/modifierEcurie/:numPilote',EcurieController.pageModifierEcurie);
    app.post('/menuEcurie/modifierEcurie/:numPilote/modifier',EcurieController.modifierEcurie);
    app.get('/menuEcurie/supprimerEcurie/:numPilote',EcurieController.pageSupprimerEcurie);

 //Résultats
   //app.get('/resultats', ResultatController.ListerResultat);
    
//Sponsors
    app.get('/menuSponsors', SponsorController.menuSponsor);
    app.get('/menuSponsors/ajouterSponsor',SponsorController.pageAjouterSponsor);
    app.post('/menuSponsors/ajouterSponsor/ajout',SponsorController.ajouterSponsor);
    app.get('/menuSponsors/modifierSponsor/:numSponsor',SponsorController.pageModifierSponsor);
    app.post('/menuSponsors/modifierSponsor/:numSponsor/modifier',SponsorController.modifierSponsor);
    app.get('/menuSponsors/supprimerSponsor/:numSponsor',SponsorController.pageSupprimerSponsor);
    



// tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
