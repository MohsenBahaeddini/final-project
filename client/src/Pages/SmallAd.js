import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Pagination from "./Pagination";
import { CurrentUserContext } from "../CurrentUserContext";
import DisplayAds from "./DisplayAds";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";

const SmallAd = ({ filters, sort, make, year, type, model }) => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([ads]);
  const [loading, setLoading] = useState("loading");
  const { user, isAuthenticated } = useAuth0();
  const [status, setStatus] = useState("loading");
  const [pageNum, setPageNum] = useState(1);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  // console.log(currentUser);
  const history = useHistory();

  // console.log("++++++++++++++++", make, year, model); // ok
  /// fetch all ads
  // // would change thiis to have pagination
  useEffect(() => {
    fetch(`/api/ads?page=${pageNum}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.ads);
        setAds(response.ads);
        setLoading("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  // ******************************** New Approach to filter items
  const filterByMake = (filteredData) => {
    // Avoid filter for empty string
    if (!make) {
      return filteredData;
    }

    const filteredCars = filteredData.filter(
      (car) => car.make.split(" ").indexOf(make) !== -1
    );
    return filteredCars;
  };

  const filterByYear = (filteredData) => {
    // Avoid filter for null value
    if (!year) {
      return filteredData;
    }

    const filteredCars = filteredData.filter((car) => car.year === year);
    return filteredCars;
  };

  const filterByType = (filteredData) => {
    // Avoid filter for empty string
    if (!type) {
      return filteredData;
    }

    const filteredCars = filteredData.filter(
      (car) => car.type.split(" ").indexOf(type) !== -1
    );
    return filteredCars;
  };
  const filterByModel = (filteredData) => {
    // console.log(filteredData);
    // Avoid filter for empty string
    if (!model) {
      return filteredData;
    }

    const filteredCars = filteredData.filter(
      (car) => car.model.split(" ").indexOf(model) !== -1
    );
    return filteredCars;
  };
  useEffect(() => {
    var filteredData = filterByMake(ads);
    filteredData = filterByYear(filteredData);
    filteredData = filterByType(filteredData);
    filteredData = filterByModel(filteredData);
    console.log(" %%%%%%%   filteredData :", filteredData.length);
    if (filteredData.length === 0) {
      return setFilteredAds(ads);
    }
    setFilteredAds(filteredData);
  }, [make, year, type, model]);

  // then apply filters if there is any
  // useEffect(() => {
  //   console.log("$$$$$ filters", filters);
  //   if (
  //     filters.type === "Any Type" &&
  //     filters.make === "Any Make" &&
  //     filters.year === "Any Year"
  //   ) {
  //     return setFilteredAds(ads);
  //   }
  //   setFilteredAds(
  //     ads.filter((item) =>
  //       Object.entries(filters).every(([key, value]) =>
  //         item[key].includes(value)
  //       )
  //     )
  //   );
  // }, [ads, filters]);

  useEffect(() => {
    if (sort === "asc") {
      setFilteredAds((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredAds((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  // console.log("ads :", ads.length);
  // console.log("filteredAds :", filteredAds.length);
  // console.log("ads &&& :", ads);
  // console.log("filteredAds  +++ :", filteredAds);
  // console.log("");
  // console.log("sort :::", sort);

  // console.log(filters);

  if (error) {
    return <ErrorPage />;
  }

  if (loading === "loading") {
    return <LoadingSpinner />;
  }
  console.log(filteredAds);
  return (
    <>
      <Wrapper>
        <Main>
          {/* <AdsContainer> */}
          <ItemContainer>
            {filteredAds.map((car, index) => (
              <DisplayAds car={car} key={index} />
            ))}
            {/* {filteredAds.length ? (
              filteredAds.map((car, index) => (
                <DisplayAds car={car} key={index} />
              ))
            ) : (
              <>
                <h1>No items matched</h1>
              </>
            )} */}
            {/* {filteredAds.length
              ? filteredAds.map((car, index) => (
                  <DisplayAds car={car} key={index} />
                ))
              : ads.map((car, index) => <DisplayAds car={car} key={index} />)} */}
          </ItemContainer>
          {/* </AdsContainer> */}
        </Main>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 30px;
`;
const Main = styled.div`
  /* margin: 5px; */
  /* margin: 5px;
  padding: 10px;
  width: 80%;
  max-width: 1000px; */
`;
const AdsContainer = styled.div`
  /* display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap; */
`;
const ItemContainer = styled.div`
  /* display: inline-block; */
  /* display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 15px;
  padding: 20px 10px 0 10px;
  margin: 0 0px 30px 20px;
  width: 200px;
  height: 320px;
  text-decoration: none;
  box-shadow: 6px 10px 79px 10px rgba(184, 178, 184, 1);
  transition: all 0.2s ease-in-out;
  color: var(--text-color);
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  } */
`;

// const StyledLink = styled(NavLink)`
//   text-decoration: none;
//   /* display: flex; */
// `;

// const H1 = styled.h1`
//   font-size: 14px;
// `;

export default SmallAd;
