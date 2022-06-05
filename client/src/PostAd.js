import { useEffect, useState } from "react";
import { years, type } from "./data";
import { options } from "./.env";
const PostAd = () => {
  const [makes, setMakes] = useState([]);
  
  // useEffect(() => {
  //   fetch("https://car-data.p.rapidapi.com/cars/makes", options)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       setMakes(response);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);
  // console.log(makes);
  return (
    <>
      <h1>Enter your car details:</h1>
      <form>
        <label for="type">Type: </label>
        <select name="type" id="type">
          {type.map((el) => {
            return <option value={el}>{el}</option>;
          })}
        </select>
        <label for="make">Make: </label>
        <select>
          {/* {makes &&
            makes.map((make) => {
              return (
                <>
                  <option value={make}>{make}</option>
                </>
              );
            })} */}
        </select>
        <label for="year">Year: </label>
        <select>
          {years.map((year) => {
            return <option value={year}>{year}</option>;
          })}
        </select>
        <label for="mileage">Mileage: </label>
        <input type="text" placeholder="Current mileage in kilometers" />
      </form>
    </>
  );
};
export default PostAd;
