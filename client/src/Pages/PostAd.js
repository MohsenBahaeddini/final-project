import { useEffect, useState, useRef, useContext } from "react";
import { years, types, makes } from "../data";
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
        <Div>
          <h2>Post Ad</h2>
        </Div>
        <Section>
          <Div>
            <Form onSubmit={handleSubmit}>
              {/* <label for="type">Type: </label> */}
              <H3>Enter Your Car Info</H3>
              <Select1
                name="type"
                id="type"
                onChange={(ev) => {
                  setType(ev.target.value);
                }}
              >
                {types.map((el) => {
                  return <option value={el}>{el}</option>;
                })}
              </Select1>
              {/* <label for="make">Make: </label> */}
              <Select1
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
              </Select1>
              {/* <label for="year">Year: </label> */}
              <Select1
                // placeholder="select year"
                onChange={(ev) => {
                  setYear(ev.target.value);
                }}
              >
                {years.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </Select1>
              {/* <label for="model">Model: </label> */}
              <Select1
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
                placeholder="Price*"
                onChange={(ev) => setPrice(ev.target.value)}
              />
              <TextArea
                type="text"
                placeholder="Description*"
                // value={description}
                // onChange={handleOnChange}
              />
              <Button type="submit">Post My Ad</Button>
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
const H3 = styled.h3`
  margin-bottom: 30px;
`;
const Img = styled.img`
  width: 300px;
  height: 270px;
`;
const Input = styled.input`
  margin-top: 5px;
`;
const Button = styled.button`
  color: var(--color-blue);
  font-size: 18px;
  padding: 5px 200px;
  margin-top: 5px;
`;
const TextArea = styled.textarea`
  padding-bottom: 30px;
  text-align: left;
  margin-top: 5px;
  /* font-size: 20px; */
  /* height: 200px;
  width: 850px; */
  border: none;
  outline: none;
`;
const Select1 = styled.select`
  padding: 5px;
  margin-top: 5px;
`;
export default PostAd;
