import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import MyMessages from "./MyMessages";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPage from "./ErrorPage";

const MyAd = ({ currentUser }) => {
  const [myAds, setMyAds] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  // Get all my ads
  useEffect(() => {
    setStatus("loading");
    fetch(`/api/ads-by-owner/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setMyAds(response.ads);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const updateMyAdsAfterDelete = () => {
    fetch(`/api/ads-by-owner/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setMyAds(response.ads);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Wrapper>
        <Title>Manage My Ads</Title>
        {status === "loading" && <LoadingSpinner />}
        {status === "idle" &&
          (myAds && myAds.length ? (
            <>
              {myAds.map((ad, index) => {
                return (
                  <div key={index}>
                    {/* {console.log(ad)} */}
                    <Div1>
                      <StyledNavLink to={`/ad/${ad._id}`}>
                        <Img src={ad.imageUrl[0]} />
                      </StyledNavLink>
                      <Div2>
                        <H2>
                          {ad.year} {ad.make} {ad.model} {ad.type}
                        </H2>

                        <StyledNavLink to={`/messages/${ad._id}`}>
                          <H3>Check out messages</H3>
                        </StyledNavLink>
                        <Button
                          onClick={(ev) => {
                            ev.preventDefault();
                            fetch(`/api/delete-ad/${ad._id}`, {
                              method: "DELETE",
                            })
                              .then((res) => res.json())
                              .then((response) => {
                                console.log(response);
                                updateMyAdsAfterDelete();
                              });
                          }}
                        >
                          Delete Ad
                        </Button>
                      </Div2>
                    </Div1>
                  </div>
                );
              })}
            </>
          ) : (
            <H2>No Ads Yet!</H2>
          ))}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  min-width: calc(100vw / 3.5);
  border: 1px solid #ddd;
  border-radius: 10px;
  background: var(--color-darkGrey);
  margin: 10px;
  min-height: 250px;
  height: fit-content;
  max-height: 550px;
  /* overflow: hidden; */

  padding-bottom: 5px;
`;
const Title = styled.h2`
  border-bottom: 1px solid var(--color-blue);
  padding: 5px;
  margin: 20px;
  text-align: left;
  color: #fff;
`;
const Div1 = styled.div`
  display: flex;
  margin-top: -10px;
  margin-bottom: 20px;
  /* overflow: hidden;
  overflow-y: scroll; */
`;
const Div2 = styled.div`
  margin: 20px 20px 20px 0px;
  display: flex;
  flex-direction: column;
`;
const H2 = styled.h2`
  padding: 5px;
  color: #fff;
`;
const H3 = styled.h2`
  padding: 5px;
  color: #fff;

  font-size: 15px;
  &:hover {
    color: var(--color-blue);
  }
`;
const Img = styled.img`
  width: 200px;
  height: 130px;
  margin: 20px 20px 5px 20px;
  padding: 2px;
  border: 1px solid var(--color-blue);
  border-radius: 10px;
  &:hover {
    transform: scale(1.02);
  }
`;
const StyledNavLink = styled(NavLink)`
  color: white;
  margin-left: 10px;
  font-size: 12px;
  text-decoration: none;
  outline: none;

  &:hover {
    color: #3f5efb;
  }
`;
const Button = styled.button`
  cursor: pointer;
  font-size: 15px;
  color: var(--color-darkGrey);
  margin-top: 10px;
  &:hover {
    transform: scale(1.01, 1.01);
    outline: none;
  }
`;
export default MyAd;
