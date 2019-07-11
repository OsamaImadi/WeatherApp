const request =require('request');

var geocodeAddress = (Address) => {
	return new Promise ((resolve, reject)=>{
		var addressKey = encodeURIComponent(Address);

request ({
	url: `http://www.mapquestapi.com/geocoding/v1/address?key=AaRK24xJjIIuEXHr2QcGKn9FGNZynzIN&location=${addressKey}`,
	json: true
}, (error,response,body) => {
	if (error)
	{
		reject('Unabale to connect')
	}
	else if (body.info.statuscode===400)
	{
		reject('Unable to locate');
	}
	else if(body.info.statuscode===0)
	{
		resolve({
			address: body.results[0].providedLocation.location,
			latitude: body.results[0].locations[0].latLng.lat,
			longitude: body.results[0].locations[0].latLng.lng 
		});
	}
});
	});
};

geocodeAddress('19146').then((location)=>{
	console.log(JSON.stringify(location, undefined, 2));
},(errorMessage)=>{
	console.log(errorMessage);
});
