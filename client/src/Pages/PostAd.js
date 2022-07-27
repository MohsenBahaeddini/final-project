import { useEffect, useState, useContext } from "react";
import { years, types, makes } from "../data";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
import UploadImage from "./UploadImage";
import uploadImage from "../assets/uploadImage.png";


const PostAd = () => {
  /** useState to update different options when entering the car info */ 
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
  const [imageUrl, setImageUrl] = useState([]);
  const history = useHistory();
  const { currentUser } = useContext(CurrentUserContext);

  /**  get all Models for the selected make,type and year from car data api */
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

  /**  
   ** hadnleSubmit will send the info to the server */
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
          <FormDiv>
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
                <Option value={"default"} disabled>
                  Select Type
                </Option>
                {types.map((el) => {
                  return <Option value={el}>{el}</Option>;
                })}
              </Select1>
              <Select1
                defaultValue={"default"}
                onChange={(ev) => {
                  setMake(ev.target.value);
                }}
              >
                <Option value={"default"} disabled>
                  Select Make
                </Option>
                {makes.map((make) => {
                  return (
                    <>
                      <Option value={make}>{make}</Option>
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
                <Option value={"default"} disabled>
                  Select Year
                </Option>
                {years.map((year) => {
                  return <Option value={year}>{year}</Option>;
                })}
              </Select1>
              <Select1
                defaultValue={"default"}
                onChange={(ev) => {
                  setModel(ev.target.value);
                }}
              >
                <Option value={"default"} disabled>
                  Select Model
                </Option>
                {cars.length &&
                  cars.map((car, index) => (
                    <Option key={index} value={car.model}>
                      {car.model}
                    </Option>
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
          </FormDiv>
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
  @media (max-width: 600px) {
    font-size: 19px;
  }
`;
const Section = styled.section`
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 1100px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    justify-content: center;
    align-items: center;
  }
`;
const FormDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 20px;
  border-bottom: 1px solid #ddd;
  padding: 10px;
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
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Option = styled.option`
  @media (max-width: 1100px) {
    font-size: 14px;
    font-weight: bold;
  }
  @media (max-width: 600px) {
    width: 280px;
  }
`;
const H3 = styled.h3`
  margin-bottom: 30px;
  font-size: 18px;
  color: #fff;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
const Img = styled.img`
  width: 380px;
  height: 330px;
  @media (max-width: 600px) {
    width: 280px;
    height: 230px;
  }
`;
const Input = styled.input`
  margin-top: 5px;
  border: none;
  border-radius: 2px;
  @media (max-width: 1100px) {
    font-size: 14px;
    font-weight: bold;
  }
  @media (max-width: 600px) {
    width: 280px;
  }
`;
const Button = styled.button`
  color: var(--color-darkGrey);
  font-size: 16px;
  padding: 5px 200px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #fff;
  padding: 5px 20px;
  width: 500px;
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
  @media (max-width: 600px) {
    width: 280px;
    font-size: 14px;
    font-weight: bold;
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
  @media (max-width: 600px) {
    width: 280px;
  }
`;
const Select1 = styled.select`
  padding: 5px;
  margin-top: 5px;
  @media (max-width: 1100px) {
    font-size: 14px;
    font-weight: bold;
  }
  @media (max-width: 600px) {
    width: 280px;
  }
`;
const Label = styled.label`
  color: #fff;
  @media (max-width: 600px) {
    font-size: 14px;
    font-weight: bold;
  }
`;
export default PostAd;
