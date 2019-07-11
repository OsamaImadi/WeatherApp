//DasrkSky secret key 1888ea10d69f1a2cd8a4b3554fa1942e
const request =require('request');

var geocodeAddress = (Address, callback) => {
var addressKey = encodeURIComponent(Address);

request ({
	url: `http://www.mapquestapi.com/geocoding/v1/address?key=AaRK24xJjIIuEXHr2QcGKn9FGNZynzIN&location=${addressKey}`,
	json: true
}, (error,response,body) => {
	if (error)
	{
		callback('Unabale to connect')
	}
	else if (body.info.statuscode===400)
	{
		callback('Unable to locate');
	}
	else if(body.info.statuscode===0)
	{
		callback(undefined, {
			address: body.results[0].providedLocation.location,
			latitude: body.results[0].locations[0].latLng.lat,
			longitude: body.results[0].locations[0].latLng.lng 
		})
	}
});
};

module.exports.geocodeAddress=geocodeAddress;