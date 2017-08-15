var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

var data = require("./data/MOCK_DATA");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();
});

app.use(express.static("./public"));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
// app.use('/scripts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.get("/MOCK_DATA", function(request, response){
	response.json(data);
})

app.get("/products/:term", function(request,response){
	var term = request.params.term;
	searchData(response, term);

});

app.get("/products/:term/:instock", function(request, response){
	console.log("here");
	var term = request.params.term;
	var stock = request.params.instock;
	searchDataInStock(response, term, stock);
});

// attempt at price
app.get("/products/:term/:price", function(request, response){
	console.log("here");
	var term = request.params.term;
	var price = request.params.instock;
	searchDataInStock(response, term, price);
});

app.use(cors());

app.get("/about", function(request, response){
	response.sendFile(path.join(__dirname + '/public/about.html'))
})

app.listen(3000);

console.log("server funning on port 3000");

function searchData(response, term){
	term = term.toLowerCase();
	var list = data.filter(function(item){
		var name = item.name.toLowerCase();
		if(name.indexOf(term) !== -1){
			return item;
		}
	});
	response.end(JSON.stringify(list));
}

function searchDataInStock(response, term, stock){
	term = term.toLowerCase();
	if(stock == "yes"){
		var avail = true;
	}else if(stock == "no"){
		var avail = false;
	}

	var list = data.filter(function(item){
		var name = item.name.toLowerCase();
		if( (name.indexOf(term)!== -1) && (item.instock == avail) ){
			return item;
		}
	});
	response.end(JSON.stringify(list));
}
