var express = require('express');
var bodyParser = require('body-parser'); 
var app = express(); 
app.use(bodyParser.json()); 
app.use(express.static('static'));
//app.use('/static', express.static('static'));

app.use(function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', "*");
	  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	  if (req.method == 'OPTIONS') {
	    res.status(200).send();
	} else {
		next(); 
	}
});


app.get('/hello', function(req, res) { 
	res.end('Hola Mundo!!');
});

var rutas = [];
var nextId = 0;

app.post('/misrutas/rutas', function(req, res) { 
	console.log('POST /misrutas/rutas');
	var ruta = req.body;
	ruta.id = nextId++;
    rutas.push(ruta);
    res.send(ruta);
});


app.get('/misrutas/rutas', function(req, res) { 
	console.log('GET /misrutas/rutas'); 
	res.send(rutas);
});

app.get('/misrutas/rutas/:id', function(req, res) { 
	console.log('GET /misrutas/' + req.params.id); 
	for (var i = 0; i < rutas.length; i++) {
		if (rutas[i].id == req.params.id) { 
			res.send(rutas[i]);
			return; 
		}
	}
	res.status(404).send('Not found');
});


app.put('/misrutas/rutas/:id', function(req, res) { 
	console.log('PUT /misrutas/' + req.params.id); 
	console.log(req.originalUrl);
	for (var i = 0; i < rutas.length; i++) { 
		if (rutas[i].id == req.params.id) {
			rutas[i] = req.body; 
			res.send(rutas[i]); 
			return;
		} 
	}
	res.status(404).send('Not found');
});

app.delete('/misrutas/rutas/:id', function(req, res) {
	console.log('DELETE /misrutas/' + req.params.id); 
	console.log(req.originalUrl);
	for (var i = 0; i < rutas.length; i++) {
		if (rutas[i].id == req.params.id) {
			rutas.splice(i, 1);
       		res.status(200).send();
       		return; 
       	}
	}
    res.status(404).send('Not found');
});

app.listen(8080);

console.log('Servidor arrancado!');

