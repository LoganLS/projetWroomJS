//////////////////////////////////////////////// A C C U E I L
let async = require('async');
let model = require('../models/resultat.js');

module.exports.Index = function(request, response) {
  response.title = 'Accueil - Wroom Publique';

  async.parallel ([
          function (callback) {
              model.getDernierResultat(function (err, result) { callback(null, result) });
          },
      ],
      function (err, result) {
          if (err) {

              console.log(err);
              return;
          }

          response.resultat = result[0];
          response.render('home', response);
      });
}