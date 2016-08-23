// Utility for creating objects in older browsers
if (typeof Object.create !== 'function') {
	Object.create = function(obj) {
		function F() {}
		F.prototype = obj;
		return new F();
	};
}

/*!
 * Simple Social Share for jQuery
 *
 * Simple Social Share for jQuery is a simple way of creating social share buttons on your website without loading all the third party scripts from these networks.
 *
 * Based on a blog by Jonathan Suh: https://jonsuh.com/blog/social-share-links/
 *
 * Version 0.1.1
 * Licensed under the MIT License: https://github.com/MightyMedia/Simple-Social-Share/blob/master/LICENSE
 *
 * Requires:
 * - jQuery 1.7 or higher
 *
 * https://github.com/MightyMedia/Simple-Social-Share
 *
 * Copyright 2016, Bas van den Wijngaard
 *
 */
(function($, window, document, undefined) {

	var pluginName = 'simpleSocialShare';
	var storageName = 'plugin_' + pluginName;

	var pluginObject = {

		init: function(options, element) {

			var self = this;

			// Initialise options
			self.options = $.extend(true, {}, $.fn[pluginName].options, options);

			// Set plugin event namespace
			self.namespace = '.' + pluginName + '.' + new Date().getTime();

			// Store current element
			self.element = element;
			self.$element = $(element);

			// Init your plugin stuff here
			self.allowedNetworks = ['facebook','twitter','linkedin','googleplus', 'pinterest', 'reddit'];

			// Bind events after intialisation
			self.bind();

			// Return plugin instance
			return self;

		},

		bind: function() {

			var self = this;

			// Do your binds
			self.bindProxied(self.$element, 'click', self.openSocialSharePopup);

		},

		bindProxied: function($element, event, method) {

			var self = this;
			$element.on(event + self.namespace, $.proxy(function(e) {
				return method.call(self, e);
			}, self));

		},

		destroy: function() {

			var self = this;
			// Remove all binds from element
			self.$element.off(self.namespace);
			// Remove plugin instance from object
			self.$element.removeData(storageName);

		},

		openSocialSharePopup: function(e) {

			e.preventDefault();
			var self			= this;

			var doShare 		= false;
			var shareUrl		= self.$element.data('share-url');
			var shareNetwork	= self.$element.data('share-network');
			var shareText		= self.$element.data('share-text');
			var shareTitle		= self.$element.data('share-title');
			var shareVia		= self.$element.data('share-via');
			var shareTags		= self.$element.data('share-tags');
			var shareMedia		= self.$element.data('share-media');
			var networkShareUrl	= '';

			// Check if shareUrl and shareNetwork are present and shareNetwork is in the list of allowed networks
			if (typeof shareUrl !== 'undefined' && typeof shareNetwork !== 'undefined' && self.allowedNetworks.indexOf(shareNetwork) > -1) {

				// At this point we don't automaticly fetch the current URL from the browser
				doShare = true;

			}

			if (doShare === true) {

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

			}

		},

		popupwindow: function(url, title, w, h) {

			var left = (screen.width/2)-(w/2);
			var top = (screen.height/2)-(h/2);

			return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);

		}

	};

	$.fn[pluginName] = function(options) {

		var args = Array.prototype.slice.call(arguments);

		return this.each(function() {

			var pluginInstance = $.data(this, storageName);

			if (typeof options === 'object' || options === 'init' || !options) {

				if (!pluginInstance) {

					if (options === 'init') {

						options = args[1] || {};

					}

					pluginInstance = Object.create(pluginObject).init(options, this);
					$.data(this, storageName, pluginInstance);

				} else {

					$.error('Simple Social Share is already initialized for this object.');
					return;

				}
			} else if (!pluginInstance) {

				$.error('Simple Social Share is not initialized for this object yet.');
				return;

			} else if (pluginInstance[options]) {

				var method = options;
				options = args.slice(1);
				pluginInstance[method].apply(pluginInstance, options);

			} else {

				$.error('Method ' + options + ' does not exist on jQuery.' + pluginName + '.');
				return;

			}

		});

	};

/*
	$.fn[pluginName].options = {
		key: 'value'
	};
*/

})(jQuery, window, document);