const request =require('request');


// function convert (Farenhiet)
// {
// 	var celsius = Farenhiet - 32;
// 	celsius = celsius/1.8;
// 	celsius = Math.round(celsius);
// 	return celsius;

// }


var getWeather = (lat, lng, callback) => {
request ({
	url: `https://api.darksky.net/forecast/1888ea10d69f1a2cd8a4b3554fa1942e/${lat},${lng}`,
	json: true
}, (error,response,body) => {
	if (!error && response.statusCode===200 )
	{
		callback(undefined,{
			Temprature: body.currently.temperature,
			apparentTemperature: body.currently.apparentTemperature
		});
	
	}
	else {
		callback('Unabale to connect')
	}

}); 
};

module.exports.getWeather=getWeather;