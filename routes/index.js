
/*
 * GET home page.
 */

 var httpMsgs = require('./httpMsgs');

 exports.index1 = function (req, res)
 {
     res.render('index', { title: 'Express' });
     
 };


 exports.index = function (req, res)
 {
     //res.render('index', { title: 'Express' });
     httpMsgs.showhome(req, res);
 };