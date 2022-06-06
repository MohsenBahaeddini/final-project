import { useEffect, useState } from "react";
import { years, types, makes } from "../data";
import options from "../.env";

const PostAd = () => {
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [mileage, setMileage] = useState("");
  const [cars, setCars] = useState([]);

  // get all Models for the selected make,type and year from car data api
  useEffect(() => {
    if (make && type && year) {
      fetch(
        `https://car-data.p.rapidapi.com/cars?limit=50&page=0&year=${year}&make=${make}&type=${type}`,
        options
      )
        .then(console.log("hey"))
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setCars(response);
        })
        .catch((err) => console.error("Error: ", err));
    }
  }, []);
  console.log(year, make, type);
  console.log("CARS : ", cars);

  // hadnleSubmit will send the info to the server
  const handleSubmit = (ev) => {
    ev.preventDeafault();
    if (make && type && year && model) {
      fetch("/api/new-ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          make: make,
          type: type,
          year: year,
          model: model,
          mileage: mileage,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 200) {
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

  return (
    <>
      <h1>Enter your car details:</h1>
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
          onChange={(ev) => {
            setModel(ev.target.value);
          }}
        >
          {cars.length &&
            cars.map((car) => {
              return <option value={car.model}>{car.model}</option>;
            })}
        </select>
        <label for="mileage">Mileage: </label>
        <input
          type="text"
          placeholder="Current mileage in kilometers"
          onChange={(ev) => setMileage(ev.target.value)}
        />
        <button type="submit">Post My Car</button>
      </form>
    </>
  );
};
export default PostAd;
