import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
// import { Link, NavLink } from "react-router-dom";
import SmallAd from "./SmallAd";
import { useAuth0 } from "@auth0/auth0-react";
import Pagination from "./Pagination";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import Filters from "./Filters";
import { years, types, makes } from "../data";

const Homepage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState("loading");
  const { user, isAuthenticated } = useAuth0();
  // const [currentUser, setCurrentUser] = useState(null);
  // to get models from api
  const [cars, setCars] = useState([]);
  const [make, setMake] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  const [status, setStatus] = useState("loading");
  const [pageNum, setPageNum] = useState(1);

  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  const history = useHistory();

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("asc");
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

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const addNewUser = async () => {
    console.log("user: ", user);

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
              console.log(response);
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
        {/* <SideBar>SideBar for search filter</SideBar> */}
        <div>
          <Filter>
            <h4>Filter ads:</h4>
            <label for="type">Type: </label>
            <select
              name="type"
              onChange={(ev) => {
                setType(ev.target.value);
                handleFilters(ev);
              }}
            >
              {types.map((el) => {
                return <option value={el}>{el}</option>;
              })}
            </select>
            <label for="make">Make: </label>
            <select
              name="make"
              onChange={(ev) => {
                setMake(ev.target.value);
                handleFilters(ev);
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
              name="year"
              onChange={(ev) => {
                setYear(ev.target.value);
                handleFilters(ev);
              }}
            >
              {years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
            <label for="model">Model: </label>
            <select name="model" onChange={(ev) => handleFilters(ev)}>
              {cars.length &&
                cars.map((car) => {
                  return <option value={car.model}>{car.model}</option>;
                })}
            </select>
          </Filter>
        </div>
        <h4>Sort ads:</h4>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Price (asc)</option>
          <option value="desc">Price (desc)</option>
        </select>
        <SmallAd filters={filters} sort={sort} />
        {/* <Pagination pageNum={pageNum} setPageNum={setPageNum} /> */}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Filter = styled.div``;
export default Homepage;
