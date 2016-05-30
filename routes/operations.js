var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var fs=require("fs");
var apiclient = require("omdb-api-client");

router.get('/operations/addMovie', function(req, res) {
  requestedPath=req.url;
console.log("INSIDE ADD movie");
if(requestedPath.indexOf("movieName") != -1){
var title =  requestedPath.substring(requestedPath.indexOf("movieName")+10).trim();
console.log(title);
omdb({t:title}).list(function(err,data){
  console.log("hi");
  if(err){
    return console.error(err);
  }
  if(data.length<1)
  {
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data,'utf-8');
    res.end();
    console.log("cannot find movie");
  }
  else {
    console.log("in");
    var jsonFile=fs.readFileSync('data/movie.json');
    console.log(jsonFile.toString());
    var myjson=JSON.parse(jsonFile);
    myjson.push(data);
    var addedJson=JSON.stringify(myjson);
    fs.writeFileSync('data/movie.json',addedJson);
    res.render('index');
  }
});
}
	});


  router.get('/operations/deleteMovie', function(req, res) {
    requestedPath=req.url;
console.log(requestedPath);
if(requestedPath.indexOf("titlename") !=-1){
var movieID =  requestedPath.substring(requestedPath.indexOf("titlename")+10).trim();
console.log(movieID);
var jsonFile = fs.readFileSync('data/movie.json');
var json = JSON.parse(jsonFile);
for(var i=0;i<json.length;i++)
{
if(json[i].title==movieID)
{
  console.log(json[i]);
  json.splice(i,1);
      var x=JSON.stringify(json);
  fs.writeFileSync('data/movie.json',x);
  res.render('index');
}
}
}
});

router.get('/crud/updateMovie', function(req, res) {
		console.log("Into Update");
		var requestedPath = req.url;
		var title = req.body.mvTitle;
		var year = req.body.Year;
		var director = req.body.Director;
		var actors = req.body.Actor;
		var plot = req.body.Plot;
		var jsonFile = fs.readFileSync('data/Movies.json');
		var json = JSON.parse(jsonFile);
		for (var i = 0; i < json.length; i++) {
			if (json[i].title == title) {
				json[i].Director = director;
				json[i].Year = year;
				json[i].Actors = actors;
				json[i].Plot = plot;
			}
		}
		var fullJSON = JSON.stringify(json);
		fs.writeFileSync('data/Movies.json', fullJSON);
    res.render('index');
	});
module.exports = router;
