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
  getAdsByOwners,
} = require("./adsHandlers");

const {
  createConversation,
  getConversationsByAdId,
  updateConversation,
  getConverationsById,
  getConversationsByBuyerId,
} = require("./ConversationsHandlers");

const { addNewUser, getUsers, getUserById } = require("./usersHandlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // ---------------------------------
  // REST endpoints

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

  // get ads by owner
  .get("/api/ads-by-owner/:id", getAdsByOwners)

  // get user by id
  .get("/api/user/:id", getUserById)

  // create new conversation
  .post("/api/new-conversation", createConversation)

  // get conversation by conversationId
  .get("/api/conversation-by-id/:id", getConverationsById)

  // get conversations for the specific ad
  .get("/api/conversations-by-ad/:id", getConversationsByAdId)

  // get conversations for buyers
  .get("/api/conversations-by-buyers/:id", getConversationsByBuyerId)

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
