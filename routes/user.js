/**
 * Module dependencies.
 */

var sql = require('mssql');
var settings = require("./settings");
var httpMsgs = require('./httpMsgs');
var util = require('util');
exports.list1 = function(req, res){
  res.send("respond with a resource");
};

exports.homepage = function (req, res){
    httpMsgs.showhome(req, res);
};


// get details from the QualMaster

exports.getQualMaster = function (req, res){
sql.connect(settings.dbconfig, function (err, conn) {
        if (err) {
            console.log(err);
            httpMsgs.show500(req,res);
        }
        else {
            var request=new sql.Request();
            request.query("SELECT * FROM QualMaster", function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results,null,4);
                }
            });
        }
    });    
};


// get details from the QualMaster/:QualID

exports.getQualMasterID = function (req, res){
    var QualID = req.params.QualID;
    sql.connect(settings.dbconfig, function (err)
    {
        if (err)
        {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else
        {
            var request = new sql.Request();
            request.query("SELECT * FROM QualMaster where QualID=" + QualID, function (err, results)
            {
                if (err)
                {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else
                {
                    res.json(results);
                }
            });
        }
    });
};

// Insert Records in QualMaster

exports.postQualMaster = function (req, res){
    var post = {
        QualID: req.body.QualID,
        QualTitle: req.body.QualTitle,
        QualShort: req.body.QualShort,
        QualUniversity: req.body.QualUniversity
    };
    //console.log(post);
    sql.connect(settings.dbconfig, function (err){
        if (err){
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else{
            var request = new sql.Request();
            var sql1 = "INSERT INTO QualMaster(QualID,QualTitle,QualShort,QualUniversity) values";
            sql1 += util.format("(%d,'%s','%s','%s')", post.QualID, post.QualTitle, post.QualShort, post.QualUniversity);
            request.query(sql1, function (err, results){
                if (err){
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else{
                    res.json(results);
                }
            });
        }
    });
 };

// Updates details of the QualMaster

 exports.putQualMaster = function (req, res)
 {

     var data = {
         QualID: req.body.QualID,
         QualTitle: req.body.QualTitle,
         QualShort: req.body.QualShort,
         QualUniversity: req.body.QualUniversity
     };
     sql.connect(settings.dbconfig, function (err)
     {
         if (err)
         {
             console.log(err);
             res.send(500, "Cannot open connection.");
         }
         else
         {
             var request = new sql.Request();
             var sql1 = "UPDATE QualMaster SET";
             var isDataProvided = false;
             if (data.QualShort)
             {
                 sql1 += " QualShort='" + data.QualShort + "',";
                 isDataProvided = true;
             }
             if (data.QualTitle)
             {
                 sql1 += " QualTitle='" + data.QualTitle + "',";
                 isDataProvided = true;
             }
             if (data.QualUniversity)
             {
                 sql1 += " QualUniversity='" + data.QualUniversity + "',";
                 isDataProvided = true;
             }
             sql1 = sql1.slice(0, -1); //remove last comma;
             sql1 += "Where QualID=" + data.QualID;
             request.query(sql1, function (err, results)
             {
                 if (err)
                 {
                     console.log(err);
                     res.send(500, "Cannot retrive records.");
                 }
                 else
                 {
                     res.json(results);
                 }
             });
         }
     });
 };


 // Delete a row form QualMaster

 exports.deleteQualMaster = function (req, res)
 {

     var QualID = req.body.QualID;
     sql.connect(settings.dbconfig, function (err)
     {
         if (err)
         {
             console.log(err);
             res.send(500, "Cannot open connection.");
         }
         else
         {
             var request = new sql.Request();
             request.query("DELETE FROM QualMaster where QualID=" + QualID, function (err, results)
             {
                 if (err)
                 {
                     console.log(err);
                     res.send(500, "Cannot retrive records.");
                 }
                 else
                 {
                     res.json(results);
                 }
             });
         }
     });
 };


// get details from the PatientMaster

exports.getpatientMaster = function (req, res){
sql.connect(settings.dbconfig, function (err, conn) {
        if (err) {
            console.log(err);
            httpMsgs.show500(req,res);
        }
        else {
            var request=new sql.Request();
            request.query("SELECT * FROM patientMaster", function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results,null,2);
                }
            });
        }
    });    
};


// update PatientMaster

exports.putPatientMaster = function (req, res)
{

    var data = {
        patientId: req.body.patientId,
        FK_clientId:req.body.FK_clientId,
        FK_patientGender: req.body.FK_patientGender,
        FK_bloodGroupId: req.body.FK_bloodGroupId,
        FK_relationshipId:req.body.FK_relationshipId,
        FK_allergyId: req.body.FK_allergyId,
        FK_mobilityId: req.body.FK_mobilityId,
        patientName: req.body.patientName,
        patientMobile: req.body.patientMobile,     
        patientPhoto: req.body.patientPhoto,
        patientWeight: req.body.patientWeight,
        patientHeight: req.body.patientHeight,
        foodIntakeTime1: req.body.foodIntakeTime1,
        foodIntakeTime2: req.body.foodIntakeTime2,
        foodIntakeTime3: req.body.foodIntakeTime3,
        pillReminderFlag: req.body.pillReminderFlag,
        patientDOB: req.body.patientDOB,
        createdDate: req.body.createdDate,
        createdBy: req.body.createdBy,
        updatedDate: req.body.updatedDate,
        updatedBy: req.body.updatedBy,
        updateFlag: req.body.updateFlag,
        insertFlag: req.body.insertFlag
    };

    console.log(data);
    
    sql.connect(settings.dbconfig, function (err)
    {
        if (err)
        {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }

        else
        {
            var request = new sql.Request();
            var sql1 = "UPDATE patientMaster SET";
            var isDataProvided = false;

            if (data.FK_clientId){
                sql1 += " FK_clientId='" + data.FK_clientId + "',";
                isDataProvided = true;
            }

             if (data.FK_patientGender){
                sql1 += " FK_patientGender='" + data.FK_patientGender + "',";
                isDataProvided = true;
            }
    

             if (data.FK_bloodGroupId){
                sql1 += " FK_bloodGroupId='" + data.FK_bloodGroupId + "',";
                isDataProvided = true;
            }
    

             if (data.FK_relationshipId){
                sql1 += " FK_relationshipId='" + data.FK_relationshipId + "',";
                isDataProvided = true;
            }
    

             if (data.FK_allergyId){
                sql1 += " FK_allergyId='" + data.FK_allergyId + "',";
                isDataProvided = true;
            }
    

             if (data.FK_mobilityId){
                sql1 += " FK_mobilityId='" + data.FK_mobilityId + "',";
                isDataProvided = true;
            }
    
            if (data.patientName)
            {
                sql1 += " patientName='" + data.patientName + "',";
                isDataProvided = true;
            }
    
                    if (data.patientMobile)
            {
                sql1 += " patientMobile='" + data.patientMobile + "',";
                isDataProvided = true;
            }
        
            if (data.patientPhoto)
            {
                sql1 += " patientPhoto='" + data.patientPhoto + "',";
                isDataProvided = true;
            }
            if (data.patientWeight)
            {
                sql1 += " patientWeight='" + data.patientWeight + "',";
                isDataProvided = true;
            }
            if (data.patientHeight)
            {
                sql1 += " patientHeight='" + data.patientHeight + "',";
                isDataProvided = true;
            }
    

             if (data.foodIntakeTime1)
            {
                sql1 += " foodIntakeTime1='" + data.foodIntakeTime1 + "',";
                isDataProvided = true;
            }
    
             if (data.foodIntakeTime2)
            {
                sql1 += " foodIntakeTime2='" + data.foodIntakeTime2 + "',";
                isDataProvided = true;
            }
    
             if (data.foodIntakeTime3)
            {
                sql1 += " foodIntakeTime3='" + data.foodIntakeTime3 + "',";
                isDataProvided = true;
            }

             if (data.pillReminderFlag)
            {
                sql1 += " pillReminderFlag='" + data.pillReminderFlag + "',";
                isDataProvided = true;
            }
    
            if (data.patientDOB)
            {
                sql1 += " patientDOB='" + data.patientDOB + "',";
                isDataProvided = true;
            }

             if (data.createdDate)
            {
                sql1 += " createdDate='" + data.createdDate + "',";
                isDataProvided = true;
            }

            if (data.createdBy)
            {
                sql1 += " createdBy='" + data.createdBy + "',";
                isDataProvided = true;
            }
            if (data.updatedDate)
            {
                sql1 += " updatedDate='" + data.updatedDate + "',";
                isDataProvided = true;
            }

            
            if (data.updatedBy)
            {
                sql1 += " updatedBy='" + data.updatedBy + "',";
                isDataProvided = true;
            }

            if (data.updateFlag)
            {
                sql1 += " updateFlag='" + data.updateFlag + "',";
                isDataProvided = true;
            }
              if (data.insertFlag)
            {
                sql1 += " insertFlag='" + data.insertFlag + "',";
                isDataProvided = true;
            }
       
            sql1 = sql1.slice(0, -1); //remove last comma;
            sql1 += "Where patientId=" + data.patientId;
            request.query(sql1, function (err, results)
            {
                if (err)
                {
                    res.status(500).json({ "patientUpdateStatus": "fail", "patientUpdateError": err });
                }
                else
                {
                    res.json({ "asdf": results, "patientUpdateStatus": "Success", "patientUpdateError": "" });
                }
            });
        }
    });
};

exports.getPatientMasterID = function (req, res){
    var patientId = req.params.patientId;
    sql.connect(settings.dbconfig, function (err)
    {
        if (err)
        {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else
        {
            var request = new sql.Request();
            request.query("SELECT * FROM patientMaster where patientId=" + patientId, function (err, results)
            {
                if (err)
                {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else
                {
                    res.json(results);
                }
            });
        }
    });
};

// Get Client Details

exports.getclient = function (req, res){
sql.connect(settings.dbconfig, function (err, conn) {
        if (err) {
            console.log(err);
            httpMsgs.show500(req,res);
        }
        else {
            var request=new sql.Request();
            request.query("SELECT * FROM client", function (err, results) {
                if (err) {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else {
                    res.json(results,null,2);
                }
            });
        }
    });    
};


// Get Client Specfic Details based on the client ID


exports.clientMobile = function (req, res){
    var clientMobile = req.params.clientMobile;
    sql.connect(settings.dbconfig, function (err)
    {
        if (err)
        {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else
        {
            var request = new sql.Request();
            request.query("SELECT * FROM client where clientMobile=" + clientMobile, function (err, results)
            {
                if (err)
                {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else
                {
                    res.json(results);
                }
            });
        }
    });
};

// Post data into Client Table and return the inserted the client id 
 
exports.postclient = function (req, res)
{

    var data = {
        clientName: req.body.clientName,
        clientMobile: req.body.clientMobile,
        clientEmail: req.body.clientEmail,
        clientPassword: req.body.clientPassword,
        deviceId: req.body.deviceId,
        phoneModel: req.body.phoneModel,
        androidVersionId: req.body.androidVersionId,
        softwareVersionName: req.body.softwareVersionName,
        softwareVersionCode: req.body.softwareVersionCode,
        createdBy: req.body.createdBy,
        createdDate: req.body.createdDate,
        updateFlag: req.body.updateFlag,
        insertFlag: req.body.insertFlag
    };
    sql.connect(settings.dbconfig, function (err)
    {
        if (err)
        {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else
        {
            var request = new sql.Request();
            console.log(data);
            var sql1 = "INSERT INTO Client(clientName,clientMobile,ClientEmail,ClientPassword,deviceId,phoneModel,androidVersionId,softwareVersionName,softwareVersionCode,createdBy,createdDate,updateFlag,insertFlag) values";
            sql1 += util.format("('%s','%s','%s','%s','%s','%s','%s','%s','%s','%d','%s','%d','%d')", data.clientName,
                data.clientMobile, data.clientEmail, data.clientPassword, data.deviceId, data.phoneModel, data.androidVersionId,
                data.softwareVersionName, data.softwareVersionCode, data.createdBy, data.createdDate, data.updateFlag, data.insertFlag);
            var sql2 = "SELECT clientId FROM Client WHERE clientId = SCOPE_IDENTITY();";
            var sql3 = sql1 + sql2;
            console.log(sql3);
            request.query(sql3, function (err, results)
            {
                if (err)
                {
                    console.log(err);
                    res.send("Cannot retrive records.");
                }
                else
                {
                    res.json(results);
                }
            });

        }
    });
};



exports.getfamilydetails = function (req, res)
{

    var data = {
        clientId: req.body.clientId
    };

    console.log(data);
    sql.connect(settings.dbconfig, function (err)
    {
        if (err)
        {
            console.log(err);
            res.send(500, "Cannot open connection.");
        }
        else
        {
            var request = new sql.Request();

            var query1 = "select '{\"clientId\":\"" + data.clientId + "\",\"familyMembersArray\"'+";
            var query2 = "(select top 1 a.patientId,a.patientName,c.configDescription as relationship from patientMaster a,client b,config c where b.clientId=a.FK_clientId and a.FK_relationshipId=c.cId and a.FK_clientId=" + data.clientId + "for json path)";
            var query3 = query1 + query2;
            console.log(query3);

            request.query(query3, function (err, results)
            {
                if (err)
                {
                    console.log(err);
                    res.send(500, "Cannot retrive records.");
                }
                else
                {
                    res.send(results);
                    console.log(results);
                }
            });
        }
    });
};