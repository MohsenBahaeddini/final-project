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

// check the specified user when signed in by auth0 , if new add it to users collection
const addNewUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // const _id = uuidv4();
  
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

module.exports = {
  addNewUser,
  getUsers,
  getUserById,
};
