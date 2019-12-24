const path = require('path')
const hbs = require('hbs')
const express = require('express')
const cookieParser = require('cookie-parser')
require('./db/mongoose')

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
app.use(cookieParser())

// Serve pages
app.use(express.json())
app.use(require('./routers/index'))
app.use(require('./routers/assistance'))
app.use(require('./routers/portal'))
app.use(require('./routers/account-sign')) // has to be after portal
app.use(require('./routers/events'))
app.use(require('./routers/task'))
app.use(require('./routers/contact-us')) // TODO

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found'
    })
})

// Start server
app.listen(port, () => {
    console.log('Server is up on port', port)
})
