
const yargs = require('yargs');


const geocode = require('./geocode/geocode');
const getForecast = require('./Forecast/Forecast');


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


geocode.geocodeAddress(argv.address, (errorMessage, results)=>{
 if(errorMessage){
 	console.log(errorMessage);
 }
 else{
 	console.log(results.address);

	getForecast.getWeather(results.latitude,results.longitude,
		(errorMessage,WeatherResults)=>{
		if(errorMessage){
 			console.log(errorMessage);
 		}
 		else{
 			console.log(`Temprature: ${convert(WeatherResults.Temprature)}. feels like: ${convert(WeatherResults.apparentTemperature)}.`);
 		}
	});
 }
});
