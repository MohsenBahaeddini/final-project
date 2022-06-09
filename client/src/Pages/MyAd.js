import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import MyMessages from "./MyMessages";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

const MyAd = ({ currentUser }) => {
  const [myAds, setMyAds] = useState([]);
  const [status, setStatus] = useState("loading");
  const history = useHistory();
  const { id } = useParams();

  console.log("id ::", id);
  useEffect(() => {
    fetch(`/api/ads-by-owner/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        setMyAds(response.ads);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const deleteAd = (ev) => {
  //   ev.preventDefault();
  //   fetch(`/api/delete-ad/${ad._id}`,{})

  // };
  const updateMyAdsAfterDelete = () => {
    fetch(`/api/ads-by-owner/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        setMyAds(response.ads);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      MyAds
      {status === "idle" && myAds && (
        <>
          {myAds.map((ad, index) => {
            return (
              <div key={index}>
                {console.log(ad)}
                <StyledNavLink to={`/messages/${ad._id}`}>
                  <h4>check messages for this ad</h4>
                </StyledNavLink>
                <h4>{ad.type}</h4>
                <h4>{ad.make}</h4>
                <h4>{ad.model}</h4>
                <h4>{ad.year}</h4>
                <button
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
                  delete this ad
                </button>
              </div>
            );
          })}
        </>
      )}
      {/* {matchedAd && (
        <>
          <h4>{matchedAd.type}</h4>
          <h4>{matchedAd.make}</h4>
          <h4>{matchedAd.model}</h4>
          <MyMessages matchedAd={matchedAd} />
        </>
      )} */}
    </>
  );
};
const StyledNavLink = styled(NavLink)`
  color: gray;
  margin-left: 10px;
  /* font-family: var(--font-body); */
  font-size: 12px;
  text-decoration: none;
  outline: none;

  &:hover {
    color: #3f5efb;
    text-decoration: underline;
  }
  /* 
  &.active {
    text-decoration: underline;
    color: #3f5efb;
  } */
`;
export default MyAd;
