if (process.argv.length <= 2) {
    console.log("Missing CLI arguments: \nUsage: node vc.js" + " <editor_name> (i.e. 'alicenode') <project_name> (i.e. 'demo')");
    process.exit(-1);
}
// REMEMBER TO move this script into the /editor folder, once Graham has completed restructuring the repo and fixed the code. 

//vc.js - version control for the sim.cpp state.
//much of this code lifted directly from the index.js in vr-in-vr repo

//the CLI arguments for this script are [2] the editor name (alicenode), and [3] the project's name (technically its folder's name)
var editor_name = (process.argv[2]);
var project_name = (process.argv[3]);

//const path = require('path');
const fs = require('fs-extra'); 
var util = require('util')
var fs_utils = require('fs-utils');

var exec = require('child-process-promise').exec;

var chokidar = require('chokidar'); //better than fs.watch. see http://github.com/paulmillr/chokidar for more options!

//get the path of the alicenode repo (which differs from machine to machine)
//and make sure that the keyframe and atomic commits get stored in the ~/git-in-vr/ repo instead
var index_dir = __dirname

//remove var notest when graham is finished moving code into 'editor' folder. 
var notest = index_dir.replace("/test", "");
var dirname = notest.replace("alicenode", "git-in-vr");

var project_path = (dirname + "/" + editor_name + "/" + project_name + "/");

var state = (__dirname + "/sim.cpp");
var sim_state = fs_utils.readFileSync(state);

//console.log(__dirname);
console.log("State saves will be made to:    " + project_path);

var child;
var child2;
var child3;
var child4;
var child5;
var child6; // child process for creating branches
var child7; //child process for switching branches
var child_hash;


/*
function fs.pathExists(project_path, (err, exists)) => {

console.log(err)
console.log(exists)
  		
  	}

		fs.ensureDirSync(project_path);
		fs.ensureDirSync(project_path + "/keyframes")
		fs.writeFileSync(project_path + "/state.json", sim_state);
		fs.writeFileSync(project_path + "/keyframes/" + utc + "_key_" + "state.json", sim_state);

*/

// Example of a more typical implementation structure:

// Initialize watcher.
var watcher = chokidar.watch(state, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

// Something to use when events are received.
var log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', path => log(`File ${path} has been added`)


  	)
  .on('change', path => {
 // 	console.log("-------------");
	//var utc = Date.now();
	//var commit_msg = ("atomic commit " + utc);
var utc = Date.now();

	fs.ensureDir(project_path)

//.then(() => {
//save VR state to a json in the git-in-vr repo 
  fs.writeFileSync(project_path + "/state.cpp", sim_state);
//Also, make a keyframes folder where whole states will be saved along with UTC timestamp
  fs.ensureDir(project_path + "/keyframes")
  		//.then(() => {
//duplicate this as a keyframe (for now) in /keyframes/ <<Doing this because for now its 
//easier to construct two different patchers in max from the two respective states, than it 
//is to construct the same two patches from a diff generated by git. 
  			fs.writeFileSync(project_path + "/keyframes/" + utc + "_key_" + "state.cpp", sim_state);

  			//fs.writeFileSync(project_path + "/commits.json", "utc_hash: " + );
  			})
//commits.json is where utc:commit-hashes will be added each time as key-value. 
//  if (fs.existsSync(project_path + "/commits.json")) {
  	//console.log("test");
  	//then read the file. (find the cmd for that)
//  }
//  else 
//	fs.writeFileSync(project_path + "/commits.json", "utc_hash:");
	
//})
//.catch(err => {
  //console.error(err)
//}
//)
/*
//git: add the newly saved state.json and keyframe (if there is one)
exec('git add .', {cwd: project_path})
    
	//after we add the new files, commit them
    .then(function (result) {
        child3 = exec("git commit -m \"" + "atomic " + utc + "\"", {cwd: project_path});

    })
        
        .then(function (result) {
        child = exec("git log --pretty=format:'%h' -n 1", {cwd: project_path}, (error, stdout, stderr) => {
        	console.log("\nCommit hash: " + stdout + "\n");


        	//prep the new state to include the commit hash
        	var hash = (stdout);
        	sim_state.commit_hash = (hash);
        	new_state = JSON.stringify(state);
        	
        	//send the state over to max where it populates the [p scene] subpatcher 
			//with the vr-box (and eventually vr-line)
		//	ws.send(new_state);
	        })
         })
        	.then(function (result) {
        		child4 = exec("git status", {cwd: dirname}, (error, stdout, stderr) => {
        		child5 = exec("git log --pretty=oneline > " + dir + "/history.txt", {cwd: dirname}); 

        		var git_status = (stdout.slice(60));
        		var git_status2 = git_status.substr(0,git_status.indexOf(' '));
	        	//var gitstatus = (git_status.substring(0, git_status.lastIndexOf("_")));


	       		console.log(git_status2 + " atomic commits collected this session.");

        	})   
    });



})

*/



/*
///////////////////////

//check to see if a folder matching this .maxpat's name already exists in the git-in-vr states directory
function make_path(){
fs.pathExists(project_path, (err, exists) => {

	//if it does, then ignore this .maxpat, and inform the user. Future: maybe have a prompt here that lets them decide
	//to overide this? 
	if (exists == true) {
		console.log("\n\nWARNING: maxpat already exists in git-in-vr directory, not instantiating. \nTry another .maxpat, or rename the maxpat, or (last resort) remove the folder named: \n\n" + newdir)
	
		//warn editor_scripting_node that this maxpat already has been used...
		ws.send("error: selected max patch filename already in use by vr-editor");

		}




		//if it doesn't exist yet, make a folder for it in ~/states, populate that with the JSON state data, and do a keyframe commit. 

		else if (exists == false) {
				
		fs.ensureDirSync(project_path)
		fs.ensureDirSync(project_path + "/keyframes")
		fs.writeFileSync(project_path + "/state.json", state_json);
		fs.writeFileSync(project_path + "/keyframes/" + utc + "_key_" + "state.json", state_json);
		console.log("NOTE: directory for " + name + " created at " + project_path)

		//git: add the newly saved state.json and keyframe
		exec('git add .', {cwd: dirname})
		    
			//after we add the new files, commit them
		    .then(function (result) {
		        child3 = exec("git commit -m \"" + commit_msg + "\"", {cwd: dirname});

		    })
			        
		        .then(function (result) {
		        child = exec("git log --pretty=format:'%h' -n 1", {cwd: dirname}, (error, stdout, stderr) => {
		        	console.log("\nCommit hash: " + stdout + "\n");


		        	//prep the new state to include the commit hash
		        	var commit = JSON.parse(state_json);
		        	commit.commit_hash = (stdout);
		        	new_state2 = JSON.stringify(commit);
		        	
		        	//send the state over to max where it populates the [p scene] subpatcher 
					//with the vr-box (and eventually vr-line)
					ws.send(new_state2);
			        })
			    })
	        	
	        	.then(function (result) {
	        		child4 = exec("git status", {cwd: dirname}, (error, stdout, stderr) => {
	        			
	        			var git_status = (stdout.slice(60, 64));
	        			//var gitstatus = (git_status.substring(0, git_status.lastIndexOf("_")));


	        			console.log(git_status + " atomic commits collected this session.");
	        			child5 = exec("git log --pretty=oneline > " + project_path + "/history.txt", {cwd: dirname}); 

			        	})   
			    });

			}
				})};


*/


	

	