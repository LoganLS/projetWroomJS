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
    app.get('/menuEcurie/ajouterEcurie',EcurieController.pageAjouterEcurie);
    app.post('/menuEcurie/ajouterEcurie/ajout',EcurieController.ajouterEcurie);
    app.get('/menuEcurie/modifierEcurie/:numEcurie',EcurieController.pageModifierEcurie);
    app.post('/menuEcurie/modifierEcurie/:numEcurie/modifier',EcurieController.modifierEcurie);
    app.get('/menuEcurie/supprimerEcurie/:numEcurie',EcurieController.pageSupprimerEcurie);

 //Résultats
    app.get('/menuResultats', ResultatController.menuResultats);
    app.post('/menuResultats/modifierResultats', ResultatController.ModifierResultats);
    app.post('/menuResultats/modifierResultats/ajout',ResultatController.ajouterResultat);
    app.get('/menuResultats/supprimerResultat/:numGrandPrix/:numPilote/:nbPoints',ResultatController.pageSupprimerResultat);

    /*
      app.get('/menuResultats/modifierResultat/:numGP',ResultatController.pageModifierEcurie);
      app.post('/menuResultats/modifierResultat/:numGP/modifier',ResultatController.modifierEcurie);
      app.get('/menuResultats/supprimerResultat/:numGP',ResultatController.pageSupprimerEcurie);*/
    
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
