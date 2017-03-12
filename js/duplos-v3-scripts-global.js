// Duplos v3.0
// by Ricardo Mestre © 2010


$(document).ready(function(){

	// Hide the page
	$('#page').hide();
	
	// load images - http://www.filamentgroup.com/lab/update_automatically_preload_images_from_css_with_jquery/
	$.preloadCssImages();
	
	// Bouncer animation (by Leo Xavier)
	// BASE SPEED OF BOUNCING. WILL ADD RAINDOM 0-100 TO UNSYNC BOUNCING
	var bouncespeed = 400;
	
	// SELECT ALL A'S EXCEPT... RESET BG-POSITION TO AVOID INITIAL POSITION BUG AND CALL BOUNCER
	$('a[class!=url][class!=tca-honor-design non-html][class!=tca-site-day non-html][class!=tca-site-month non-html]').each(
		function () {
			$(this).css({backgroundPosition: '5px 5px'});
			bounce(this);
		}
	);
	
	// ACTUAL BOUNCER. CALLBACK OF ANIMATION IS THE BOUNCER ITSELF, TO LOOP ALL NIGHT LONG
	function bounce(currentA) {
		newx = Math.floor(10*Math.random());
		newy = Math.floor(10*Math.random());
		newspeed = bouncespeed + Math.floor(100*Math.random());
		$(currentA).animate({backgroundPosition: newx + 'px ' + newy + 'px'}, newspeed, 'linear', function() { bounce(currentA);});
	}
	
	
	// ColorBox call
	$(".colophon-call").colorbox({width:"460px", inline:true, href:"#colophon-notes"});
	
});


// On .load, triggered by the css preloader plugin
$(window).load(function () {
	
	// Show element (ie ignores the fade animation, just shows it)
	$('#page').fadeIn(1000);
	
	// Detect page position (based on http://codepunk.hardwar.org.uk/ajs02.htm)
	if (navigator.appName == "Microsoft Internet Explorer"){
		var position = document.body.scrollTop;
	} else {
		var position = window.pageYOffset;
	}
	
	var scrollToX = 1800 - $(window).height();   // returns height of browser viewport
	
	// smooth scroll to scrollToX
	// current easing: "easeInOutExpo", for more easing methods please visit: http://gsgd.co.uk/sandbox/jquery/easing/
	if (position < scrollToX) {
		$('html, body').animate({ scrollTop: scrollToX }, 4500, 'easeInOutExpo');
	}
	
});


/*
addEvent function from http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
*/
function addEvent( obj, type, fn )
{
	if (obj.addEventListener)
		obj.addEventListener( type, fn, false );
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}

function removeEvent( obj, type, fn )
{
	if (obj.removeEventListener)
		obj.removeEventListener( type, fn, false );
	else if (obj.detachEvent)
	{
		obj.detachEvent( "on"+type, obj[type+fn] );
		obj[type+fn] = null;
		obj["e"+type+fn] = null;
	}
}

/*
Create the new window
*/
function openInNewWindow() {
	// Change "_blank" to something like "newWindow" to load all links in the same new window
    var newWindow = window.open(this.getAttribute('href'), '_blank');
    newWindow.focus();
    return false;
}

/*
Add the openInNewWindow function to the onclick event of links with a class name of "new-window"
*/
function getNewWindowLinks() {
	// Check that the browser is DOM compliant
	if (document.getElementById && document.createElement && document.appendChild) {
		// Change this to the text you want to use to alert the user that a new window will be opened
		var strNewWindowAlert = "";
		// Find all links
		var links = document.getElementsByTagName('a');
		var objWarningText;
		var strWarningText;
		var link;
		for (var i = 0; i < links.length; i++) {
			link = links[i];
			// Find all links with a class name of "non-html"
			if (/\bnon\-html\b/.exec(link.className)) {
				// Create an em element containing the new window warning text and insert it after the link text
				objWarningText = document.createElement("em");
				strWarningText = document.createTextNode(strNewWindowAlert);
				objWarningText.appendChild(strWarningText);
				link.appendChild(objWarningText);
				link.onclick = openInNewWindow;
			}
		}
		objWarningText = null;
	}
}

addEvent(window, 'load', getNewWindowLinks);