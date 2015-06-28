/**
 * Define una colección de rutas
 */
function isNumber(n) {
	return !isNaN(parseInt(n)) && isFinite(n);
}

var Rutas = Backbone.Collection.extend({
	model : Ruta,
	initialize : function() {
		this.on("add", function(model, col, opt) {
			console.log('Rutas:add ' + model.id);
			localStorage.setItem(model.id, JSON.stringify(model));

		});
		this.on("remove", function(model, col, opt) {
			console.log('Rutas:remove ' + model.id);
			for (var i = 0; i < localStorage.length; i++) {				
				var key = localStorage.key(i);

				if (isNumber(key)) {
					var val = localStorage.getItem(key);
					var r = JSON.parse(val);

					if (r.id == model.id)
						localStorage.removeItem(r.id);
				}
			}
		});
		this.on("change", function(model, opt) {
			console.log('Rutas:change ' + model.id);
			for (var i = 0; i < localStorage.length; i++) {				
				var key = localStorage.key(i);

				if (isNumber(key)) {
					var val = localStorage.getItem(key);
					var r = JSON.parse(val);

					if (r.id == model.id){
						localStorage.removeItem(r.id);
						localStorage.setItem(model.id, JSON.stringify(model));
					}
				}
			}
		});
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
