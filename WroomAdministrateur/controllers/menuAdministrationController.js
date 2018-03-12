////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Partie administration";
    response.render('home', response);
};
