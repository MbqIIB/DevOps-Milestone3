var http = require('http');
var os = require('os');
var fs = require('fs');

var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1', {});

 var accountSid = '--'; //token
var authToken = '------';  //token
var twiClient = require('twilio')(accountSid, authToken);
function memoryLoad()
{
  var total = os.totalmem();
  var load = os.totalmem() - os.freemem();
  var percentage = (load/total)*100;
  return percentage.toFixed(2);
}

function cpuLoadAll () {
  var loads = os.loadavg();
  var percentage = loads[0];
  percentage = percentage * 100;
  return percentage.toFixed(2);;
}

setInterval( function () 
{
  var memLoad = memoryLoad();
  var cpuLoad = cpuLoadAll();
  console.log("Memory utilization: ", memLoad);
  console.log("CPU usage: ", cpuLoad*10);

  if (memLoad > 90) {

  twiClient.messages.create({
        from:+2024369391,
        to: +9842426510,
        body: "Application Live alert! Memory overload."
        }, function(err, message) {
      if(err) {
    console.error(err.message);
    }
});
  console.log("ALERT! Memory overload. SMS notification sent");
  } 

  if (cpuLoad > 60) {
    //console.log("ALERT! CPU overload. SMS notification sent");
    twiClient.messages.create({
        from:+2024369391,
        to: +9842426510,
        body: "Application Live alert! CPU usage exceeding the threshold."
        }, function(err, message) {
      if(err) {
    console.error(err.message);
    }
    console.log("ALERT! CPU overload. SMS notification sent");
});
  }

},2000);
