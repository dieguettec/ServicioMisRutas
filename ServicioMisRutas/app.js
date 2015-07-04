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

/* 
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

*/

//SQLite

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists rutas (id INTEGER PRIMARY KEY, titulo TEXT, visible TEXT, color TEXT, fecha DATE, posiciones TEXT, fotos TEXT)");
  /*
  
  db.run("DROP TABLE rutas", [], function(err) { 
		if (err) { console.log('Error: ' + err); }
		else  { console.log("Borrada la base de datos"); }	
	});
	*/
  
  /*
  db.run("DELETE FROM rutas", [], function(err) { 
		if (err) { console.log('Error: ' + err); }
		else  { console.log("Borrada la base de datos"); }	
	});
  /*
  var stmt = db.prepare("INSERT INTO rutas VALUES (?,'on','#000000','','')");
  for (var i = 0; i < 10; i++) {
      stmt.run("Hola " + i);
  }
  stmt.finalize();
   
  db.each("SELECT rowid AS id, titulo FROM rutas", function(err, row) {
      console.log(row.id + ": " + row.titulo);
  });
  */
});

//db.close();

app.post('/misrutas/rutas', function(req, res) { 
	console.log('POST /misrutas/rutas');
	var ruta = req.body;
	db.run("INSERT INTO rutas (titulo, visible, color, fecha, posiciones, fotos) VALUES ( ? , ? , ? , ? , ? , ? )", [ruta.titulo, ruta.visible, ruta.color, ruta.fecha, JSON.stringify(ruta.posiciones), JSON.stringify(ruta.fotos)], function(err) { 
		if (err) { console.log('Error: ' + err); }
		else {
			ruta.id = this.lastID;
			res.send(ruta);
		}
	});
    
});

app.get('/misrutas/rutas', function(req, res) { 
	console.log('GET /misrutas/rutas');
	db.all("SELECT * FROM rutas", function(err, rutas) {
		res.send(rutas);
	});
	
});

app.get('/misrutas/rutas/:id', function(req, res) { 
	console.log('GET /misrutas/rutas/' + req.params.id); 
	db.all("SELECT * FROM rutas WHERE id = ?", req.params.id, function(err, ruta) {
		res.send(ruta);
	});
	
	res.status(404).send('Not found');
});

app.put('/misrutas/rutas/:id', function(req, res) { 
	console.log('PUT /misrutas/rutas/' + req.params.id); 
	var ruta = req.body;
	db.run("UPDATE rutas SET titulo = ? , visible = ? , color = ? , fecha = ? , posiciones = ?, fotos = ? WHERE id = ?", [ruta.titulo, ruta.visible, ruta.color, ruta.fecha, JSON.stringify(ruta.posiciones), JSON.stringify(ruta.fotos), req.params.id], function(err) { 
		if (err) { 
			console.log('Error: ' + err); 
			res.status(404).send('Not found'); 
			return;
		}
		else {
			//console.log(this.lastID);
			return;
		}	
	});
	res.send(ruta);
	
});

app.delete('/misrutas/rutas/:id', function(req, res) {
	console.log('DELETE /misrutas/rutas/' + req.params.id); 
	db.run("DELETE FROM rutas WHERE id = ?", [req.params.id], function(err) { 
		if (err) { 
			console.log('Error: ' + err); 
			res.status(404).send('Not found'); 
			return;
		}
		else  { 
			res.status(200).send();
			return;
		}	
	});
    
});
    
app.listen(8080);

console.log('Servidor arrancado!');

