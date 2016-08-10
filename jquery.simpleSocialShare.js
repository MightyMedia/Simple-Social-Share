// Utility for creating objects in older browsers
if (typeof Object.create !== 'function') {
	Object.create = function(obj) {
		function F() {}
		F.prototype = obj;
		return new F();
	};
}
/*!
 * Simple Social Share jQuery
 *
 * Simple Social Share for jQuery is a simple way of creating social share buttons on your website.
 *
 * Version 0.1.0
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
			self.exampleVariable = 0;

			// Bind events after intialisation
			self.bind();

			// Return plugin instance
			return self;

		},

		bind: function() {

			var self = this;
			// Do your binds
			self.bindProxied(self.$element, 'click', self.exampleMethod);

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

		exampleMethod: function(e) {

			var self = this;
			// Do some magic!
			self.exampleVariable++;
			console.log('Clicked ' + self.exampleVariable + ' times!');

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

					$.error('Plugin is already initialized for this object.');
					return;

				}
			} else if (!pluginInstance) {

				$.error('Plugin is not initialized for this object yet.');
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

	$.fn[pluginName].options = {
		key: 'value'
	};

})(jQuery, window, document);