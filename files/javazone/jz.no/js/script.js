$(function() {

    var setratio = function() {
        var h = $(window).height();
        var w = $(window).width();
        if(h * 1.4 > w) {
            $("body").removeClass("wide").addClass("high");
        } else {
            $("body").removeClass("high").addClass("wide");
        }
    };

    var partners = [
        '<img src="img/partners/microsoft.jpg">',
        '<img src="img/partners/itera.jpg">',
        '<img src="img/partners/nets.jpg">',
        '<img src="img/partners/oracle.jpg">',
        '<img src="img/partners/microsoft.jpg">',
        '<img src="img/partners/microsoft.jpg">',
        '<img src="img/partners/itera.jpg">',
        '<img src="img/partners/nets.jpg">',
        '<img src="img/partners/oracle.jpg">',
        '<img src="img/partners/microsoft.jpg">',
        '<img src="img/partners/itera.jpg">',
        '<img src="img/partners/nets.jpg">',
        '<img src="img/partners/oracle.jpg">',
        '<img src="img/partners/microsoft.jpg">',
        '<img src="img/partners/microsoft.jpg">',
        '<img src="img/partners/itera.jpg">',
        '<img src="img/partners/nets.jpg">',
        '<img src="img/partners/oracle.jpg">'
    ];

    var randomizepartners = function() {
        for(var i = 0; i < partners.length; i++) {
            $("#partners")
                .prepend($("<a href='#' />")
                .html(partners[Math.floor(Math.random() * partners.length)]));
        }
    };
    
    $(window).resize(function() {
        setratio();
    });

    setratio();
    randomizepartners();

});
