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
  const [adsCount, setAdsCount] = useState(0);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  const history = useHistory();

  // Get ads on the homePage
  const fetchAds = async () => {
    try {
      setLoading("loading");
      await fetch(`/api/ads?page=${pageNum}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setAds(response.ads);
          setAdsCount(response.count);
          setLoading("idle");
        });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  useEffect(() => {
    fetchAds();
  }, [pageNum]);

  // then apply filters if there is any
  useEffect(() => {
    if (
      filters.type === "Any Type" &&
      filters.make === "Any Make" &&
      filters.year === "Any Year"
    ) {
      return setFilteredAds(ads);
    }
    setFilteredAds(
      ads.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [ads, filters]);
  // sort ads
  useEffect(() => {
    if (sort === "default") {
      console.log("default");
    } else if (sort === "asc") {
      setFilteredAds((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredAds((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  // display error if an error occurred
  if (error) {
    return <ErrorPage />;
  }

  if (loading === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Wrapper>
        <Main>
          <ItemContainer>
            {loading === "idle" &&
              ads &&
              filteredAds &&
              (filteredAds.length ? (
                filteredAds.map((car, index) => (
                  <DisplayAds car={car} key={index} />
                ))
              ) : (
                <>
                  <FilterErr>
                    No result found for{" "}
                    {Object.values(filters).map((value) => {
                      return <>{value} </>;
                    })}
                    .<FilterErr>Try changing your search filters.</FilterErr>
                  </FilterErr>
                </>
              ))}
          </ItemContainer>
        </Main>
        <Pagination
          pageNum={pageNum}
          setPageNum={setPageNum}
          adsCount={adsCount}
        />
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 30px;
`;
const FilterErr = styled.h1`
  color: var(--color-yellow);
  padding: 10px;
`;
const Main = styled.div``;

const ItemContainer = styled.div``;

export default SmallAd;
