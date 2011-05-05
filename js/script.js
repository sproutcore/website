// Enum like object for identifying platforms
var PLATFORM = {
  windows: 'win',
  mac: 'mac',
  linux: 'linux',
  unknown: 'unknown'
};

// basic app object
var app = {
  platform: 'unknown',
	  
	ready: {}
};

(function($,document, window) {


	// run any function on app.ready
	$( document ).ready( function() {
	  app.platform = app.detectPlatform();
		$.each( app.ready, function() {
				typeof this === "function" && this.call( app );
		});
	});
	window.app = app;
})( jQuery, document, this );

app.carousel = (function() {
	var $carousel, $panels, currentPanel, $buttons, $tray, $trayLinks,
	gotoPanel = function( id, force ) {
		// cap
		currentPanel = id > $panels.length - 1 ? 0 : id < 0 ? $panels.length -1 : id;

		// active the target panel
		$panels.eq( currentPanel ).addClass( 'active' ).removeClass( 'old' );

		// if we're at 0, there is no prior elements to animate
		if ( currentPanel > 0 ) {
			$panels.slice( 0, currentPanel ).addClass( 'old' ).removeClass( 'active' );
		}

		//make sure any slides ahead of the current one aren't active or old
		$panels.slice( currentPanel + 1 ).removeClass( 'old active' );
		
		//set the tray's panel button thingy to active
		$trayLinks.removeClass( 'active' ).filter( '.panel' + currentPanel ).addClass( 'active' );
	};
	
	app.ready.carousel = function() {
		// cache dom elems
		$carousel = $( '#carousel' );
		$tray = $carousel.find( '.tray' );
		$buttons = $carousel.find( 'button' );
		$trayLinks = $tray.find( 'a' );
		$panels = $carousel.find( '.panel' );
		
		// get the index of the 'active' panel
		var index = $panels.filter( 'active' ).prevAll().length;
		
		// if there is no active panel, assume the first
		currentPanel = ( index || 1 ) - 1;
		
		$buttons.click(function(e) {
		  e.preventDefault();
			// handle name="previous" and name="next"
			if ( e.target.name ) {
				gotoPanel( currentPanel + ( e.target.name === "previous" ? -1 : 1 ) );
			}
		});
		
		// get all the clicks in the tray
		$tray.click( function(e) {
			e.preventDefault();
			// go to a particular panel
			var match = /panel([0-9]+)/.exec( e.target.className );
			if ( match && typeof match[1] !== "undefined" ) {
				gotoPanel( +match[1] );
			}
		});
	};
})();


app.slider = (function() {
	var $slider, $panels, currentPanel, $tray, $trayLinks,
	gotoPanel = function( id, force ) {
		// cap
		currentPanel = id > $panels.length - 1 ? 0 : id < 0 ? $panels.length -1 : id;

		// active the target panel
		$panels.eq( currentPanel ).addClass( 'active' ).removeClass( 'old' );

		// if we're at 0, there is no prior elements to animate
		if ( currentPanel > 0 ) {
			$panels.slice( 0, currentPanel ).addClass( 'old' ).removeClass( 'active' );
		}

		//make sure any slides ahead of the current one aren't active or old
		$panels.slice( currentPanel + 1 ).removeClass( 'old active' );
		
		//set the tray's panel button thingy to active
		$trayLinks.removeClass( 'active' ).filter( '.panel' + currentPanel ).addClass( 'active' );
	};
	
	app.ready.slider = function() {
		// cache dom elems
		$slider = $( '#application-slider' );
		$tray = $( '#application-slider-tray' );
		$trayLinks = $tray.find( 'a' );
		$panels = $slider.find( '.panel' ); // these are the panels of 4 slides
		
		// get the index of the 'active' panel
		var index = $panels.filter( 'active' ).prevAll().length;
		
		// if there is no active panel, assume the first
		currentPanel = ( index || 1 ) -1;
		
		// get all the clicks in the tray
		$tray.click( function(e) {
			e.preventDefault();
			// handle name="previous" and name="next"
			if ( e.target.name ) {
				gotoPanel( currentPanel + ( e.target.name === "previous" ? -1 : 1 ) );
				return;
			}
			// go to a particular panel
			var match = /panel([0-9]+)/.exec( e.target.className );
			if ( match && typeof match[1] !== "undefined" ) {
				gotoPanel( +match[1] );
			}
		});
	};
})();

/**
  Detects the current platform.
  
  @returns {app.PLATFORM}
*/
app.detectPlatform = function() {
  // This probably sucks and is unreliable
  if (navigator.appVersion.indexOf("Win")!=-1) { return PLATFORM.windows; }
  if (navigator.appVersion.indexOf("Mac")!=-1) { return PLATFORM.mac; }
  if (navigator.appVersion.indexOf("X11")!=-1 ||
      navigator.appVersion.indexOf("Linux")!=-1) { return PLATFORM.linux; }
      
  return PLATFORM.unknown;
};

app.gotoInstall = function() {
  var url = "docs.html#install";
  
  switch (app.platform) {
    case PLATFORM.windows:
      url = "install_win.html";
      break;
    
    case PLATFORM.mac:
      url = "install_mac.html";
      break;
    
    case PLATFORM.linux:
      url = "install_linux.html";
      break;
    
    default:
      url = "install.html";
  }
  
  window.location.href = url;
};

// add 'ready' to html when the dom's ready to go
app.ready.domReadyClass = function() {
	$( 'html' ).addClass( 'ready' );
};

