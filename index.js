const express = require('express');
const path = require('path');
const ejsRoutes = require('./routes/ejs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets (like the under-construction GIF)
app.use(express.static(path.join(__dirname, 'public')));

// Mount the router
app.use('/', ejsRoutes);

// Catch-all to ensure any URL routes to the maintenance page
app.use((req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});