const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFzZWFjOTk5OTk5IiwiYSI6ImNrNHRpMzFhcTQ1d2szbXF4NzBjZXZieG4ifQ.VQ7Q1M-znFHWMX_TFjALGQ&limit=1'

    // compare and contrast the diff between the (error, response) here and forecast.js
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location! ANother please', undefined)
        } else {
            
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            )

            
        }
    })
}

module.exports = geocode