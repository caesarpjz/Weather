const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/06f871f5622c4cfa5a986cf33be6fb44/' + latitude + ',' + longitude + '?units=si'

    // the shorthand method can access deeper, nested things using the method below
    request({ url: url, json: true}, (error, { body: {currently, hourly}, error:error2 } = {}) => {
        //const body = response.body

        if (error) {
            callback('Network issues', undefined)
        } else if (error2) {
            callback('Wrong coordinates', undefined)
        } else {
            callback(undefined, {
                summary: currently.summary,
                temperature: currently.temperature,
                precipitationProb: currently.precipProbability,
                hourUpdate: hourly.summary
            })
        }
    })
}

module.exports = forecast