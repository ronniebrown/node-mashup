var request = require('request');

module.exports = {
  getHotels: getHotels
}

function getHotels (req, res) {
  var location = req.swagger.params.location.value;

  request('http://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=true', function (error, response, body) {
    var coords = {
      'lat': JSON.parse(body).results[0].geometry.location.lat,
      'lon': JSON.parse(body).results[0].geometry.location.lng
    }
    
    request('http://terminal2.expedia.com/ews/rest/hotel/v1/search?format=json&key=ch6wK6mAy9y6A0dwO08pmMWEDpGk5zUQ&location=' + coords.lat + ',' + coords.lon + '&radius=5mi', function(error, response, body) {
    res.send(body);
  }); 
  });

  
}