$(function () {
    $(".bulle").mouseover(function(){
        if($(this).attr('title')=="")  return false;

        $('body').append("<span class='infobulle'></span>");

        var bulle =  $(".infobulle");
        bulle.append($(this).attr('title'));
        //test qui marche pas :
        let title = $(this).attr('title');
        $(this).attr('title','');
        var posTop = $(this).offset().top+$(this).height();
        var posLeft = $(this).offset().left+$(this).width()/2-bulle.width()/2;

        //Comment remettre le title après l'avoir enlevé  ???

        bulle.css({
           left:posLeft,
           top:posTop
        });
    });

    $(".bulle").mouseout(function(){
        var bulle =  $(".infobulle");
        $(this).attr('title','???');
        //??? : ancienne valeur de title -> Comment la garder / récupérer ?
        bulle.remove();
    });
});