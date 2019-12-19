const path = require('path')
const hbs = require('hbs')
const express = require('express')
require('./db/mongoose')

// /*
//  * ROUTERS
//  */
// const contactUsRouter = require('./unused/contactus')

// // user-related
// const portalRouter = require('./unused/portal')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup and serve static directories
app.use(express.static(publicDirPath))

// Serve pages
app.use(express.json())
app.use(require('./routers/index'))
app.use(require('./routers/assistance'))
app.use(require('./routers/events'))
app.use(require('./routers/account-user'))
app.use(require('./routers/task'))

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found'
    })
})

// Start server
app.listen(port, () => {
    console.log('Server is up on port', port)
})

//Must install hbs with npm
//To do so, do npm -i hbs
//To download express.js, do npm -i express