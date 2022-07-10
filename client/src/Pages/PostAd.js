import { useEffect, useState, useRef, useContext } from "react";
import { years, types, makes } from "../data";
import { useHistory } from "react-router-dom";

import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
import UploadImage from "./UploadImage";
import uploadImage from "../assets/uploadImage.png";
import Select from "react-select";

const PostAd = () => {
  // useState to update different options when entering the car info
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");
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
          setCars(response);
        })
        .catch((err) => console.error("Error: ", err));
    }
  }, [make, type, year]);

  // hadnleSubmit will send the info to the server
  const handleSubmit = (ev) => {
    ev.preventDefault();

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
            history.push(`/profile/${currentUser.sub}`);
          }
        });
    }
  };

  return (
    <>
      <Wrapper>
        <Div>
          <H1>Post Ad</H1>
        </Div>
        <Section>
          <Div>
            <Form onSubmit={handleSubmit}>
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
              <Select1
                defaultValue={"default"}
                onChange={(ev) => {
                  setModel(ev.target.value);
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
              </Select1>
              <Input
                type="text"
                placeholder="Kilometers*"
                onChange={(ev) => setMileage(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="$ Price*"
                onChange={(ev) => setPrice(ev.target.value)}
              />
              <Options>
                <Div3>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Air conditioning"
                      name="airConditioning"
                      onChange={(ev) => setAirConditioning(ev.target.checked)}
                    />
                    <Label for="airConditioning">Air conditioning</Label>
                  </Div4>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Alloy wheels"
                      name="alloyWheels"
                      onChange={(ev) => setAlloyWheels(ev.target.checked)}
                    />
                    <Label for="alloyWheels">Alloy wheels</Label>
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
                    <Label for="bluetooth">Bluetooth</Label>
                  </Div4>

                  <Div4>
                    <input
                      type="checkbox"
                      value="Heated seats"
                      name="heatedSeats"
                      onChange={(ev) => setHeatedSeats(ev.target.checked)}
                    />
                    <Label for="heatedSeats">Heated seats</Label>
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
                    <Label for="navigationSystem">Navigation system</Label>
                  </Div4>
                  <Div4>
                    <input
                      type="checkbox"
                      value="Stability control"
                      name="stabilityControl"
                      onChange={(ev) => setStabilityControl(ev.target.checked)}
                    />
                    <Label for="stabilityControl">Stability control</Label>
                  </Div4>
                </Div3>
              </Options>
              <TextArea
                type="text"
                placeholder="Description*"
                onChange={(ev) => setDescription(ev.target.value)}
              />
              {console.log(imageUrl)}
              <Button
                disabled={
                  !type ||
                  !make ||
                  !year ||
                  !model ||
                  !description ||
                  !price ||
                  !mileage ||
                  !imageUrl.length
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
  border-radius: 10px;
  background-color: var(--color-darkGrey);
  margin: 50px 30px;
`;
const H1 = styled.h1`
  font-size: 20px;
  color: #fff;
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
  border: 1px solid #fff;
`;
const Div3 = styled.div`
  display: flex;
  flex-direction: column;
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
  color: #fff;
`;
const Img = styled.img`
  width: 380px;
  height: 330px;
`;
const Input = styled.input`
  margin-top: 5px;
  border: none;
  border-radius: 2px;
`;
const Button = styled.button`
  color: var(--color-darkGrey);
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
  border: none;
  border-radius: 2px;
  outline: none;
`;
const Select1 = styled.select`
  padding: 5px;
  margin-top: 5px;
`;
const Label = styled.label`
  color: #fff;
`;
export default PostAd;
