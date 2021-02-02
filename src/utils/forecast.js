const request = require('request');
const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=388dbff5bc20d415dd501e507afc695e&query='+latitude+','+longitude+'&units=f';
    
    request({url,json: true},(error, {body}) => {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        }    
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else {
            // const data = JSON.parse(response.body);
            callback(undefined,`It is look like ${body.current.weather_descriptions[0]} Outside`);
            console.log("Temperature : ",body.current.temperature," But it's feel like ",body.current.feelslike);
        }    
    });
}
module.exports = forecast