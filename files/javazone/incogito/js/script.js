$(function() {

    var collapsed = false;

    var reset = function() {
        $("ul").show();
        $("li").show();
        collapsed = false;
    };
    
    var zebra = function() {
        $("li").removeClass("odd").removeClass("first").removeClass("last");
        $("ul li:visible:odd").addClass("odd");
        $("ul li:first").addClass("first");
        $(".legends").find("span:first").addClass("first").each(function() {
            $(this).parents("li").addClass($(this).text().replace(" ", "").toLowerCase().toString());  
        });
    };
    
    $("img.level").each(function(e) {
        $(this).closest("li").addClass($(this).attr("title").toLowerCase());
    });
    
    $("li").click(function() {
        $(this).find("a").click();
    });

    $("h2").click(function() {
        var list = $(this).parent().find("ul");
        console.log(list);
        if(list.is(":visible")) {
            reset();
            list.hide();
        } else {
            reset();
            list.show();
        }
    });

    $("h1").click(function() {
        if(collapsed) {
            reset();
            $("ul").show();
        } else {
            reset();
            $("ul").hide();
        }
        collapsed = !collapsed;
    });

    $("#tools a").click(function() {
        reset();
        var target = $(this).attr("class").split(" ")[0];
        $("ul").show();
        $("li").hide();
        $("li." + target).show();
        zebra();
    });
    
    reset();
    zebra();

});














