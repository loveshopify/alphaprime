(function ($) {
    $.fn.meanmenu = function (options) {
        var defaults = {
            meanMenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
            meanMenuClose: "<span />", // single character you want to represent the close menu button
            meanMenuCloseSize: "0", // set font size of close button
            meanMenuOpen: "<span />", // text/markup you want when menu is closed
            meanRevealPosition: "right", // left right or center positions
            meanRevealPositionDistance: "0", // Tweak the position of the menu
            meanRevealColour: "", // override CSS colours for the reveal background
            meanRevealHoverColour: "", // override CSS colours for the reveal hover
            meanScreenWidth: "1025", // set the screen width you want meanmenu to kick in at
            meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
            meanShowChildren: true, // true to show children in the menu, false to hide them
            meanExpandableChildren: true, // true to allow expand/collapse children
            meanExpand: ">", // single character you want to represent the expand for ULs
            meanContract: ">", // single character you want to represent the contract for ULs
            meanRemoveAttrs: false // true to remove classes and IDs, false to keep them
        };
        var options = $.extend(defaults, options);
        
        // get browser width
        currentWidth = window.innerWidth || document.documentElement.clientWidth;

        return this.each(function () {
            var meanMenu = options.meanMenuTarget;
            var meanReveal = options.meanReveal;
            var meanMenuClose = options.meanMenuClose;
            var meanMenuCloseSize = options.meanMenuCloseSize;
            var meanMenuOpen = options.meanMenuOpen;
            var meanRevealPosition = options.meanRevealPosition;
            var meanRevealPositionDistance = options.meanRevealPositionDistance;
            var meanRevealColour = options.meanRevealColour;
            var meanRevealHoverColour = options.meanRevealHoverColour;
            var meanScreenWidth = options.meanScreenWidth;
            var meanNavPush = options.meanNavPush;
            var meanRevealClass = ".meanmenu-reveal";
            meanShowChildren = options.meanShowChildren;
            meanExpandableChildren = options.meanExpandableChildren;
            var meanExpand = options.meanExpand;
            var meanContract = options.meanContract;
            var meanRemoveAttrs = options.meanRemoveAttrs;
                        
            //detect known mobile/tablet usage
            if ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ) {
                var isMobile = true;
            }
            
            if ( (navigator.userAgent.match(/MSIE 8/i)) || (navigator.userAgent.match(/MSIE 7/i)) ) {
            	// add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
                jQuery('html').css("overflow-y" , "scroll");
            }
            
            function meanCentered() {
            	if (meanRevealPosition == "center") {
	            	var newWidth = window.innerWidth || document.documentElement.clientWidth;
	            	var meanCenter = ( (newWidth/2)-22 )+"px";
	            	meanRevealPos = "left:" + meanCenter + ";right:auto;";
	            	
	            	if (!isMobile) {	            	
	            		jQuery('.meanmenu-reveal').css("left",meanCenter); 
	            	} else {
		            	jQuery('.meanmenu-reveal').animate({
		            	    left: meanCenter
		            	});
	            	}
            	}
            }
            
            menuOn = false;
            meanMenuExist = false;
            
            if (meanRevealPosition == "right") {
                meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;";
            }
            if (meanRevealPosition == "left") {
                meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;";
            } 
            // run center function	
            meanCentered();
            
            // set all styles for mean-reveal
            meanStyles = "background:"+meanRevealColour+";color:"+meanRevealColour+";"+meanRevealPos;

            function meanInner() {
                // get last class name
                if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
                    //$navreveal.html(meanMenuOpen);
                } else {
                    //$navreveal.html(meanMenuOpen);
                }
            }
            
            //re-instate original nav (and call this on window.width functions)
            function meanOriginal() {
            	jQuery('.mean-bar,.mean-push').remove();
            	jQuery('#navDrawer').removeClass("mean-container");
            	jQuery(meanMenu).show();
            	menuOn = false;
            	meanMenuExist = false;
            }
            
            //navigation reveal 
            function showMeanMenu() {
                if (currentWidth <= meanScreenWidth) {
                	meanMenuExist = true;
                	// add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
                	jQuery('#navDrawer').addClass("mean-container");
                	jQuery('.mean-container').append('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+meanStyles+'">Show Navigation</a><nav class="mean-nav"></nav></div>');
                    
                    //push meanMenu navigation into .mean-nav
                    var meanMenuContents = jQuery(meanMenu).html();
                    jQuery('.mean-nav').html(meanMenuContents);
            		
            		// remove all classes from EVERYTHING inside meanmenu nav
            		if(meanRemoveAttrs) {
            			jQuery('nav.mean-nav *').each(function() {
            				jQuery(this).removeAttr("class");
            				jQuery(this).removeAttr("id");
            			});
            		}
                    
                    // push in a holder div (this can be used if removal of nav is causing layout issues)
                    jQuery(meanMenu).before('<div class="mean-push" />');
                    jQuery('.mean-push').css("margin-top",meanNavPush);
                    
                    // hide current navigation and reveal mean nav link
                    jQuery(meanMenu).hide();
                    jQuery(".meanmenu-reveal").show();
                    
                    // turn 'X' on or off 
                    jQuery(meanRevealClass).html(meanMenuOpen);
                    $navreveal = jQuery(meanRevealClass);
                    
                    //hide mean-nav ul
                    jQuery('.mean-nav ul').hide();
                    
                    // hide sub nav
	                   if(meanShowChildren) {
	                   		// allow expandable sub nav(s)
	                       if(meanExpandableChildren){
		                       jQuery('.mean-nav ul ul').each(function() {
		                           if(jQuery(this).children().length){
                                     	jQuery(this,'li:first').parent().append('<a class="mean-expand" href="#" style="font-size: '+ meanMenuCloseSize +'">'+ meanExpand +'</a>'); 
		                               jQuery(this,'li:first').prepend('<li class="back-menu">BACK</li>');                      
		                           }
		                       });
// 		                       jQuery('.mean-expand').on("click",function(e){
                                
// 		                       		e.preventDefault();
// 		                       	   if (jQuery(this).hasClass("mean-clicked")) {
// 		                       	   		jQuery(this).text(meanExpand);
// 		                               jQuery(this).prev('ul').slideUp(300, function(){
                                        	
// 		                               });
//                                      jQuery(this).prev('ul').removeClass('intro');
// 		                           } else {
// 		                           		jQuery(this).text(meanContract);
// 		                           		jQuery(this).prev('ul').slideDown(300, function(){
                                          
// 		                           		});
//                                      jQuery(this).prev('ul').addClass('intro');
// 		                           }   
// 		                           jQuery(this).toggleClass("mean-clicked"); 
// 		                       }); 
                             
                             jQuery('.mean-nav li a').on("click", function(e){
                                // e.preventDefault();
                               if ($(this).siblings('.mean-expand').hasClass("mean-clicked")) {
                                 $(this).siblings('.mean-expand').text(meanExpand);
                                 jQuery(this).siblings('ul').slideUp(300, function(){

                                 });
                                 jQuery(this).siblings('ul').removeClass('intro');
                               } else {
                                 $(this).siblings('.mean-expand').text(meanContract);
                                 jQuery(this).siblings('ul').slideDown(300, function(){

                                 });
                                 jQuery(this).siblings('ul').addClass('intro');
                               }   
                                 $(this).siblings('.mean-expand').toggleClass("mean-clicked"); 
                             }); 
                             
	                       } else {
	                           jQuery('.mean-nav ul ul').show();   
	                       }
	                   } else {
	                       jQuery('.mean-nav ul ul').hide();
	                   }
	                   
                    // add last class to tidy up borders
                    jQuery('.mean-nav ul li').last().addClass('mean-last');
                
                    $navreveal.removeClass("meanclose");
                    jQuery($navreveal).click(function(e){
                    
                    	e.preventDefault();
	            		if(menuOn == false) {
	                        $navreveal.css("text-align", "center");
	                        $navreveal.css("text-indent", "0");
	                        $navreveal.css("font-size", meanMenuCloseSize);
	                        jQuery('.mean-nav ul:first').show(); 
	                        menuOn = true;
	                    } else {
	                    	jQuery('.mean-nav ul:first').hide();
	                    	menuOn = false;
	                    }    
                        $navreveal.toggleClass("meanclose");
                        meanInner();
                    });
                    
                } else {
                	meanOriginal();
                }	
            } 
			
   
		    
			
            
            if (!isMobile) {
                //reset menu on resize above meanScreenWidth
                jQuery(window).resize(function () {
                    currentWidth = window.innerWidth || document.documentElement.clientWidth;
                    if (currentWidth > meanScreenWidth) {
                        meanOriginal();
                    } else {
                    	meanOriginal();
                    }	
                    if (currentWidth <= meanScreenWidth) {
                        showMeanMenu();
                        meanCentered();
						
						
                    } else {
                    	meanOriginal();
                    }	
                });
            }

       		// adjust menu positioning on centered navigation     
            window.onorientationchange = function() {
            	meanCentered();
            	// get browser width
            	currentWidth = window.innerWidth || document.documentElement.clientWidth;
            	if (currentWidth >= meanScreenWidth) {
            		meanOriginal();
            	}
            	if (currentWidth <= meanScreenWidth) {
            		if (meanMenuExist == false) {
            			showMeanMenu();
						
            		}
            	}
            }
           // run main menuMenu function on load
           showMeanMenu(); 
		   
        });
    };
})(jQuery);