const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware setup
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '/public')));

// Route setup
const routes = [
    { path: '/', route: './routes/root' },
    { path: '/register', route: './routes/register' },
    { path: '/auth', route: './routes/auth' },
    { path: '/refresh', route: './routes/refresh' },
    { path: '/logout', route: './routes/logout' }
];

routes.forEach(({ path, route }) => app.use(path, require(route)));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

// 404 handler
app.all('*', (req, res) => {
    res.status(404);
    const response = req.accepts(['html', 'json', 'txt']);
    if (response === 'html') {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (response === 'json') {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));