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
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.get("/MOCK_DATA", function(request, response){
	response.json(data);
})

app.use(cors());

app.get("/about", function(request, response){
	response.sendFile(path.join(__dirname + '/public/about.html'))
})

app.listen(3000);

console.log("server funning on port 3000");