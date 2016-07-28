
/*
 * GET home page.
 */

 var httpMsgs = require('./httpMsgs');

 exports.index = function (req, res)
 {
     //res.render('index', { title: 'Express' });
     httpMsgs.showhome(req, res);
 };