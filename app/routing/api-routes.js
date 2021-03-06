// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData 	= require('../data/friends.js');
// var waitListData 	= require('../data/waitinglist-data.js');
// var path 			= require('path');




// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// In each of the below cases when a user visits a link 
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table) 
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.json(friendsData);
	});

	// app.get('/api/waitlist', function(req, res){
	// 	res.json(waitListData);
	// });

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){

		var newUser = req.body;
        var differences = [];
        if (friends.length < 1) {
            console.log("unable to do calculation; not enough users");
        } else {
            compareFriends(friends, newUser, differences);
            var lowest = differences[0];
            for (var i = 0; i < differences.length; i++) {
                if (differences[i] < lowest) {
                    lowest = differences[i];
                }
            };
            var bestMatch = differences.indexOf(lowest);
            res.send(friends[bestMatch]);
        };
        friends.push(newUser);
	});


	function compareFriends(friends, newUser, differences) {
	    var curUserIndex = 0;
	    while (curUserIndex < friends.length) {
	        var totalDifference = 0;
	        for (var i = 0; i < newUser.scores.length; i++) {
	            totalDifference += Math.abs(parseInt(friends[curUserIndex].scores[i]) - parseInt(newUser.scores[i]));
	        }
	        differences.push(totalDifference);
	        curUserIndex++;
	    }
	}


}