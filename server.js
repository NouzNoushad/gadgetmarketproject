const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');

dotenv.config({ path: './config/.env' });
const { connectDB }= require('./config/db');
connectDB();

const app = express();

const createProducts = require('./routes/products');

//Port
const PORT = process.env.PORT || 9000;

require('./config/auth/passportAuth.js')(passport);

//ejs engine
app.set('view engine', 'ejs');

//Middlewares
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    
    //static folder
    app.use(express.static('public'));
}

//session
app.use(session({
    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


//Routes
app.use('/products', createProducts);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));
