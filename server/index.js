"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { getListing, addNewAd, getMakes } = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // ---------------------------------
  // endpoints here

  // test
  .get("/", (req, res) => {
    res.send("Hello World");
  })

  // get all cars in the list
  .get("/api/get-listing", getListing)

  .get("/api/get-makes", getMakes)
  // add new ad
  .post("/api/new-ad", addNewAd)

  // ---------------------------------

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up the server and sets it to listen on port 8000.
  .listen(8000, console.log("listening on port 8000"));
