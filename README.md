# NTNU-plantmanager

> This is the final repository for a plant manager project.

[Frontend repository of this project](https://github.com/jostein-tollefsrud/NTNU-plantmanager-frontend)

## Table of contents

-   [General info](#general-info)
-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Contact](#contact)

&nbsp;

## General info

The department of design needs an administrative tool to monitor the state of the
plants and its health. This project takes care of both backend API and the frontend.

&nbsp;

## Technologies

-   bcrypt - version 5.0.1
-   cors - version 2.8.5
-   dotenv - version 8.2.0
-   express - version 4.17.1
-   mongoose - version 5.12.3
-   passport - version 0.4.1
-   passport-jwt - version 4.0.0
-   swagger-jsdoc - version 6.0.1
-   swagger-ui-express - version 4.1.6
-   jsdoc - version 3.6.6
-   nodemon - version 2.0.7

&nbsp;

## Setup

This express application requires a `.env` file. In the root of the backend folder, create a `.env` file and put the following into it:

```
NODE_ENV=development
DB_STRING=mongodb://localhost:27017/plant-manager
DB_STRING_PROD=<your production database string>
PRIVATE_KEY=thisIsTheSupersecretKey

KEY_ID=AKIA5VX4Z22MJTUVZBRR
SECRET=VHuudSut4qhUa6q1EnSYEyXL+GKZTo1fNRiyxNx4
```

You need to run both Mongo DB Compass and MongoDB Community Edition.

[Download MongoDB Community Edition from here](https://docs.mongodb.com/manual/administration/install-community/).

```
# Install all the dependencies needed to run this application in both the frontend folder and the backend folder
$ npm install

# Run the seeder from the backend directory to insert users and plants
$ node seederScript.js

#
# Start 2 terminals and do the following:
#

# Start the Express server from the backend folder (http://localhost:5000)
$ nodemon app.js

# Start the React app from the front end folder
$ npm run start
```

The users all have the same password (Password123)

-   Ola Nordmann - ola@email.com (manager)
-   Kari Nordmann - kari@email.com (gardener)
-   Nils Nordmann - nils@email.com (user)

&nbsp;

## Contact

Created by [Jostein Tollefsrud](https://github.com/jostein-tollefsrud)
and [Ida Therese Hongset Trøan](https://github.com/Idahpews)

Feel free to contact us!

