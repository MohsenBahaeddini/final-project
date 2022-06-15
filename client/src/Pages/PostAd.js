import { useEffect, useState, useRef, useContext } from "react";
import { years, types, makes } from "../data";
import { useHistory } from "react-router-dom";

import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
// import UploadImg from "./UploadImg";
// import {car-placeholder }from "../assets/car-placeholder.svg"
import UploadImage from "./UploadImage";
import uploadImage from "../assets/uploadImage.png";
import Select from "react-select";

const PostAd = () => {
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");
  // const [features, setFeatures] = useState({});
  const [airConditioning, setAirConditioning] = useState(false);
  const [alloyWheels, setAlloyWheels] = useState(false);
  const [bluetooth, setBluetooth] = useState(false);
  const [heatedSeats, setHeatedSeats] = useState(false);
  const [navigationSystem, setNavigationSystem] = useState(false);
  const [stabilityControl, setStabilityControl] = useState(false);
  const [cars, setCars] = useState([]);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const history = useHistory();

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
    if (make && type && year && model && mileage && price && description) {
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
          description: description,
          price: price,
          imageUrl: imageUrl,
          airConditioning: airConditioning,
          alloyWheels: alloyWheels,
          bluetooth: bluetooth,
          heatedSeats: heatedSeats,
          navigationSystem: navigationSystem,
          stabilityControl: stabilityControl,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response) {
            console.log(response);
            history.push(`/profile/${currentUser.sub}`);
          }
        });
    }
  };

  if (cars.length) {
    console.log(cars);
  }

  console.log("imageUrl :; ", imageUrl);
  console.log(airConditioning);
  return (
    <>
      <Wrapper>
        <Div>
          <H1>Post Ad</H1>
        </Div>
        <Section>
          <Div>
            <Form onSubmit={handleSubmit}>
              {/* <label for="type">Type: </label> */}
              <H3>Enter Your Car Info</H3>
              <Select1
                defaultValue={"default"}
                name="type"
                id="type"
                onChange={(ev) => {
                  setType(ev.target.value);
                }}
              >
                <option value={"default"} disabled>
                  Select Type
                </option>
                {types.map((el) => {
                  return <option value={el}>{el}</option>;
                })}
              </Select1>
              {/* <label for="make">Make: </label> */}
              <Select1
                defaultValue={"default"}
                onChange={(ev) => {
                  setMake(ev.target.value);
                }}
              >
                <option value={"default"} disabled>
                  Select Make
                </option>
                {makes.map((make) => {
                  return (
                    <>
                      <option value={make}>{make}</option>
                    </>
                  );
                })}
              </Select1>
              {/* <label for="year">Year: </label> */}
              <Select1
                defaultValue={"default"}
                onChange={(ev) => {
                  setYear(ev.target.value);
                }}
              >
                <option value={"default"} disabled>
                  Select Year
                </option>
                {years.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </Select1>
              {/* <label for="model">Model: </label> */}
              <Select1
                defaultValue={"default"}
                onChange={(ev) => {
                  setModel(ev.target.value);
                  console.log(ev.target.value);
                }}
              >
                <option value={"default"} disabled>
                  Select Model
                </option>
                {cars.length &&
                  cars.map((car, index) => (
                    <option key={index} value={car.model}>
                      {car.model}
                    </option>
                  ))}
                {/* {cars.length &&
                  cars.map((car, index) =>
                    index === 0 ? (
                      <option value="select model">select model</option>
                    ) : (
                      <option value={car.model}>{car.model}</option>
                    )
                  )} */}
              </Select1>
              {/* <label for="mileage">Mileage: </label> */}
              <Input
                type="text"
                placeholder="Kilometers*"
                onChange={(ev) => setMileage(ev.target.value)}
              />
              {/* <label for="price">Price: </label> */}
              <Input
                type="text"
                placeholder="$ Price*"
                onChange={(ev) => setPrice(ev.target.value)}
              />
              <Options>
                {/* <Features> */}
                <Div3>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Air conditioning"
                      name="airConditioning"
                      onChange={(ev) => setAirConditioning(ev.target.checked)}
                    />
                    <label for="airConditioning">Air conditioning</label>
                  </Div4>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Alloy wheels"
                      name="alloyWheels"
                      onChange={(ev) => setAlloyWheels(ev.target.checked)}
                    />
                    <label for="alloyWheels">Alloy wheels</label>
                  </Div4>
                </Div3>

                <Div3>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Bluetooth"
                      name="bluetooth"
                      onChange={(ev) => setBluetooth(ev.target.checked)}
                    />
                    <label for="bluetooth">Bluetooth</label>
                  </Div4>

                  <Div4>
                    <input
                      type="checkbox"
                      value="Heated seats"
                      name="heatedSeats"
                      onChange={(ev) => setHeatedSeats(ev.target.checked)}
                    />
                    <label for="heatedSeats">Heated seats</label>
                  </Div4>
                </Div3>
                <Div3>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Navigation system"
                      name="navigationSystem"
                      onChange={(ev) => setHeatedSeats(ev.target.checked)}
                    />
                    <label for="navigationSystem">Navigation system</label>
                  </Div4>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Stability control"
                      name="stabilityControl"
                      onChange={(ev) => setStabilityControl(ev.target.checked)}
                    />
                    <label for="stabilityControl">Stability control</label>
                  </Div4>
                </Div3>
                {/* </Features> */}
              </Options>

              <TextArea
                type="text"
                placeholder="Description*"
                // value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              <Button
                disabled={
                  !type ||
                  !make ||
                  !year ||
                  !model ||
                  !description ||
                  !price ||
                  !mileage
                    ? true
                    : false
                }
                type="submit"
              >
                Post My Ad
              </Button>
            </Form>
          </Div>
          <Div2>
            <H3>Showcase the beauty of your car</H3>
            <Img src={uploadImage} />
            <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Div2>
        </Section>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ddd;
  margin: 50px 30px;
`;
const H1 = styled.h1`
  font-size: 20px;
`;
const Section = styled.section`
  display: flex;
  justify-content: space-evenly;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: left;
  align-items: center;
  margin: 20px;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  margin: 20px;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;
const Features = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  border: 1px solid #fff;
`;
const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid #fff; */
  /* align-items: ; */
`;
const Div4 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;
`;

const Options = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const H3 = styled.h3`
  margin-bottom: 30px;
  font-size: 18px;
`;
const Img = styled.img`
  width: 380px;
  height: 330px;
`;
const Input = styled.input`
  margin-top: 5px;
  border: none;
  border-radius: 2px;
  /* font-family: var(--font-body); */
`;
const Button = styled.button`
  color: var(--color-dark-blue);
  font-size: 16px;
  padding: 5px 200px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #fff;

  &:disabled {
    background-color: grey;
    border: 1px solid grey;
    cursor: auto;
  }
  &:hover:enabled {
    /* background-color: rgba(120, 192, 227, 0.5); */
    transform: scale(1.01, 1.01);
    outline: none;
    border-radius: 2px;
    border: 1px solid #fff;
  }
`;
const TextArea = styled.textarea`
  padding-bottom: 30px;
  text-align: left;
  margin-top: 5px;
  font-size: 15px;
  font-family: var(--font-body);
  /* font-size: 20px; */
  /* height: 200px;
  width: 850px; */
  border: none;
  border-radius: 2px;
  outline: none;
`;
const Select1 = styled.select`
  padding: 5px;
  margin-top: 5px;
`;
export default PostAd;
