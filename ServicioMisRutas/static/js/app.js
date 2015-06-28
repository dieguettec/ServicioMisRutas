// crear bd
var rutas = new Rutas();

$(document).on('pageinit', '#pgHome', function() {
	
	rutas.import();
	
	var vistaNuevaRuta = new NuevaRuta({collection: rutas, el: '#pgHome'});
	});

$(document).on('pageinit', '#pgMisRutas', function() {
	var vistaEditarRuta = new EditarRuta({collection: rutas, el: '#pgEditarRuta'});
	var vistaListaRutas = new ListaRutas({collection: rutas, el: '#pnRutas'});
	vistaListaRutas.editarRuta(vistaEditarRuta);
	});

$(document).on('pageinit', '#pgMapa', function() {
	var vistaMapa = new Mapa({collection: rutas, el: '#pgMapa'});
	});
/*
$(document).one(
		'pageshow',
		'#pgMapa',
		function(e, data) {
			// obtener altura del contenedor
			var header = $("#pgMapa").find("div[data-role='header']:visible");
			var footer = $("#pgMapa").find("div[data-role='footer']:visible");
			var content = $("#pgMapa").find("div.ui-content:visible");
			var viewport_height = $(window).height();
			var content_height = viewport_height - header.outerHeight()
					- footer.outerHeight();
			if ((content.outerHeight() - header.outerHeight() - footer
					.outerHeight()) <= viewport_height) {
				content_height -= (content.outerHeight() - content.height());
			}
			$('#pnMapa').height(content_height);
			// crear mapa
			var myOptions = {
				zoom : 18,
				center : new google.maps.LatLng(38.695015, -0.476049),
				mapTypeId : google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map($('#pnMapa')[0], myOptions);
		});
*/
