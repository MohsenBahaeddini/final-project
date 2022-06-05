// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.

// const { flights, reservations } = require("./data");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// all makes models years for filtering when either cx wants to search or post an ad
const getListing = async () => {};

const getMakes = async () => {
  getCarMakes();
};

const addNewAd = async () => {
  const client = new MongoClient(MONGO_URI, options);
  const { type, make, year, mileage } = req.body;
  const newAdId = uuidv4();
};

module.exports = {
  getListing,
  addNewAd,
  getMakes,
};
