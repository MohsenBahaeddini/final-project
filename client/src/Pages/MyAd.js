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
  console.log(myAds);
  return (
    <>
      <Wrapper>
        <Title>Manage My Ads</Title>

        {status === "idle" && myAds && (
          <>
            {myAds.map((ad, index) => {
              return (
                <div key={index}>
                  {console.log(ad)}
                  <Div1>
                    <Img src={ad.imageUrl} />
                    <Div2>
                      <h4>
                        {ad.year} {ad.make} {ad.model} {ad.type}
                      </h4>
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
                        Delete
                      </Button>
                    </Div2>
                  </Div1>
                  <StyledNavLink to={`/messages/${ad._id}`}>
                    <h4>check messages for this ad</h4>
                  </StyledNavLink>
                </div>
              );
            })}
          </>
        )}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  /* display: flex; */
  min-width: calc(100vw / 3.5);
  border: 1px solid #ddd;
  margin: 10px;
  /* justify-content: space-between; */
`;
const Title = styled.h2`
  border-bottom: 1px solid #ddd;
  padding: 5px;
  margin: 20px;
  text-align: left;
`;
const Div1 = styled.div`
  display: flex;
`;
const Div2 = styled.div`
  margin: 20px 20px 20px 0px;
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  width: 200px;
  height: 130px;
  margin: 20px 20px 5px 20px;
`;
const StyledNavLink = styled(NavLink)`
  color: white;
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
const Button = styled.button`
  cursor: pointer;
  color: var(--color-blue);
  margin-top: 10px;
  /* padding: 3px 20px; */
  /* justify-content: right; */
  /* margin: 20px 5px 5px 300px; */
`;
export default MyAd;
