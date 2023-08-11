// import sequelize
const Sequelize = require('sequelize');

// import dotenv
require('dotenv').config();

// create connection to our db
let sequelize;

// if the app is running on Heroku, use the Heroku database
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // otherwise, use the local database
    sequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PW, 
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        });
}