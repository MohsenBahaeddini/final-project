import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import SmallAd from "./SmallAd";
import { useAuth0 } from "@auth0/auth0-react";
import Pagination from "./Pagination";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import { years, types, makes } from "../data";
import cover3 from "../assets/cover3.png";
import uploadImage from "../assets/uploadImage.png";


const Homepage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState("loading");
  const { user, isAuthenticated } = useAuth0();

  const [cars, setCars] = useState([]);
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [status, setStatus] = useState("loading");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("asc");
  const { currentUser } = useContext(CurrentUserContext);
  
  const history = useHistory();

  // get all Models for the selected make from car data api
  useEffect(() => {
    if (make) {
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

  // handleFilters to set the filters to the key value pairs and then will pass filters to smallAd
  const handleFilters = (ev) => {
    let value = ev.target.value;  
    setFilters({
      ...filters,
      [ev.target.name]: value,
    });
  };

  // Once a user signs up or logs in for the first time create a new user
  const addNewUser = async () => {  
    if (isAuthenticated) {
      try {
        await fetch("/api/new-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            sub: user.sub,
            name: user.name,
            email: user.email,
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            if (response) {
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    addNewUser();
  }, []);

  return (
    <>
      <Wrapper>
        <CoverTextBox></CoverTextBox>
        <RightCoverBox></RightCoverBox>
        <CoverDiv>
          <CoverImg src={cover3} />
        </CoverDiv>
        <Div>
          <SearchDiv>
            <H3>Search Cars, Trucks and SUVs</H3>
          </SearchDiv>
          <FiltersDiv>
            <Select
              name="type"
              onChange={(ev) => {
                setType(ev.target.value);
                handleFilters(ev);
              }}
            >
              <option value={""}>Any Type</option>
              {types.map((type) => {
                return <option value={type}>{type}</option>;
              })}
            </Select>

            <Select
            
              name="make"
              onChange={(ev) => {
                setMake(ev.target.value);
                handleFilters(ev);
              }}
            >
              
              <option value={""}>Any Make</option>
              {makes.map((make) => {
                return (
                  <>
                    <option value={make}>{make}</option>
                  </>
                );
              })}
            </Select>
           
            <Select
             
              name="year"
              onChange={(ev) => {
                setYear(ev.target.value);
                handleFilters(ev);
              }}
            >
              
              <option value={""}>Any Year</option>
              {years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </Select>
           
            <Select
              name="model"
              onChange={(ev) => {
                setModel(ev.target.value);
                handleFilters(ev);
              }}
            >
              <option value={""}>Any Model</option>
              {cars.length &&
                cars.map((car) => {
                  return <option value={car.model}>{car.model}</option>;
                })}
            </Select>

            <Select
              defaultValue={"default"}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value={"default"} disabled>
                Sort
              </option>
              <option value="asc">Price ⬆</option>
              <option value="desc">Price ⬇</option>
            </Select>
          </FiltersDiv>
        </Div>
        <SmallAd
          filters={filters}
          sort={sort}
          make={make}
          year={year}
          type={type}
          model={model}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
 
  background-color: var(--color-dark-blue);
`;

const CoverDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
  width: 100%;
  background-color: var(--color-dark-blue);
`;
const CoverImg = styled.img`
 
  background-color: var(--color-dark-blue);
`;
const CoverTextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 650px -190px 0px;
`;
const H3 = styled.h3`
  color: var(--color-blue);
  color: #fff;
  font-size: 21px;
`;
const H4 = styled.h4`
  color: var(--color-yellow);
`;
const RightCoverBox = styled.div`
  display: flex;
  flex-direction: column;

  margin: 150px 0px -190px 650px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SearchDiv = styled.div`
  padding-top: 20px;
`;
const FiltersDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 70px;
  `;
const Select = styled.select`
  font-size: 14px;
  padding: 5px 20px;
  margin: 5px;
`;

export default Homepage;
