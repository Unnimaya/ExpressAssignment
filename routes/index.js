var express = require('express');
var fs=require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
      res.render('index'); // load the index.ejs file
  });

  //Reading the JSON File
  router.get('/getJSON',function(req,res)
  {
    console.log("inside  get json");
    var jsoncontent=fs.readFileSync('data/movie.json');
    res.json(jsoncontent.toString());
  });


  router.get('/operations', function(req, res) {
          res.render('index');
      });

module.exports = router;
