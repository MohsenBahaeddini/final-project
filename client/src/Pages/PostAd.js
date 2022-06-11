import { useEffect, useState, useRef, useContext } from "react";
import { years, types, makes } from "../data";
import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
// import UploadImg from "./UploadImg";
import UploadImage from "./UploadImage";
import Select from "react-select";

const PostAd = () => {
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [cars, setCars] = useState([]);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState([]);

  const [newAd, setNewAd] = useState({});
  const { currentUser } = useContext(CurrentUserContext);
  console.log("currentuser :", currentUser);

  // get all Models for the selected make,type and year from car data api
  useEffect(() => {
    if (make && type && year) {
      fetch(
        `https://car-data.p.rapidapi.com/cars?limit=50&page=0&year=${year}&make=${make}&type=${type}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "car-data.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setCars(response);
        })
        .catch((err) => console.error("Error: ", err));
    }
  }, [make, type, year]);
  console.log(year, make, type);
  console.log("CARS : ", cars);

  // hadnleSubmit will send the info to the server
  const handleSubmit = (ev) => {
    console.log("worked");
    ev.preventDefault();
    console.log(make, model, year, type);
    if (make && type && year && model && mileage && price) {
      fetch("/api/new-ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          owner: currentUser.email,
          make: make,
          type: type,
          year: year,
          model: model,
          mileage: mileage,
          price: price,
          imageUrl: [imageUrl],
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response) {
            console.log(response);
            // localStorage.setItem("_id", response._id);
            //   setResId(response._id);
            //   history.push("/confirmed");
          }
        });
    }
  };

  if (cars.length) {
    console.log(cars);
  }

  console.log("imageUrl :; ", imageUrl);

  return (
    <>
      <Wrapper>
        <h2>Enter your car details:</h2>
        <form onSubmit={handleSubmit}>
          <label for="type">Type: </label>
          <select
            name="type"
            id="type"
            onChange={(ev) => {
              setType(ev.target.value);
            }}
          >
            {types.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
          <label for="make">Make: </label>
          <select
            onChange={(ev) => {
              setMake(ev.target.value);
            }}
          >
            {makes.map((make) => {
              return (
                <>
                  <option value={make}>{make}</option>
                </>
              );
            })}
          </select>
          <label for="year">Year: </label>
          <select
            // placeholder="select year"
            onChange={(ev) => {
              setYear(ev.target.value);
            }}
          >
            {years.map((year) => {
              return <option value={year}>{year}</option>;
            })}
          </select>
          <label for="model">Model: </label>

          <select
            placeholder="select model"
            onChange={(ev) => {
              setModel(ev.target.value);
              console.log(ev.target.value);
            }}
          >
            {cars.length &&
              cars.map((car, index) =>
                index === 0 ? (
                  <option value="select model">select model</option>
                ) : (
                  <option value={car.model}>{car.model}</option>
                )
              )}
          </select>
          <label for="mileage">Mileage: </label>
          <input
            type="text"
            placeholder="Current mileage in kilometers"
            onChange={(ev) => setMileage(ev.target.value)}
          />
          <label for="price">Price: </label>
          <input
            type="text"
            // placeholdr="Your car price in CAD"
            onChange={(ev) => setPrice(ev.target.value)}
          />

          <button type="submit">Post My Ad</button>
        </form>
        <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export default PostAd;
