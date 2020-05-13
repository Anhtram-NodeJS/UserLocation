 var express = require('express')
 var fs = require('fs')
 var https = require('https')

 var service = express();
 var bodyParser = require('body-parser')
 service.use(bodyParser.urlencoded({ extended: false }))
 service.use(bodyParser.json())
 startService();

 var visitData = []; //array to store visit data

 service.post('/visit', function(req, res) {
   var uId =  req.body.userId;
   var name = req.body.name;
   if (!uId || !name) {
     res.statusCode = 400;
     message = "Invalid input";
   }
   else {
     var vId = generateVisitId(uId, name);
     visitData.push({userId : uId, location: name, visitId: vId})
     res.statusCode = 200;
     message = JSON.stringify({visitId: vId});
   }
   res.send(message);
 });


 service.get('/visit', function(req, res) {
   var userId =  req.query["userId"];
   var visitId =  req.query["visitId"];
   var location =  req.query["searchString"];
   res.statusCode = 200;
   res.send(JSON.stringify(searchVisitData(userId, visitId, location)));
 });


 //query with either visitId or with both userId and searchString
 function searchVisitData(userId, visitId, location) {
   if (visitId || (userId &&location)){
     for (var i = 0; i <visitData.length; i++) {
       entry = visitData[i];
       isFound = false;
       if ((visitId && entry.visitId == visitId) ||
           (userId && entry.userId == userId && location && isPartiallyMatch(location, entry.location)) ) {
         return {userId : entry.userId, name: entry.location, visitId:entry.visitId};
       }
     }
   }
   return {};
 }

 //attempt to match 2 strings, fuzzy and case insensitive
 function isPartiallyMatch(s, t) {
   sU = s.toUpperCase();
   tU = t.toUpperCase();
   if (sU.includes(tU) || tU.includes(sU)) {
     return true;
   }
   return false;
 }

 //simple random generator
 function random(min,max) {
     return (Math.floor(Math.random() * max + 1) + min);
 }

 function generateVisitId(s1, s2) {
   min = random(0, 99);
   max = random(100, 200);
   return s1+s2+random(min, max);
 }


 function startService() {
     https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
     }, service)
      .listen(3000, function () {
        console.log('Starting listener on port 3000! Go to https://localhost:3000/')
     })
 }
