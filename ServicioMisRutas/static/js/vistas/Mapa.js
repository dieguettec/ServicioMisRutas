var Mapa = Backbone.View.extend({
	initialize : function() {
		var self = this;
		// crear el mapa la primera vez que se muestra la pagina
		$(document).one(
				'pageshow',
				'#' + this.$el.attr('id'),
				function(e, data) {
					// crear contenedor
					self.$('.ui-content').append('<div id="pnMapa"></div>');
					// obtener altura del contenedor
					var header = $.mobile.activePage
							.find("div[data-role='header']:visible");
					var footer = $.mobile.activePage
							.find("div[data-role='footer']:visible");
					var content = $.mobile.activePage
							.find("div.ui-content:visible");
					var viewport_height = $(window).height();
					var content_height = viewport_height - header.outerHeight()
							- footer.outerHeight();
					if ((content.outerHeight() - header.outerHeight() - footer
							.outerHeight()) <= viewport_height) {
						content_height -= (content.outerHeight() - content
								.height());
					}
					self.$('#pnMapa').height(content_height);
					// crear mapa
					var myOptions = {
						zoom : 18,
						center : new google.maps.LatLng(38.695015, -0.476049),
						mapTypeId : google.maps.MapTypeId.ROADMAP
					};
					self.map = new google.maps.Map(self.$('#pnMapa')[0],
							myOptions);
					self.polylines = new Array();
					// pintar
					self.render();
				});
		// controlar cambios en el modelo
		this.collection.on('change:color', function() {
			self.render();
		});
		this.collection.on('change:visible', function() {
			self.render();
		});
		this.collection.on('add', function() {
			self.render();
		});
		this.collection.on('remove', function() {
			self.render();
		});
	},
	render : function() {
		// limpiar todas las rutas pintadas
		for (var i = 0; i < this.polylines.length; i++)
			this.polylines[i].setMap(null);
		this.polylines = [];
		// pintar las rutas
		var self = this;
		this.collection.forEach(function(ruta) {
			// solo si son visibles
			if (ruta.get('visible') == 'on') {
				var polyline = new google.maps.Polyline({
					path : _.map(ruta.get('posiciones'), function(coords) {
						return new google.maps.LatLng(coords.lat, coords.lng);
					}),
					map : self.map,
					strokeColor : ruta.get('color'),
					strokeOpacity : 1.0,
					strokeWeight : 4
				});
				// guardar informacion sobre las rutas pintadas
				self.polylines.push(polyline);

				ruta.get('fotos').forEach(function(foto) {
					console.log('mapa.render(' + foto.uri + ')');
					var marker = new google.maps.Marker({
						position : new google.maps.LatLng(foto.lat, foto.lng),
						map : self.map,
						title : 'photo'
					});

					google.maps.event.addListener(marker, 'click', function() {
						self.$('#poppphoto').attr("src", foto.uri);
						self.$('#popupPhoto').popup("open", {
							transition : 'fade'
						});
					});
				});
			}
		});
	}
});