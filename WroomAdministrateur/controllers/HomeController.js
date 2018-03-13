let model=require('../models/login.js');
var async=require('async');
// ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    if(request.body.login && request.body.password){
        response.title = "Administration Wroom";
        request.session.login=request.body.login;
        request.session.passwd=request.body.password;/*{{session.passwd}}*/

        model.getConnection(request.session.login,request.session.passwd,function(err,result){
            if (err) {
                // gestion de l'erreur
                console.log(err);
                return;
            }
            response.connexion=result[0];	
            if(result[0]===undefined){
                console.log('Utilisateur non reconnu');
                response.render('connexionErreur',response);
            }else{
                console.log('Admin reconnu avec bon mot de passe');
                request.session.estConnecte=true;
                response.render('home', response);
            }
        });
    }else if(request.session.estConnecte===true){
        response.render('home', response);
    }
    else{
        response.render('connexion',response);
    }
};