var http = require('http')

 
    //Print the weather
var printMessage = function (city, weather) {
    var message = 'The current weather in ' + city + ' is ' + weather + '.';
    console.log(message);
}

    //Error function to pass to http calls
var printError = function (error) {
    console.error(error);
}



function get(zip) { 

    function WeatherReport (zipToRun) {
        this.weatherObject = {};
        this.apiKey = 'dc3500ba3bd873132ffb65d78684665e';
        this.zip = zipToRun;
    }



    //Connect to API
    //Gather data
    //Parse data

    WeatherReport.prototype.startRequest = function () {
        var request = http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + this.zip + ',us&appid=' + this.apiKey, function (response) {
            var body = ''

            response.on('data', function(d) {
                body += d;
            })

            response.on('end', function () {
                if (response.statusCode === 200) {
                    try {
                        this.weatherObject = JSON.parse(body);
                        printMessage(this.weatherObject.name, this.weatherObject.weather[0].description);
                    } catch (error) {
                        printError(error);
                    }   
                } else {
                    printError({message: 'There was an error getting the data for  ' + this.zip + '. (' + http.STATUS_CODES[response.statusCode] + ')'});
                }
            })
        })
        //connection error
        request.on('error', printError);
    }

report = new WeatherReport(zip);
report.startRequest();

}

module.exports.get = get;

