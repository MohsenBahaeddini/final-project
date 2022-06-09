// use this package to generate unique ids: https://www.npmjs.com/package/uuid
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

// get all ads in db
const getAds = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const page = req.query.page;
    const limit = 20;
    await client.connect();
    const db = client.db("mba");

    const findAds = await db
      .collection("ads")
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    // console.log(findAds);
    const count = await db.collection("ads").countDocuments();

    res.status(200).json({
      status: 200,
      success: true,
      count,
      ads: findAds,
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

// get a specific ad by id
const getAd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const adId = req.params.id;
  // console.log(req);
  try {
    await client.connect();
    const db = client.db("mba");
    const findSingleAd = await db.collection("ads").findOne({ _id: adId });
    res.status(200).json({
      status: 200,
      success: true,
      ad: findSingleAd,
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

// add new ad to db
const addNewAd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // will add user info once signin is done or check signed in with another function
  // should be able to get images as well
  const { owner, type, make, model, year, mileage, price } = req.body;
  const newAdId = uuidv4();
  if (!type || !make || !year || !mileage || !model || !price) {
    res.status(400).json({
      status: 400,
      error: "at least one info is missing",
    });
  }
  try {
    await client.connect();
    const db = client.db("mba");

    const newAd = {
      owner: owner,
      _id: newAdId,
      type: type,
      make: make,
      year: year,
      model: model,
      mileage: mileage,
      price: price,
    };
    const insertNewAd = await db.collection("ads").insertOne(newAd);
    if (insertNewAd) {
      res.status(200).json({
        status: 200,
        success: true,
        newAd: newAd,
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

// update an ad
const updateAd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // will probably add user info , etc to be updatable
  const { type, make, year, model, mileage } = req.body;
  console.log(req.body);
  const adId = req.params.id;
  const query = { _id: adId };
  try {
    await client.connect();
    const db = client.db("mba");

    const previousValues = await db.collection("ads").findOne(query);
    console.log("previousValues : ", previousValues);

    const newValues = {
      $set: {
        type: type || previousValues.type,
        make: make || previousValues.make,
        year: year || previousValues.year,
        model: model || previousValues.model,
        mileage: mileage || previousValues.mileage,
      },
    };
    console.log(newValues);
    const updateAd = await db.collection("ads").updateOne(query, newValues);
    res.status(200).json({
      status: 200,
      success: true,
      updatedAd: updateAd,
      modified: updateAd.modifiedCount,
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

// delete an ad
const deleteAd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const adId = req.params.id;
  try {
    await client.connect();
    const db = client.db("mba");

    const ad = await db.collection("ads").deleteOne({ _id: adId });
    res.status(200).json({
      status: 200,
      success: true,
      deletedAd: ad,
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

// check the specified user when signed in by auth0 , if new add it to users collection
const addNewUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // const _id = uuidv4();
  // will add other user info later
  const { sub, name, email } = req.body;
  try {
    await client.connect();
    const db = client.db("mba");
    const findUserInDB = await db.collection("users").findOne({ email: email });

    if (findUserInDB) {
      return console.log("user already exists");
    }
    if (!findUserInDB) {
      const newUser = {
        // removed _id: email
        _id: sub,
        sub: sub,
        email: email,
        name: name,
      };

      const insertUser = await db.collection("users").insertOne(newUser);
      if (insertUser) {
        res.status(200).json({
          status: 200,
          success: true,
          newUser: newUser,
        });
      }
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

// get all users
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("mba");
    const getAllUsers = await db.collection("users").find().toArray();
    res.status(200).json({
      status: 200,
      success: true,
      users: getAllUsers,
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

// get a specific  user
const getUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;
  console.log(id);
  try {
    await client.connect();
    const db = client.db("mba");
    const user = await db.collection("users").findOne({ _id: id });
    console.log(user);
    res.status(200).json({
      status: 200,
      success: true,
      user: user,
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

// add new message to db
// const addMsg = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   const { message, sender, receiver, adId, conversationId } = req.body;
//   try {
//     await client.connect();
//     const db = client.db("mba");
//     const newMessage = {
//       _id: adId,
//       message: message,
//       sender: sender,
//       receiver: receiver,
//       adId: adId,
//       conversationId: conversationId,
//     };
//     const insertNewMessage = await db
//       .collection("messages")
//       .insertOne(newMessage);
//     if (insertNewMessage) {
//       res.status(200).json({
//         status: 200,
//         success: true,
//         insertNewMessage: insertNewMessage,
//         newMessage: newMessage,
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       Error: err.message,
//     });
//   } finally {
//     await client.close();
//   }
// };

// get all messages in db
// const getMessages = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   try {
//     await client.connect();
//     const db = client.db("mba");
//     const getAllMessages = await db.collection("messages").find().toArray();
//     res.status(200).json({
//       status: 200,
//       success: true,
//       messages: getAllMessages,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       Error: err.message,
//     });
//   } finally {
//     await client.close();
//   }
// };

// get ads by owner
const getAdsByOwners = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // userId like _id:"google-oauth2|115624167694773099675"
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("mba");

    const findUser = await db.collection("users").findOne({ _id: id });
    // console.log("findUser ::", findUser);

    const findUserAds = await db
      .collection("ads")
      .find({ owner: findUser.email })
      .toArray();
    // console.log(findUserAds);

    if (findUserAds) {
      res.status(200).json({
        status: 200,
        success: true,
        ads: findUserAds,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "this user does not have any ads",
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

// create conversation
const createConversation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // will add date(timestamp) // actually should be added in messages object
  const { seller, buyer, adId, messages } = req.body;
  const id = uuidv4();
  try {
    await client.connect();
    const db = client.db("mba");
    const newConversation = {
      _id: id,
      // title: title,
      seller: seller,
      buyer: buyer,
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
// NOT SURE IF NEED THIS ONE
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

// update conversation
// cannot patch ... ?!!
const updateConversation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { messages } = req.body;
  console.log(messages);
  const conversationId = req.params.id;
  const query = { _id: conversationId };
  console.log(conversationId);
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
  addNewAd,
  getAds,
  getAd,
  deleteAd,
  updateAd,
  addNewUser,
  getUsers,
  // addMsg,
  // getMessages,
  getAdsByOwners,
  getUserById,
  createConversation,
  getConversationsByAdId,
  updateConversation,
};
