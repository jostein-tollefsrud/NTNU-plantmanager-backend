# Plant Manager - Backend

> This is the backend for a plant manager project.

[GitHub repo of this project](https://github.com/jostein-tollefsrud/fullstack-plantmanager-backend)

## Table of contents

-   [General info](#general-info)
-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Features](#features)
-   [Status](#status)
-   [Inspiration](#inspiration)
-   [Contact](#contact)

&nbsp;

## General info

The department of design needs an administrative tool to monitor the state of the
plants and its health. This project takes care of the backend API. In this project we only setup for users, not the plants.

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

This express application requires a `.env` file. In the root of the project, create a `.env` file and put the following into it:

```
NODE_ENV=development
DB_STRING=mongodb://localhost:27017/plant-manager
DB_STRING_PROD=<your production database string>
PRIVATE_KEY=<super secret key here>
```

You need to run both Mongo DB Compass and MongoDB Community Edition. 

[Download MongoDB from here](https://www.mongodb.com/try/download/compass).

[Download MongoDB Community Edition from here](https://docs.mongodb.com/manual/administration/install-community/).

```
# Install all the dependencies needed to run this application
$ npm install

# Start the Express server (http://localhost:5000)
$ nodemon app.js
```

&nbsp;

## Code Examples

Show examples of usage:
`put-your-code-here`

&nbsp;

## Features

List of features ready and TODOs for future development

-   Awesome feature 1
-   Awesome feature 2
-   Awesome feature 3

To-do list:

-   Wow improvement to be done 1
-   Wow improvement to be done 2

&nbsp;

## Status

Project is: _in progress_, _finished_, _no longer continue_ and why?

&nbsp;

## Inspiration

Add here credits. Project inspired by..., based on...

&nbsp;

## Contact

Created by [Jostein Tollefsrud](https://github.com/jostein-tollefsrud)
and [Ida Therese Hongset Trøan](https://github.com/Idahpews)

Feel free to contact us!
