/*
Needed imports
*/
const request = require('request');
const express = require('express');
const path = require('path');
/*
Creating expresss object and setting port constant variable
*/
const app = express()
const port = 3000

// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/*
JSON format used for request and url settings
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*
Creation of request to dataservice accuweather
---
GET request
*/
app.get('/sendWeatherAPI', (req, res) => {
    var options = {
        'method': 'GET',
        'url': 'http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationKey=115295&apikey=cdf0KORpdizmmWToY7AkI9hA0r6eQo92',
        'headers': {
        }
      };
    /*
    Getting values from GET request
    ---
    defining varaibles and obtaining data from JSON.
    */
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        const obj = JSON.parse(response.body);
        var weather = obj[0].WeatherText;
        var temp = obj[0].Temperature.Metric.Value;
        var degrees = obj[0].Temperature.Metric.Unit;
        var time = obj[0].LocalObservationDateTime;
        console.log(weather);
        // res.send(weather);
        res.render('weather', { title: 'Weather App', weather: weather, temp: temp, degrees: degrees, time: time })
      });
})
/*
Application
---
Define view and log results into console
*/
app.get('/', (req, res) => {
    // var weather = "Partially Cloudy";
    //res.send(weather);
    res.render('index', { title: 'Weather App'})
  })
  /*
  Logging information into console and generating URL
  */
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

