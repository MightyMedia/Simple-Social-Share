/* exported simpleSocialShare */

// Utility for creating objects in older browsers
if (typeof Object.create !== 'function') {
	Object.create = function(obj) {
    	"use strict";
		function F() {}
		F.prototype = obj;
		return new F();
	};
}

// Create event listeners with jQuery like namespacing
var eventsNamespaceBinder = {
    on: function(event, cb, opts) {
        "use strict";

        if (!this.namespaces) { // save the namespaces on the DOM element itself
            this.namespaces = {};
        }

        this.namespaces[event] = cb;
        var options = opts || false;

        this.addEventListener(event.split('.')[0], cb, options);
        return this;
    },

    off: function(event) {
        "use strict";

        if(typeof this.namespaces !== 'undefined') {
            if(event.split('.')[1] === undefined) {
                for (var key in this.namespaces) {
                    if (key.split('.')[0] === event) {
                        this.removeEventListener(event, this.namespaces[key]);
                        delete this.namespaces[key];
                    }
                }
            } else {
                if (this.namespaces.hasOwnProperty(event)) {
                    this.removeEventListener( event.split('.')[0], this.namespaces[event]);
                    delete this.namespaces[event];
                }
            }
        }

        return this;
    }
};

// Extend the DOM with these above custom methods
window.on = Element.prototype.on = eventsNamespaceBinder.on;
window.off = Element.prototype.off = eventsNamespaceBinder.off;


/*!
 * Simple Social Share
 *
 * Simple Social Share is a simple way of creating social share buttons on your website without loading all the third party scripts from these networks.
 *
 * Based on a blog by Jonathan Suh: https://jonsuh.com/blog/social-share-links/
 *
 * Version 0.3.0
 * Licensed under the MIT License: https://github.com/MightyMedia/Simple-Social-Share/blob/master/LICENSE
 *
 * https://github.com/MightyMedia/Simple-Social-Share
 *
 * Copyright 2016, Bas van den Wijngaard
 *
 */

var simpleSocialShare = (function(){
    "use strict";

    var pluginName = 'simpleSocialShare';
    var storageName = 'plugin_' + pluginName;
    var settings = {
		selector: '.simpleSocialShare',
		before: null,
		after: null
    };

    var tools = {
        /*
         * Default logger
         */
        log: function() {
            if (window.console && console.log) {
                console.log('[social-share] ' + Array.prototype.join.call(arguments, ' ') );
            }
        },

        /*
         * Get type of object
         *
         * @see: https://stackoverflow.com/questions/332422/get-the-name-of-an-objects-type
         */
        getType: function(object) {
            return Object.prototype.toString.call(object).slice(8, -1);
        },

        /*
         * Get type of object
         */
        extend: function() {
            var obj, name, copy, target = arguments[0] || {}, i = 1, length = arguments.length;

            for (; i < length; i++) {
                if ((obj = arguments[i]) !== null) {
                    for (name in obj) {
                        copy = obj[name];

                        if (target === copy) {
                            continue;
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }

            return target;
        }
    };

    var pluginObject = {

        popupwindow: function(url, title, w, h) {
            var left = (screen.width/2)-(w/2);
            var top = (screen.height/2)-(h/2);
            return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
        },

        bind: function() {
            var self = this;
            // Do your binds
            self.element.on('click' + self.namespace, function(e) {
                e.preventDefault();
                self.openSocialSharePopup(self);
            });
		},
		
		getSetting: function( value, setting ) {
			
			if ( settings[setting] !== value && typeof value !== 'undefined' ) {

				return value;

			} else {

				return settings[setting];

			}

		},

        openSocialSharePopup: function(self) {	
			
			var doShare 		= false;
            var shareUrl		= self.element.dataset.shareUrl;
            var shareNetwork	= self.element.dataset.shareNetwork;
            var shareText		= self.element.dataset.shareText;
            var shareTitle		= self.element.dataset.shareTitle;
            var shareVia		= self.element.dataset.shareVia;
            var shareTags		= self.element.dataset.shareTags;
			var shareMedia		= self.element.dataset.shareMedia;
			
			var shareBefore		= self.getSetting( self.element.dataset.shareBefore, 'before' );
			var shareAfter		= self.getSetting( self.element.dataset.shareAfter, 'after' );
			
            var networkShareUrl	= '';
			
            // Check if shareUrl and shareNetwork are present and shareNetwork is in the list of allowed networks
            if (typeof shareUrl !== 'undefined' && typeof shareNetwork !== 'undefined' && self.allowedNetworks.indexOf(shareNetwork) > -1) {
                // At this point we don't automaticly fetch the current URL from the browser
                doShare = true;
            }

            if (doShare === true) {
				
				if ( null !== shareBefore ) { window[ shareBefore ]( self ) };

                switch(shareNetwork) {
                    case 'facebook':
                        networkShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl);
                        break;

                    case 'googleplus':
                        networkShareUrl = 'https://plus.google.com/share?url=' + encodeURIComponent(shareUrl);
                        break;

                    case 'linkedin':
                        networkShareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareUrl) + '&source=' + encodeURIComponent(shareUrl);

                        if (typeof shareTitle !== 'undefined' &&  shareTitle !== '') {
                            networkShareUrl += '&title=' + encodeURIComponent(shareTitle);
                        }

                        if (typeof shareText !== 'undefined' && shareText !== '') {
                            networkShareUrl +=  '&summary=' + encodeURIComponent(shareText);
                        }

                        break;


                    case 'pinterest':
                        networkShareUrl = 'https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareUrl);

                        if (typeof shareMedia !== 'undefined' && shareMedia !== '') {
                            networkShareUrl += '&media=' + encodeURIComponent(shareMedia);
                        }

                        if (typeof shareText !== 'undefined' && shareText !== '') {
                            networkShareUrl += '&description=' + encodeURIComponent(shareText);
                        }

                        if (typeof shareTags !== 'undefined' && shareTags !== '') {
                            networkShareUrl += '&hashtags=' + shareTags;
                        }

                        break;

                    case 'reddit':
                        networkShareUrl = 'http://www.reddit.com/submit/?url=' + encodeURIComponent(shareUrl);
                        break;


                    case 'twitter':
                        networkShareUrl = 'https://twitter.com/intent/tweet?&url=' + encodeURIComponent(shareUrl);

                        if (typeof shareText !== 'undefined' && shareText !== '') {
                            networkShareUrl += '&text=' + encodeURIComponent(shareText);
                        }

                        if (typeof shareVia !== 'undefined' && shareVia !== '') {
                            networkShareUrl += '&via=' + encodeURIComponent(shareVia);
                        }

                        if (typeof shareTags !== 'undefined' && shareTags !== '') {
                            networkShareUrl += '&hashtags=' + shareTags;
                        }

                        break;

                    default:
                        return false;
                }
            }

            if (doShare) {
                // Calculate the position of the popup so it’s centered on the screen.
                self.popupwindow(networkShareUrl, '', 500, 300);
			
				if ( null !== shareAfter ) { window[ shareAfter ]( self ) };

			}

        },

        init: function(options,element) {
            var self = this;

            // Initialise options
            self.options = tools.extend(settings, options || {});

            // Set plugin event namespace
            self.namespace = '.' + pluginName + '.' + new Date().getTime();

            // Store current element
            self.element = element;

            // Networks this plugin is compatible with
            self.allowedNetworks = ['facebook','twitter','linkedin','googleplus', 'pinterest', 'reddit'];

            // Bind events after intialization
            self.bind();

            // Return plugin instance
            return self;
        }
    };

    var enableOnDomObject = function(object) {
        var pluginInstance = object[storageName];
        var instanceOptions = {};

        if (!pluginInstance) {
			pluginInstance = Object.create(pluginObject).init(instanceOptions, object);
            object[storageName] = pluginInstance;

        } else {
            tools.log('Simple Social Share is already initialized for this object.');
        }
    };

    var destroyOnDomObject = function(object) {
        var pluginInstance = object[storageName];

        if (!pluginInstance) {
            tools.log('Simple Social Share is not initialized for this object yet.');

        } else {
			// Delete click event
            object.off('click' + pluginInstance.namespace);

			// Delete data from dom object
            delete object[storageName];
        }
    };

    var actionBySelector = function(input, action) {
        if (null === action || action !== 'destroy') {
            action = 'enable';
        }
        var selector = '';
        var elements = {};

        if (input.indexOf('#') === 0) {
            // Get element by ID
            selector = input.substr(1);
            var element = document.getElementById(selector);

            if (null !== element) {
                if (action === 'destroy') {
                    destroyOnDomObject(element);
                } else {
                    enableOnDomObject(element);
                }
            } else {
                tools.log('No element with ID \'' + selector + '\' found.');
            }

        } else if (input.indexOf('.') === 0) {
            // Get element by class name (or use query selector)
            selector = input.substr(1);
            elements = document.getElementsByClassName(selector);

            if (null !== elements && elements.length > 0) {
                for (var i = 0; i < elements.length; i++) {
                    if (action === 'destroy') {
                        destroyOnDomObject(elements[i]);
                    } else {
                        enableOnDomObject(elements[i]);
                    }
                }
            } else {
                tools.log('No elements with class name \'' + selector + '\' found.');
            }

        } else if (input.length > 0) {
            // Get element by tag name (or use query selector)
            elements = document.getElementsByTagName(input);

            if (null !== elements && elements.length > 0) {
                for (var j = 0; j < elements.length; j++) {
                    if (action === 'destroy') {
                        destroyOnDomObject(elements[j]);
                    } else {
                        enableOnDomObject(elements[j]);
                    }
                }
            } else {
                tools.log('No elements with tag name \'' + input + '\' found.');
            }
        } else {
            tools.log('Empty selector [' + action + ']');
        }
	};
	
	var updateSettings = function( selector, options ) {

		Object.keys( options ).map(function( optionKey, index ) {
			var value = options[optionKey];

			if(typeof settings[optionKey] !== 'undefined') {

				settings[optionKey] = options[optionKey]

			} else {

				tools.log( optionKey + ' is not a valid option');

			}
 
		});

	}

    var destroy = function() {
        var args = Array.prototype.slice.call(arguments);

        if (null !== args && null !== args[0]) {
            var options = args[0];

            if (typeof options === 'object') {
                if (options instanceof HTMLCollection || options instanceof NodeList) {
                    // Multiple elements, loop them
                    for (var i = 0; i < options.length; i++) {
                        destroyOnDomObject(options[i]);
                    }
                } else {
                    // Probably 1 dom object
                    destroyOnDomObject(options);
                }

            } else if (typeof options === 'string') {
                // Enable by selector input
                actionBySelector(options, 'destroy');

            } else {
                // No input
                tools.log('simpleSocialShare.destroy() needs input [2]');
            }

        } else {
            tools.log('simpleSocialShare.destroy() needs input [1]');
        }
    };

    var init = function( selector, options ) {
		
		if (null === options || options === '') {
			options = {};
        }
		
		updateSettings( selector, options );
		
        if (typeof selector === 'object') {
            // Check if it's a NodeList or a HTMLCollection (list of elements)
            if (selector instanceof HTMLCollection || selector instanceof NodeList) {
                // Multiple elements, loop them
                for (var i = 0; i < selector.length; i++) {
                    enableOnDomObject(selector[i]);
                }
            } /*else if (tools.getType(options) === 'Object') {
                // We don't have any options yet
                // Options object
                console.log('options object');
                console.log(typeof options);
                console.log(tools.getType(options));
                console.log(options);
                //socialShare.init(options);
            }*/ else {
                // Probably 1 dom object
                enableOnDomObject(selector);
            }
        } else if (typeof selector === 'string') {
            // Enable by selector input
            actionBySelector(selector, 'enable');

        } else {
            // Use default classname selector
            actionBySelector(settings.selector, 'enable');
        }
    };

    return {
        init:init,
        destroy:destroy
    };

})();
