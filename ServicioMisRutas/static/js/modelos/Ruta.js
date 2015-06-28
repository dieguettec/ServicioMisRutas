/**
* Clase que implementa rutas individuales
*/
var Ruta = Backbone.Model.extend({
	initialize : function() {
		if (!this.id)
			this.set('id', _.uniqueId());
		if (!this.has("posiciones"))
			this.set('posiciones', []);
		if (!this.has("fotos"))
			this.set('fotos', []);
		if (!this.has("fecha"))
			this.set('fecha', Date());
	},
	defaults : {
		titulo : 'Undefined',
		visible : 'on',
		color : '#000000',
	},
});
