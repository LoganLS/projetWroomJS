// ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Administration Wroom";
    response.render('home', response);
    //request.session.login=response.body.login;
    //request.session.passwd=response.body.password;/*{{session.passwd}}*/
};
