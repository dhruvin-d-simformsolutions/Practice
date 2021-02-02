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
            console.log(body);
            callback(undefined,{
                weather_descriptions : body.current.weather_descriptions[0],
                current_temperature: body.current.temperature,
                datajson : body.location,
            });
        }    
    });
}
module.exports = forecast