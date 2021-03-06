const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;
var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engin', 'hbs')


app.use((request, response, next) => {
    var now = new Date().toString()
    var log = (`${now} ${request.method} ${request.url}`)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) { 
            console.log('Unable to append file')
        }
    })
    //Middle ware has to call next or nothing else will be called 
    next()
})
// app.use((request, response, next) => {
//     response.render('maintenance.hbs', {
//         pageTitle: 'maintenance',
//     })
// })

app.use(express.static(__dirname + '/public'))

//Handlebars Healpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        // currentYear: new Date().getFullYear()
    })
})

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    })
})

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Project Directory',
    })
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'An Error has occured',
        
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})