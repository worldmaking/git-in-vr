//todo! see line 47!!!

var fs = require('fs');

const filepath = require('path');
 
var path = (__dirname + "/alicenode/demo/keyframes")
 

fs.readdir(path, function(err, items) {
    for (var i=0; i<items.length; i++) {
        var file = path + '/' + items[i];
 

console.log(i);
//var now = new Date();
    //console.log(date);
      //  console.log((now));

        //console.log("Start: " + file);
        fs.stat(file, function(f) {
            return function(err, stats) {

           

    var filename = filepath.basename(f);
    var name = (filename.substring(filename.lastIndexOf("/")));
    var name2 = (filename.substring(0, filename.lastIndexOf(".")));
    var name3 = (name2.substring(0, name2.lastIndexOf("_")));
    var name4 = (name3.substring(0, name3.lastIndexOf("_")));
              //console.log(f); 
              console.log(Number(name4)); 

             var birth = stats.birthtime;

             var fulldate = new Date(birth);

             var year = fulldate.getFullYear();
             var month = fulldate.getMonth();

             var day = fulldate.getDay();
             //evenutally the hash
             var vis_date = (year + "-" + month + "-" + day)
              // console.log({id: name4, content: name, start: vis_date}) ;       
                       
var obj = {id: name4, content: name, start: vis_date, type: "point"}
//figure out how to push the obj into the var items as seen in 'vc.html'
                        }
        }(file));
    }
});


// the json has to look like this:
//        {label: "person b", times: [{"starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
// so, // {label: "version_1", times: [{"starting_time": 1520542274303, "ending_time": 1520542275303}, ]},
