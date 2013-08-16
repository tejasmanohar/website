$(function() {

  // Prevent orphan lines
  $('h1, h2, h3, h4, h5, h6, p').each(function(i, el) {
    var content = $.trim($(this).html()).replace(/[ ]+/, ' ').split(' ');
    var first = content.slice(0, content.length - 2);
    var rest  = content.slice(content.length - 2);
    var nbsp  = first.join(' ') + ' ' + rest.join('&nbsp;');
    $(this).html(nbsp);
  });

});