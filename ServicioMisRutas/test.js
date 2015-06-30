var readline = require('readline'); 
var request = require('request');

var rl = readline.createInterface({ 
	input: process.stdin,
	output: process.stdout
});

rl.setPrompt('mis rutas>');
rl.prompt();

rl.on('line', function(line) {
	var args = line.split(' ');
	switch (args[0]) {
	case 'exit': /* salir del cliente */
		console.log('Bye');
		rl.close();
		process.exit();
	break;
	case 'help': /* mostrar mensaje de ayuda */
		console.log('Comandos disponibles:');
		console.log('  - help: mostrar este mensaje');
		console.log('  - exit: salir del cliente');
		console.log('  - get [<id>]: recupera todas las rutas o bien la ruta con el <id> especificado');
		console.log('  - new <titulo>: crea una nueva ruta con el titulo especificado');
		console.log('  - update <id> <titulo>: modifica la ruta con el <id> especificado cambiando su titulo');
		console.log('  - delete <id>: elimina la ruta con el <id> especificado');
		rl.prompt();
	break;
	case 'get': /* recuperar rutas */
		var url = 'http://localhost:8080/misrutas/rutas'; if (args.length > 1) url += '/' + args[1];
		var opts = {
				url: url,
				method: 'GET'
		};
		request(opts, function(error, res, body) { 
			if (error || res.statusCode != 200) {
				console.log('Error: ' + error); 
			} 
			else {
				console.log(body);
		  }
		  rl.prompt();
		});
	break;
	case 'new': /* crear nueva ruta */
		var titulo = "Default";
		if (args.length > 1) titulo = args[1]; var opts = {
				url: 'http://localhost:8080/misrutas/rutas', method: 'POST',
				json: true,
				body: { titulo: titulo }
		};
		request(opts, function(error, res, body) {
		if (error || res.statusCode != 200) { 
			console.log('Error: ' + error);
		} else { console.log(body);
		}
		  rl.prompt();
		});
	break;
	case 'update': /* actualizar ruta */
		if (args.length < 3) {
			console.log("Es necesario especificar el <id> y el nuevo <titulo>"); rl.prompt();
			return;
		}
		var opts = {
			url: 'http://localhost:8080/misrutas/rutas/' + args[1], method: 'PUT',
			json: true,
			body: { id: args[1], titulo: args[2] }
		};
		request(opts, function(error, res, body) {
			if (error || res.statusCode != 200) { 
				console.log('Error: ' + error);
			} else { 
				console.log(body);
			}
			rl.prompt();
		});
	break;
	case 'delete': /* eliminar ruta */
		if (args.length < 2) {
			console.log("Es necesario especificar el <id>"); 
			rl.prompt();
			return;
		}
		var opts = {
				url: 'http://localhost:8080/misrutas/rutas/' + args[1],
				method: 'DELETE'
		};
		request(opts, function(error, res, body) { 
			if (error || res.statusCode != 200) {
				console.log('Error: ' + error); 
			} else {
			    console.log(body);
			}
			rl.prompt();
		});
	break; 
	default:
		rl.prompt();
	} 
});