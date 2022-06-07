// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.

// const { flights, reservations } = require("./data");
const { MongoClient } = require("mongodb");
const { type } = require("os");

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
    await client.connect();
    const db = client.db("mba");

    const findAds = await db.collection("ads").find().toArray();
    // console.log(findAds);
    res.status(200).json({
      status: 200,
      success: true,
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

// get a specific ad
const getAd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const adId = req.params.id;
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

// get ads for the specified user
const getAdByOwner = async(req,res)=>{
  const client = new MongoClient(MONGO_URI, options);
try{}catch{}finally{}
}


// add new ad to db
const addNewAd = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // will add user info once signin is done or check signed in with another function
  // should be able to get images as well
  const { owner, type, make, model, year, mileage } = req.body;
  const newAdId = uuidv4();
  if (!type || !make || !year || !mileage || !model) {
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
        sub: sub,
        email: email,
        name: name,
      };

      const inserUser = await db.collection("users").insertOne(newUser);
      if (inserUser) {
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
// add user
// const addUser = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);

//   try {
//   } catch {
//   } finally {
//   }
// };

module.exports = {
  addNewAd,
  getAds,
  getAd,
  deleteAd,
  updateAd,
  addNewUser,
  getUsers,
};
