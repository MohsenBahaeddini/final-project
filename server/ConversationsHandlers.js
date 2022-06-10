const { v4: uuidv4 } = require("uuid");

const { MongoClient, ObjectId } = require("mongodb");
const { type } = require("os");
const { query } = require("express");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// create conversation
const createConversation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // will add date(timestamp) // actually should be added in messages object
  const { seller, buyer, buyerId, adId, messages } = req.body;
  const id = uuidv4();
  try {
    await client.connect();
    const db = client.db("mba");
    const newConversation = {
      _id: id,
      // title: title,
      seller: seller,
      buyer: buyer,
      buyerId: buyerId,
      messages: messages,
      adId: adId,
    };
    const insertConversation = await db
      .collection("conversations")
      .insertOne(newConversation);
    if (insertConversation.acknowledged) {
      res.status(200).json({
        status: 200,
        success: true,
        newConversation: newConversation,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      Error: err.message,
    });
  } finally {
    await client.close();
  }
};

// get Conversation by ID
const getConverationsById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;
  // console.log(id);
  try {
    await client.connect();
    const db = client.db("mba");
    const conversation = await db
      .collection("conversations")
      .findOne({ _id: id });
    // console.log(user);
    res.status(200).json({
      status: 200,
      success: true,
      conversation: conversation,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      Error: err.message,
    });
  } finally {
    await client.close();
  }
};

// get conversations by adId
const getConversationsByAdId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("mba");
    const findAdById = await db.collection("ads").findOne({ _id: id });
    console.log("findAdById ::", findAdById);

    const findConversationByAdId = await db
      .collection("conversations")
      .find({ adId: findAdById._id })
      .toArray();
    console.log("findConversationByAdId ::", findConversationByAdId);
    if (findConversationByAdId) {
      res.status(200).json({
        status: 200,
        success: true,
        conversations: findConversationByAdId,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "There is no message for this ad",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      Error: err.message,
    });
  } finally {
    await client.close();
  }
};

const getConversationsByBuyerId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // id will be currentuser.sub
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("mba");
    const findUser = await db.collection("users").findOne({ _id: id });

    const findUserConversations = await db
      .collection("conversations")
      .find({ buyerId: findUser._id })
      .toArray();

    if (findUserConversations) {
      res.status(200).json({
        status: 200,
        success: true,
        conversations: findUserConversations,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "this user has not asked any owner",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      Error: err.message,
    });
  } finally {
    await client.close();
  }
};

// update conversation
const updateConversation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { messages } = req.body;
  console.log("messages:", messages);
  const conversationId = req.params.id;
  const query = { _id: conversationId };
  console.log("conversationId :::", conversationId);
  console.log(query);

  try {
    await client.connect();
    const db = client.db("mba");
    const previousMessages = await db
      .collection("conversations")
      .findOne({ _id: conversationId });

    console.log("previousMessages ::", previousMessages);
    const newMessages = [...previousMessages.messages];
    newMessages.push(messages);
    console.log("newMessages :", newMessages);

    newValues = {
      $set: {
        messages: newMessages,
      },
    };

    const addNewMsg = await db
      .collection("conversations")
      .updateOne(query, newValues);

    res.status(200).json({
      status: 200,
      success: true,
      updatedConversation: addNewMsg,
      newMessages: newMessages,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      Error: err.message,
    });
  } finally {
    await client.close();
  }
};

module.exports = {
  createConversation,
  getConversationsByAdId,
  updateConversation,
  getConverationsById,
  getConversationsByBuyerId,
};
