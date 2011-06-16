/*globals app */

(function() {
  app.ready.setupMapPins = function() {
    var pins = jQuery('#map .pin .marker');
    pins.hover(
    function(evt) {
      var hover = $(evt.target).parent().find('.hover');
      hover.stop().css({
        display: 'block'
      }).animate({
        opacity: 1
      },
      250);
    },
    function(evt) {
      var hover = $(evt.target).parent().find('.hover');
      hover.stop().animate({
        opacity: 0
      },
      250,
      function() {
        hover.css({
          display: 'none'
        });
      });
    });
  };
})();