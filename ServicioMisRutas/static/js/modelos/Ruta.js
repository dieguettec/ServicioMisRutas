/**
 * Clase que implementa rutas individuales
 */
/* old
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
 */

var Ruta = Backbone.Model.extend({
	urlRoot : 'http://localhost:8080/misrutas/rutas',
	initialize : function() {
		if (!this.has("posiciones"))
			this.set('posiciones', []);
		else {
			this.set('posiciones', JSON.parse(this.get('posiciones')));
		}
		if (!this.has("fotos"))
			this.set('fotos', []);
		else {
			this.set('fotos', JSON.parse(this.get('fotos')));
		}
		if (!this.has("fecha"))
			this.set('fecha', Date());
	},
	defaults : {
		titulo : 'Undefined',
		visible : 'on',
		color : '#000000',
	},
});
