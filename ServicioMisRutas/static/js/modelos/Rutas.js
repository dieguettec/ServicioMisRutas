/**
 * Define una coleccion de rutas
 */
/*
 * OLD function isNumber(n) { return !isNaN(parseInt(n)) && isFinite(n); }
 * 
 * var Rutas = Backbone.Collection.extend({ model : Ruta, initialize :
 * function() { this.on("add", function(model, col, opt) {
 * console.log('Rutas:add ' + model.id); localStorage.setItem(model.id,
 * JSON.stringify(model));
 * 
 * }); this.on("remove", function(model, col, opt) { console.log('Rutas:remove ' +
 * model.id); for (var i = 0; i < localStorage.length; i++) { var key =
 * localStorage.key(i);
 * 
 * if (isNumber(key)) { var val = localStorage.getItem(key); var r =
 * JSON.parse(val);
 * 
 * if (r.id == model.id) localStorage.removeItem(r.id); } } });
 * this.on("change", function(model, opt) { console.log('Rutas:change ' +
 * model.id); for (var i = 0; i < localStorage.length; i++) { var key =
 * localStorage.key(i);
 * 
 * if (isNumber(key)) { var val = localStorage.getItem(key); var r =
 * JSON.parse(val);
 * 
 * if (r.id == model.id){ localStorage.removeItem(r.id);
 * localStorage.setItem(model.id, JSON.stringify(model)); } } } }); }, import :
 * function() { console.log('Rutas:import'); for (var i = 0; i <
 * localStorage.length; i++) { var key = localStorage.key(i); if (isNumber(key)) {
 * var val = localStorage.getItem(key); var r = JSON.parse(val); this.push(r); } } }
 * });
 */
function isNumber(n) {
	return !isNaN(parseInt(n)) && isFinite(n);
}

/* en memoria
var Rutas = Backbone.Collection.extend({
	url : 'http://localhost:8080/misrutas/rutas',
	model : Ruta,
	initialize : function() {
		this.on("add", function(model, col, opt) {
			console.log('Rutas:add ' + model.id);
			model.save();
		});
		this.on("remove", function(model, col, opt) {
			console.log('Rutas:remove ' + model.id);
			model.destroy();
		});
		this.on("change", function(model, opt) {
			console.log('Rutas:change ' + model.id);
			if (model.changedAttributes().id) 
				return;
			model.save();
		});
		this.fetch({ reset: true });
	},
	import : function() {
		console.log('Rutas:import');
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			if (isNumber(key)) {
				var val = localStorage.getItem(key);
				var r = JSON.parse(val);
				this.push(r);
			}
		}
	}
});
*/


var Rutas = Backbone.Collection.extend({
	url : 'http://localhost:8080/misrutas/rutas',
	model : Ruta,
	initialize : function() {
		this.on("add", function(model, col, opt) {
			console.log('Rutas:add ' + model.id);			
			model.save();
		});
		this.on("remove", function(model, col, opt) {
			console.log('Rutas:remove ' + model.id);
			model.destroy({silent: true});
		});
		this.on("change", function(model, opt) {
			console.log('Rutas:change ' + model.id);
			if (model.changedAttributes().id) 
				return;
			model.save();
		});
		this.fetch({ reset: true });
	},
	import : function() {
		console.log('Rutas:import');
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			if (isNumber(key)) {
				var val = localStorage.getItem(key);
				var r = JSON.parse(val);
				this.push(r);
			}
		}
	}
});
