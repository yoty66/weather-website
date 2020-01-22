const request = require ('request');

const forcast =({latitude,
    longitude,
    location, units = 'si'}, callback)=> {

        const url  ='https://api.darksky.net/forecast/e1357644bffa888c0962e981feffe98e/'
        +`${longitude},${latitude}?units=${units}`;
        console.log(url)
        request({url , json:true}, 

            (error, response)=> {
                    if(error){
                     callback('Unable to connect to waerther service', undefined);
                    }
                    else if(response.body.error){
                     callback('Unable to find weather location', undefined)
                    }
                    else{
                        const  data = response.body;
                        const currently =  data.currently ;
                        callback(undefined,  `${data.daily.data[0].summary} .Its currently ${currently.temperature} degrees out . There is a ${currently.precipProbability}% chance of rain`)
                    }
                });



    }

    module.exports = forcast