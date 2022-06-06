"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { addNewAd, getAds, getAd, deleteAd, updateAd } = require("./handlers");

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

  // get all ads
  .get("/api/ads", getAds)
  // get a specific ad
  .get("/api/ad/:id", getAd)
  // add new ad
  .post("/api/new-ad", addNewAd)
  // update ad
  .patch("/api/update-ad/:id", updateAd)
  // delete ad
  .delete("/api/delete-ad/:id", deleteAd)
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
