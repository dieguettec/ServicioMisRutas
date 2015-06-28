var EditarRuta = Backbone.View.extend({
	render : function() {
		this.$('#txtEditarTitulo').val(this.model.get('titulo')).textinput(
				'refresh');
		this.$('#txtEditarFecha').val(this.model.get('fecha')).textinput(
				'refresh');
		this.$('#txtEditarColor').val(this.model.get('color')).textinput(
				'refresh');
		this.$('#txtEditarVisualizar').val(this.model.get('visible'))
				.flipswitch('refresh');
	},
	events : {
		'change #txtEditarTitulo' : function() {
			this.model.set('titulo', this.$('#txtEditarTitulo').val());
		},
		'change #txtEditarColor' : function() {
			this.model.set('color', this.$('#txtEditarColor').val());
		},
		'change #txtEditarVisualizar' : function() {
			this.model.set('visible', this.$('#txtEditarVisualizar').val());
		},
		'click #btBorrar' : function() {
			this.collection.remove(this.model);
			$(':mobile-pagecontainer').pagecontainer('change', '#pgMisRutas');
		}
	}
});