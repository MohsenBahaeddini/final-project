import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Pagination from "./Pagination";
import { CurrentUserContext } from "../CurrentUserContext";
import DisplayAds from "./DisplayAds";

const SmallAd = ({ filters, sort }) => {
  const [filteredAds, setFilteredAds] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState("loading");
  const { user, isAuthenticated } = useAuth0();
  const [status, setStatus] = useState("loading");
  const [pageNum, setPageNum] = useState(1);
  const { currentUser } = useContext(CurrentUserContext);
  // console.log(currentUser);
  const history = useHistory();

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
        console.log(response.ads);
        setAds(response.ads);
        setLoading("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(ads);

  // then apply filters if there is any

  useEffect(() => {
    setFilteredAds(
      ads.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [ads, filters]);

  useEffect(() => {
    if (sort === "asc") {
      setFilteredAds((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredAds((prev) =>
        [...prev].sort((a, b) => parseInt(b.price) - parseInt(a.price))
      );
    }
  }, [sort]);
  console.log("ads :", ads.length);
  console.log("filteredAds :", filteredAds.length);
  console.log(filteredAds);
  console.log("sort :::", sort);

  // console.log(filters);
  return (
    <>
      <Wrapper>
        <Main>
          <AdsContainer>
            <ItemContainer>
              {filteredAds.length < ads.length
                ? filteredAds.map((car, index) => (
                    <DisplayAds car={car} key={index} />
                  ))
                : ads.map((car, index) => <DisplayAds car={car} key={index} />)}
              {/* <img src={car.imageUrl} />

              <StyledLink to={`ad/${car._id}`}>
                <H1>CAR TYPE: {car.type}</H1>
              </StyledLink>
              <H1>MAKE: {car.make}</H1>
              <H1>MODEL: {car.model}</H1>
              <H1>YEAR: {car.year}</H1>
              <H1>MILEAGE: {car.mileage}km</H1>
              <H1>PRICE: ${car.price}</H1> */}
            </ItemContainer>
          </AdsContainer>
        </Main>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 100%;

  padding: 10px;
`;

const SideBar = styled.div`
  flex-basis: 10%;
  padding: 15px 20px 20px 10px;
  border-radius: 10px;
`;

const Main = styled.div`
  margin: 5px;
  padding: 10px;
  width: 80%;
  max-width: 1000px;
`;

const AdsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const ItemContainer = styled(Link)`
  display: flex;
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
  }
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  /* display: flex; */
`;

const H1 = styled.h1`
  font-size: 14px;
`;

export default SmallAd;
