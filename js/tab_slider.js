/*globals app */

/** v-- Insert into script.js? --v **/
app.tabSlider = (function() {
  // Called on jQuery ready
  app.ready.tabSlider = function() {
    var a,
        clip,
        height,
        links,
        panel,
        sections,
        tabIndex,
        tabs,
        transitionFunc,
        width;
    
    tabs = $('#tabs');
    clip = tabs.find('#clip');
    panel = clip.find('#panel');
    sections = panel.find('section'); //$('#tabs #sections > section');
    links = tabs.find('nav ul > li a');
    
    // The first tab is selected by default
    tabIndex = 0;
    
    // Layout the individual sections left to right
    width = 960;
    $(panel).css('width', sections.length * width);
    $(panel).css('left', -tabIndex * width);
    $.each(sections, function(index, section) {
      $(section).css('left', index * width);
    });
    
    // FUTURE: Allow the setting of a different initial tab
    if (tabIndex !== 0) {
      $(links[0]).parent().toggleClass('active');
      $(links[tabIndex]).parent().toggleClass('active');
    }
    
    // Show the panel once our sections are laid out
    $(panel).show();
    
    // Resize to fit the first section
    height = $(sections[tabIndex]).height();
    $(clip).css('height', height);
    
    // The transition function
    transitionFunc = function(e) {
      var newTabIndex;
      
      // Determine the index of the new tab
      newTabIndex = links.index(this);
      
      if (tabIndex !== newTabIndex) {
        // 1. Remove active class from the current tab
        $(links[tabIndex]).parent().toggleClass('active');
        
        // 2. Stretch/shrink the window to fit
        height = $(sections[newTabIndex]).height();
        $(clip).css('height', height);
        
        // 3. Make the new section visible
        $(panel).animate({
          left: -newTabIndex * width
          }, 500, function() {
          // Animation complete.
        });
        
        // 4. Add active class to the new tab
        $(links[newTabIndex]).parent().toggleClass('active');
        
        tabIndex = newTabIndex;
      }
    };
    
    // Add click events to the tab links
    $.each(links, function(index, link) {
      $(link).click(transitionFunc);
    });
  };
})();
/** ^-- Insert into script.js? --^ **/