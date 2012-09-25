# Wine Cellar Tutorial (with Node backend & Backbone Marionette)
This is based on [Backbone Wine-cellar example](https://github.com/ccoenraets/backbone-cellar) from Christophe Coenraets  but with Node.js as backend and Backbone Marionette on the frontend

## Current Status
* Server uses fake database. Restarts server to reset wine database.
* Server supports adding new wine, listing all wines, deleting wine, and updating wine
* Frontend still using pure Backbone

## Setting Up
* To install:

    `cd server`
    
    `npm install`

* To activate and to test locally:

    `node server/app.js`

* Go to `localhost:3000` on your favourite browser

## Dependencies
* `express` (tested on version 3.*)
