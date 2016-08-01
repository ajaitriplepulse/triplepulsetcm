
/*
 * GET home page.
 */

 var httpMsgs = require('./httpMsgs');

 exports.index1 = function (req, res)
 {
     res.render('index', { title: 'Triple Pulse !!' });
     
 };


 exports.index = function (req, res)
 {
     //res.render('index', { title: 'Express' });
     httpMsgs.showhome(req, res);
 };