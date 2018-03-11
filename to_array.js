//todo! see line 47!!!

var fs = require('fs');

const filepath = require('path');
 
var path = (__dirname + "/alicenode/demo/keyframes")
 
var id = [];
var content = [];
var start = [];
var history = [];
var numitems = 0;

fs.readdir(path, function(err, items) {
    for (var i=0; i<items.length; i++) {
        var file = path + '/' + items[i];

fs.stat(file, function(f) {
            return function(err, stats) {

             var birth = stats.birthtime;

//console.log(birth)

var fulldate = new Date(birth);

             var year = fulldate.getFullYear();
             var month = fulldate.getMonth();

             var day = fulldate.getDay();
             var hour = fulldate.getHours();
             var minute = fulldate.getMinutes();
             var second = fulldate.getSeconds();
             var millisecond = fulldate.getMilliseconds();

//var newdate = new Date(year, month, day, hour, minute, second, millisecond)

//console.log(newdate);
    numitems++;

        var obj = {
                "id" : "version_" + numitems,
                "content" : "sim.cpp",
                "start" : new Date(year, month, day, hour, minute, second, millisecond)
                  }
console.log(obj);

         history.push(obj)                        }
        }(file));


console.log(history);

/*
 if (i == items.length) {
    break;
 }
*/




//items.push(obj)



//console.log("item: " + items[i]);
//var now = new Date();
    //console.log(date);
      //  console.log((now));
//console.log(obj)

//var timeline_items = {}
//timeline_items = new vis.DataSet ([items]);
//history = JSON.stringify(timeline_items);


}})

;


// console.log(history);

// the json has to look like this:
//        {label: "person b", times: [{"starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
// so, // {label: "version_1", times: [{"starting_time": 1520542274303, "ending_time": 1520542275303}, ]},
