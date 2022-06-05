const request = require("request");

const options = {
  method: "GET",
  url: "https://car-data.p.rapidapi.com/cars/makes",
  headers: {
    "X-RapidAPI-Host": "car-data.p.rapidapi.com",
    "X-RapidAPI-Key": "dad455c774msh199672d06358df5p1360fcjsn5c5726f3139f",
    useQueryString: true,
  },
};

const getCarMakes = () => {
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
};

getMakes().the((res) => console.log(res));
module.exports = {
  getCarMakes,
};
// const request = require("request-promise");

// const getMakes = () => {
//   return request("https://car-data.p.rapidapi.com/cars/makes")
//     .then((res) => {
//       return JSON.parse(res); // 2
//     })
//     .catch((err) => console.log("Error: ", err));
// };

// getMakes().then((result) => console.log(result));
