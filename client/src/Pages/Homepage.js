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
import coverPhoto from "../assets/cover-photo.png";
import cover2 from "../assets/cover2.png";
import cover3 from "../assets/cover3.png";
import cover4 from "../assets/cover4.png";
import cover5 from "../assets/cover5.png";
import uploadImage from "../assets/uploadImage.png";
// assetscover-photo.jpg
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

  const { currentUser } = useContext(CurrentUserContext);
  // console.log(currentUser);
  const history = useHistory();

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("asc");
  // get all Models for the selected make,type and year from car data api
  // useEffect(() => {
  //   if (make) {
  //     fetch(
  //       `https://car-data.p.rapidapi.com/cars?limit=50&page=0&year=${year}&make=${make}&type=${type}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "X-RapidAPI-Host": "car-data.p.rapidapi.com",
  //           "X-RapidAPI-Key": process.env.REACT_APP_APIKEY,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((response) => {
  //         console.log(response);
  //         setCars(response);
  //       })
  //       .catch((err) => console.error("Error: ", err));
  //   }
  // }, [make, type, year]);

  const handleFilters = (ev) => {
    let value = ev.target.value;
    // if (
    //   value === "Select Make" &&
    //   "Select Type" &&
    //   "Select Year" &&
    //   "Select Model"
    // ) {
    //   value = "";
    // }
    console.log("###########value :::", value);

    setFilters({
      ...filters,
      [ev.target.name]: value,
    });
  };

  const addNewUser = async () => {
    // console.log("user: ", user);

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
              // defaultValue={"default"}
              name="type"
              onChange={(ev) => {
                setType(ev.target.value);
                handleFilters(ev);
              }}
            >
              {/* <option value={"default"} disabled>
                Select Type
              </option> */}
              <option value={""}>Any Type</option>
              {types.map((type) => {
                return <option value={type}>{type}</option>;
              })}
            </Select>

            <Select
              // defaultValue={"default"}
              name="make"
              onChange={(ev) => {
                setMake(ev.target.value);
                handleFilters(ev);
              }}
            >
              {/* <option value={"default"} disabled>
                Select Make
              </option> */}
              <option value={""}>Any Make</option>
              {makes.map((make) => {
                return (
                  <>
                    <option value={make}>{make}</option>
                  </>
                );
              })}
            </Select>
            {/* <label for="year">Year: </label> */}
            <Select
              // defaultValue={"default"}
              name="year"
              onChange={(ev) => {
                setYear(ev.target.value);
                handleFilters(ev);
              }}
            >
              {/* <option value={"default"} disabled>
                Select Year
              </option> */}
              <option value={""}>Any Year</option>
              {years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </Select>
            {/* <label for="model">Model: </label> */}
            {/* <Select
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
            </Select> */}

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
        {/* <Pagination pageNum={pageNum} setPageNum={setPageNum} /> */}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* height: 100vh; */
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
  /* width: 100%; */
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
  /* border-bottom: 1px solid var(--color-blue); */
  /* flex-direction: column; */
  width: 700px;
  height: 70px;
  /* padding: 10px; */
  /* margin: 5px 5px 5px 300px; */
`;
const Select = styled.select`
  font-size: 14px;
  padding: 5px 20px;
  margin: 5px;
`;

// const Filter = styled.div`
//   display: flex;
// `;
export default Homepage;
