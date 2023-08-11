// import required packages and modules
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');

// create the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// create the Handlebars.js engine object with custom helpers
const hbs = exphbs.create({helpers});
// set up handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set up session
const sess = {
    secret: 'Super secret stylish secret stored in secret',
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// add middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use(routes);

// establish connection with the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Your app is now listening on port ${PORT}`));
}
);