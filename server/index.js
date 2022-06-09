"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  addNewAd,
  getAds,
  getAd,
  deleteAd,
  updateAd,
  addNewUser,
  getUsers,
  addMsg,
  getMessages,
  getAdsByOwners,
  getUserById,
  createConversation,
  getConversationsByAdId,
  updateConversation,
} = require("./handlers");

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

  // get all users
  .get("/api/users", getUsers)
  // add user
  .post("/api/new-user", addNewUser)

  // add new message
  .post("/api/new-msg", addMsg)

  // get all messages
  .get("/api/messages", getMessages)

  // get ads by owner
  .get("/api/ads-by-owner/:id", getAdsByOwners)

  // get user by id
  .get("/api/user/:id", getUserById)

  // create new conversation
  .post("/api/new-conversation", createConversation)

  // get conversations for the specific ad
  .get("/api/conversations-by-ad/:id", getConversationsByAdId)

  // update conversation
  .patch("/api/update-conversation/:id", updateConversation)
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
