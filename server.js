
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// GET Methods 

app.get('/', routes.index);
app.get('/users', user.list1);
app.get('/homepage', user.homepage);
app.get('/QualMaster', user.getQualMaster);
app.get('/QualMaster/:QualID', user.getQualMasterID);
app.get('/PatientMaster', user.getpatientMaster);
app.get('/PatientMaster/:patientId', user.getPatientMasterID);
app.get('/Client', user.getclient);
app.get('/Client/:clientMobile', user.clientMobile);

// POST Methods 

app.post('/QualMaster', user.postQualMaster);
app.post('/Client', user.postclient);

// PUT Methods

app.put('/QualMaster', user.putQualMaster);
app.get('/PatientMaster', user.putPatientMaster);

// DELETE Methods

app.del('/QualMaster', user.deleteQualMaster);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
