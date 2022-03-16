/**
 * @file app.js is the root file for this express API
 * @author Jostein Tollefsrud
 * @author Ida Therese Hongset Trøan
 * @see <a href="https://github.com/jostein-tollefsrud/fullstack-plantmanager-backend" target="_blank">GitHub repo of this project</a>
 */

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const PORT = process.env.PORT || 5000;

/**
 * -------------- SWAGGER SETUP ----------------
 */

// Configure Swagger for documenting the API
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Plant Manager API',
            version: '1.0.0',
            description: 'Express API for Plant Manager',
            contact: {
                name: 'Jostein Tollefsrud',
                email: 'josteot@stud.ntnu.no',
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Server for testing',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsDoc(swaggerOptions);

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();
app.use(cors());

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Must first load the models
require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));

// Upload Image
app.use(express.static('../frontend/public/images'));

// Swagger documentation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

/**
 * -------------- SERVER ----------------
 */

// Server listening on http://localhost:5000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
