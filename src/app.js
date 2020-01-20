const path = require('path') // no need to install it as it is a core module. basically it is from the nodejs.com website instead of the npmjs website. thats why no need install.
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname), dirname gives the currently directory youre in.
// console.log(path.join(__dirname, '../public')), path.join joins diff paths tgt, so that you can access diff directories that you want.

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const publicDirPathAbout = path.join(__dirname, '../public/about.html')
const publicDirPathHelp = path.join(__dirname, '../public/help.html')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath) )

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Caesar'
    }) // render allows you to render your views and no need file extension
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Caesar p'        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'Helppppp',
        title: 'Help Page',
        name: 'Caesarrrr'
    })
})

// app.get('', (req, res) => { // lets us configure what a server should do at a specific url
//     res.send(Data) // allows us to send something back to the requester
// }) 

//const Data = '<title><h1>Hello There</h1></title><body><h3>abc 123</h3></body>'

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Caesar',
//         age: 22
//     })
// })

// app.use('/about', express.static(publicDirPathAbout))
// app.use('/help', express.static(publicDirPathHelp))

app.get('/weather', (req, res) => {
    if (req.query.address) {

        geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {

            if (error) {
                return res.send({
                            error: error // you can just write error in short hand like below
                        })
            }
            
            // forecastData below can use the es6 shorthand method but nah jus tto show diff
            forecast(latitude, longitude, (error, forecastData) => {
        
                if (error) {
                    return res.send({ error })
                }
                
                return res.send({
                    latitude: latitude,
                    longitude: longitude,
                    forecast: forecastData,
                    temp: forecastData.temperature,
                    hourDescription: forecastData.hourUpdate
                })
        
            })
        })
    } else {
        res.send({
            error: 'Please provide an address'
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: 'No products'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: '404',
        name: 'Caesar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: '404',
        name: 'Caesar'
    })
})

app.listen(3000, () => { // starts up the server and has it listen on a specific port
    console.log('Server is up on port 3000.')
}) 


