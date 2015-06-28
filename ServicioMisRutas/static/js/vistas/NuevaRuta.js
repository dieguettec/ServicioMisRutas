var NuevaRuta = Backbone.View.extend({

	initialize : function() {
		this.grabando = false;
		this.timerReloj = null;
		this.timerGps = null;
		this.contadorReloj = null;
		this.render();
	},

	empezarRuta : function() {
		this.model = new Ruta();
		console.log('empezarRuta(' + this.model.id + ')');
		// recuperar titulo de la ruta
		var titulo = this.$('#txtTitulo').val();
		if (!titulo || titulo.length == 0)
			titulo = "Default";
		this.model.set("titulo", titulo);
		// comenzar grabacion de ruta (timers, ...)
		this.grabando = true;
		this.contadorReloj = 0;
		var self = this;
		this.timerReloj = setInterval(function() {
			self.contadorReloj++;
			self.render();
		}, 1000);
		this.timerGps = setInterval(function() {
			self.leerGps();
		}, 1000);
		// pintar vista
		this.render();
	},

	pararRuta : function() {
		console.log('pararRuta(' + this.model.id + ')');
		this.grabando = false;
		// parar timers
		clearInterval(this.timerReloj);
		clearInterval(this.timerGps);
		// guardar ruta
		this.collection.add(this.model);
		// limpiar modelo
		this.model = null;
		// pintar vista
		this.render();
	},

	leerGps : function() {
		// init
		window.inc = typeof (inc) == 'undefined' ? 0.00005 : window.inc;
		window.lat = typeof (lat) == 'undefined' ? 38.695015 : window.lat;
		window.lng = typeof (lng) == 'undefined' ? -0.476049 : window.lng;
		window.dir = typeof (dir) == 'undefined' ? Math
				.floor((Math.random() * 4)) : window.dir;
		// numbers 0,1,2,3 (0 up, 1 right, 2, down, 3 left)
		// generate direction (randomly)
		// it is more likely to follow the previous direction
		var nuevaDir = Math.floor((Math.random() * 4)); // number 0,1,2,3
		if (nuevaDir != (dir + 2) % 4)
			dir = nuevaDir;
		switch (dir) {
		case 0: // up
			lat += inc;
			break;
		case 1: // right
			lng += inc;
			break;
		case 2: // down
			lat -= inc;
			break;
		case 3: // left
			lng -= inc;
			break;
		default:
		}
		var pos = {
			lat : lat,
			lng : lng
		};
		// add new position to the route
		var posiciones = this.model.get('posiciones');
		posiciones.push(pos);
		this.model.set('posiciones', posiciones);
	},

	render : function() {
		if (this.grabando) {
			this.$('#txtTitulo').val(this.model.get('titulo')).textinput(
					'refresh');
			// show panel change - button text
			this.$('#btGrabar').val('Parar').button('refresh');
			this.$('#lblInfo').text(
					'Guardando ruta ' + this.model.get('titulo') + ' ...');
			var minutos = parseInt(this.contadorReloj / 60);
			var segundos = this.contadorReloj % 60;
			var horas = parseInt(minutos / 60);
			minutos = minutos % 60;
			this.$('#lblReloj').text(
					"" + (horas < 10 ? "0" : "") + horas + ":"
							+ (minutos < 10 ? "0" : "") + minutos + ":"
							+ (segundos < 10 ? "0" : "") + segundos);
			this.$('#pnInfo').css('visibility', 'visible');
			this.$('#btFoto').button('option', 'disabled', false);
		} else {
			// hide panel change - button text
			this.$('#btGrabar').val('Empezar ruta').button('refresh');
			this.$('#pnInfo').css('visibility', 'hidden');
			this.$('#btFoto').button('option', 'disabled', true);
		}
	},

	// A button will call this function
	//
	captureImage : function() {
		// Launch device camera application,
		// allowing user to capture up to 1 images
		//navigator.device.capture.captureImage(this.captureSuccess, this.captureError, {	limit : 1 });
		//navigator.camera.getPicture(this.captureSuccess, this.captureError, {	limit : 1 });
		var self =  this;
		navigator.device.capture.captureImage(
			function(mediaFiles) { self.grabarMarker(mediaFiles[0].fullPath); },
			this.captureError, {	limit : 1 });
	},

	// Called when capture operation is finished
	//
	captureSuccess : function(mediaFiles) {
		console.log('NuevaRuta.captureSuccess(' + mediaFiles[0].fullPath + ')');

		self.grabarMarker(mediaFiles[0].fullPath);

	},

	// Called if something bad happens.
	//
	captureError : function(error) {
		var msg = 'An error occurred during capture: ' + error.code;
		navigator.notification.alert(msg, null, 'Uh oh!');
	},

	grabarMarker : function(uri) {
		var posiciones = this.model.get('posiciones');
		if (posiciones.length > 0) {
			var pos = posiciones[posiciones.length - 1];

			// add new photo to the route
			var foto = {
				lat : pos.lat,
				lng : pos.lng,
				uri : uri
			};

			var fotos = this.model.get('fotos');
			fotos.push(foto);
			this.model.set('fotos', fotos);
			}
	},

	events : {
		'click #btGrabar' : function() {
			if (this.grabando)
				this.pararRuta();
			else
				this.empezarRuta();
		},
		'click #btFoto' : function() {
			if (this.grabando)
				this.captureImage();
		}
	}
});
