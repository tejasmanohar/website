$(function() {

    var setratio = function() {
        var h = $(window).height();
        var w = $(window).width();
        if(h * 1.5 > w) {
            $("body").removeClass("wide").addClass("high");
        } else {
            $("body").removeClass("high").addClass("wide");
        }
    };

    
    var partners = [
        "systek_2012.jpg",
        "arktekk_2012.jpg",
        "nets_2012.jpg",
        "marcello_2012.jpg",
        "edb_int_2012.jpg",
        "visma_2012.jpg",
        "bekk_2012.jpg",
        "computas_2012.jpg",
        "jpro_2012.jpg",
        "nith_2012.jpg",
        "steria_2012.jpg",
        "kantega_2012.jpg",
        "iterate_2012.jpg",
        "conax_2012.jpg",
        "microsoft_2012.jpg",
        "knowit_2012.jpg",
        "mesan_2012.jpg",
        "norgesgruppen_2012.jpg",
        "bouvet_2012.jpg",
        "kodemaker_2012.jpg",
        "accenture_2012.jpg",
        "capgemini_2012.jpg",
        "cisco_2012.jpg",
        "ciber_2012.jpg",
        "programutvikling_2012.jpg",
        "itera_2012.jpg",
        "wepstep_2012.jpg",
        "miles_2012.jpg"
    ];

    var randomizepartners = function() {
        for(var i = 0; i < partners.length; i++) {
            $("#partners")
                .prepend($("<a href='#' />")
                .html($("<img />").attr("src", 
                    "img/partners/" + 
                    partners[Math.floor(Math.random() * partners.length)])));
        }
    };
    
    $(window).resize(function() {
        setratio();
    });

    setratio();
    randomizepartners();

});
