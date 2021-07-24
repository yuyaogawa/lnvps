var express = require('express');
var router = express.Router();
var execSync = require('child_process').execSync;
//var os = require("os");

//var hostname = os.hostname();
const hostname = 'ogma-5'

router.get('/', function(req, res, next) {

    var json = execSync('curl -s https://bitclouds.sh/status/' + hostname).toString();
    var status = JSON.parse(json);
    console.log(status)

    var data = {'status': status};
    res.render('index', {data});
});

router.post('/topup', function(req, res, next) {

  var amount = req.body.amount;
  var json2 = execSync('curl -s https://bitclouds.sh/topup/' + hostname + '/' + amount).toString();
  var topup = JSON.parse(json2);

  var data = { 'data': topup };
  res.send( data );
});

router.get('/status', function(req, res, next) {

  var amount = req.body.invoice;
  var json = execSync('curl -s https://bitclouds.sh/status/' + hostname).toString();
  var status = JSON.parse(json);
  console.log(status)

  var data = {'status': status};
  res.render('index', {data});
});

module.exports = router;