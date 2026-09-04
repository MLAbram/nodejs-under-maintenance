const express = require('express')
const path = require('path')
const ejsRoutes = require('./routes/ejs')
const app = express()
const PORT = process.env.PORT || 3000

// Configure EJS as the templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Serve static assets (like the under-construction GIF)
app.use(express.static(path.join(__dirname, 'public')))

// Mount the router
app.use('/', ejsRoutes)

// Catch-all to ensure any URL routes to the maintenance page
app.use((req, res) => {
    res.redirect('/')
})

// 404 Catch-All Handler
app.use((req, res) => {
    // Log the 404 attempt so you can monitor for aggressive bot scanning
    req.logEvent('Info', `404 Not Found: ${req.originalUrl}`)
    
    // Utilize your existing redirect layout to gracefully bounce lost users
    return res.status(404).render('redirect', {
        layout: './layouts/redirect',
        page_title: 'Page Not Found | ' + process.env.COMPANY_NAME,
        navbar_title: '404 - Not Found',
        redirectSec: 3,
        redirectTo: '/',
        message: { 
            type: 'warning', 
            title: 'Lost? ', 
            message: 'That page does not exist or has been moved. Redirecting you home...' 
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})