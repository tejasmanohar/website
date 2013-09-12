/*
 * Namespace.
 */
window.app = {
  utils: {}
};

/*
 * Recursively replace text in text nodes.
 */
app.utils.replace = function (node, from, to) {
  if (node.nodeType === 3)
    node.nodeValue = node.nodeValue.replace(from, to);
  if (node.childNodes)
    for (var i = 0; i < node.childNodes.length; i++)
      app.utils.replace(node.childNodes.item(i), from, to);
};

/*
 * Fix typography on page load.
 */
$(function () {

  $('h1, h2, h3, h4, h5, h6, p, li').each(function(i, el) {
    app.utils.replace($(el)[0],
      /"([^"]+)"/g, "\u201C$1\u201D");
    app.utils.replace($(el)[0],
      /'/g, "\u2019");
    app.utils.replace($(el)[0],
      / [-]+ /g, " \u2014 ")
  });

});

