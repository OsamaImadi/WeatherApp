
const yargs = require('yargs');
const axios = require('axios');



const argv = yargs
.options({
	a: {
		demand: true,
		alias: 'address',
		describe:' Address to fetch weather for',
		string: true
	}
})
.help()
.alias('help','h')
.argv;

function convert (Farenhiet)
{
	var celsius = Farenhiet - 32;
	celsius = celsius/1.8;
	celsius = Math.round(celsius);
	return celsius;

}

var celsiusTemprature;
var celsiusApparentTemprature;
var addressKey = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=AaRK24xJjIIuEXHr2QcGKn9FGNZynzIN&location=${addressKey}`;

axios.get(geocodeUrl).then((response)=>{
	if(response.data.statuscode===0){
		throw new Error('Unable to find');
	}

	var lat= response.data.results[0].locations[0].latLng.lat;
	var lng= response.data.results[0].locations[0].latLng.lng;
	var WeatherUrl = `https://api.darksky.net/forecast/1888ea10d69f1a2cd8a4b3554fa1942e/${lat},${lng}`;

	console.log('address: ', response.data.results[0].providedLocation.location);
	return axios.get(WeatherUrl);
}).then((response)=>{
	var temprature = response.data.currently.temperature;
	celsiusTemprature = convert(temprature);
	var apparentTemprature=response.data.currently.apparentTemperature;
	celsiusApparentTemprature = convert(apparentTemprature);
	console.log(`Temprature: ${celsiusTemprature}. feels like: ${celsiusApparentTemprature}.`);

}).catch((e)=>{
	if(e.code=='ENOTFOUND'){
		console.log('Failed');
	}
	else
	{
		console.log(e.message);
	}
});