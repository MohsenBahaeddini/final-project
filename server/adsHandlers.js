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
  try {
    const client = new MongoClient(MONGO_URI, options);
    const page = req.query.page;
    console.log(page);
    const limit = 6;
    await client.connect();
    const db = client.db("mba");

    const findAds = await db
      .collection("ads")
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    console.log(findAds);
    const count = await db.collection("ads").countDocuments();
    console.log(count);
    res.status(200).json({
      status: 200,
      success: true,
      count,
      ads: findAds,
    });
    client.close();
  } catch (err) {
    res.status(500).json({
      status: 500,
      Error: err.message,
    });
  }
  //  finally {
  //   await client.close();
  // }
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

  const {
    owner,
    type,
    make,
    model,
    year,
    mileage,
    description,
    price,
    imageUrl,
    airConditioning,
    alloyWheels,
    bluetooth,
    heatedSeats,
    navigationSystem,
    stabilityControl,
  } = req.body;
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
      description: description,
      price: price,
      imageUrl: imageUrl,
      airConditioning: airConditioning,
      alloyWheels: alloyWheels,
      bluetooth: bluetooth,
      heatedSeats: heatedSeats,
      navigationSystem: navigationSystem,
      stabilityControl: stabilityControl,
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

  const { type, make, year, model, mileage } = req.body;

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

// get ads by owner
const getAdsByOwners = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("mba");

    const findUser = await db.collection("users").findOne({ _id: id });

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

module.exports = {
  addNewAd,
  getAds,
  getAd,
  deleteAd,
  updateAd,
  getAdsByOwners,
};
