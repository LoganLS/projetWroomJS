let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
	app.get('/repertoirePilote/:lettreNom', PiloteController.listeNom);
    app.get('/repertoirePilote/detailPilote/:numPilote', PiloteController.infosPilote);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/circuits/detailCircuit/:numCircuit', CircuitController.detailCircuit);

// Ecuries
    app.get('/ecuries', EcurieController.ListerEcurie);
    app.get('/detailEcurie/:numEcurie', EcurieController.DetailEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultats);

// tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
