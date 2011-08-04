/*globals app */

/** v-- Insert into script.js? --v **/
app.tabSlider = (function() {
  // Called on jQuery ready
  app.ready.tabSlider = function() {
    var a, clip, height, links, panel, sections, tabIndex, tabs, transitionFunc, width;

    tabs = $('#tabs');
    clip = tabs.find('#clip');
    panel = clip.find('#panel');
    sections = panel.find('> section'); //$('#tabs #sections > section');
    links = tabs.find('nav ul > li a');

    // Get the currently selected tab
    // If none, default to index 0
    var tab = $.bbq.getState("tab");
    var link = $("#tabs nav ul > li a[href='" + tab + "']");
    tabIndex = links.index(link);
    tabIndex = (tabIndex === -1) ? 0 : tabIndex;

    // Layout the individual sections left to right
    width = 958;
    $(panel).css('width', sections.length * width);
    $(panel).css('left', -tabIndex * width);
    $.each(sections,
    function(index, section) {
      $(section).css('left', index * width);
    });

    $(links[tabIndex]).parent().toggleClass('active');
    // Invoke in a different run loop so CSS transitions are invoked
    var map = $("#map img[src*=map]");

    if (tab === "user-groups") {
      map.load(function() {
        $(sections[tabIndex]).toggleClass('visible');
      });
    }

    // Show the panel once our sections are laid out
    $(panel).show();

    // Resize to fit the first section
    app.resizeClippingWindow(tabIndex);

    // The transition function
    transitionFunc = function(e) {
      var newTabIndex;

      // Determine the index of the new tab
      newTabIndex = links.index(this);

      if (tabIndex !== newTabIndex) {
        // 1. Remove active class from the current tab and visible class from current section
        $(links[tabIndex]).parent().toggleClass('active');
        $(sections[tabIndex]).toggleClass('visible');

        // 2. Stretch/shrink the window to fit
        app.resizeClippingWindow(newTabIndex);

        // 3. Make the new section visible
        $(panel).animate({
          left: -newTabIndex * width
        },
        500,
        function() {
          // Animation complete.
          // Set the section's visible class (used to trigger CSS animations)
          $(sections[newTabIndex]).toggleClass('visible');
        });

        // 4. Add active class to the new tab
        $(links[newTabIndex]).parent().toggleClass('active');

        tabIndex = newTabIndex;
      }

      var href = $(e.target).attr("href");
      $.bbq.pushState({
        tab: href
      });

      return false;
    };

    $("#tabs nav ul > li a").live("click", transitionFunc);

    $(window).bind("hashchange",
    function() {
      var tab = $.bbq.getState("tab");
      var link = $("#tabs nav ul > li a[href='" + tab + "']");
      link.click();
    });
  };
})();

app.resizeClippingWindow = function(index) {
  var tabs = $('#tabs'),
  clip = tabs.find('#clip'),
  panel = clip.find('#panel'),
  sections = panel.find('> section'),
  minHeight = $(sections[index]).height();

  $(clip).css('height', minHeight);

  app.bringingFlexyBack();
};

app.bringingFlexyBack = function() {
  // Determine the top offsets
  var footer = $('footer');
  var tab = $('#tabs');
  var footerTop = footer.length && footer.offset().top;
  var tabTop = tab.length && tab.offset().top;

  // The minHeight is simply the difference between the tops or the
  // height required for the content
  var height = footerTop - tabTop;

  $('#tabs-back').css('height', height);
};