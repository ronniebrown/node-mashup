var request = require('request');
var async = require('async');

module.exports = {
	getRestaurants: getRestaurants,
	getRestaurantByID: getRestaurantByID
}

function getRestaurants (req, res) {
	request('https://api.usergrid.com/ronnievoice/sandbox/restaurants?limit=12', function(error, response, body) {
		if(error) {
			res.send('whoops') 
		} else {
			res.send(body)
		}
	})
}

function getRestaurantByID (req, res) {
	var restID = req.swagger.params.id.value;

	async.parallel({
			restaurant: function (callback) {
				request('https://api.usergrid.com/ronnievoice/sandbox/restaurants?ql=restID=' + restID, function(error, response, body) {
					if(error) {
						res.send(error) 
					} else {
						body = JSON.parse(body);
						callback(null, body)
					}
	})
			},
			reviews: function (callback) {
				request('https://api.usergrid.com/ronnievoice/sandbox/reviews?ql=restID=' + restID, function(error, response, body) {
						if(error) {
							res.send('whoops') 
						} else {
							body = JSON.parse(body);
							callback(null, body)
						}
					})
			}
		}, function (error, results) {
			res.send(results);
		})	
}