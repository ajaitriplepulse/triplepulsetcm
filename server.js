
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

app.get('/api/', routes.index);
app.get('/api/users/', user.list1);
app.get('/api/homepage/', user.homepage);
app.get('api/QualMaster', user.getQualMaster);
app.get('/api//QualMaster/:QualID', user.getQualMasterID);
app.get('/api/PatientMaster', user.getpatientMaster);
app.get('/api/PatientMaster/:patientId', user.getPatientMasterID);
app.get('/api/Client', user.getclient);
app.get('api/Client/:clientMobile', user.clientMobile);

// POST Methods 

app.post('/api/QualMaster', user.postQualMaster);
app.post('/api/Client', user.postclient);
app.post('/api/familydetails', user.getfamilydetails);

// PUT Methods

app.put('/api/QualMaster', user.putQualMaster);
app.put('/api/PatientMaster', user.putPatientMaster);

// DELETE Methods

app.del('/api/QualMaster', user.deleteQualMaster);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
