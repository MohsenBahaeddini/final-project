import { useState, useEffect } from "react";
import styled from "styled-components";
// import { Link, NavLink } from "react-router-dom";
import SmallAd from "./SmallAd";
import { useAuth0 } from "@auth0/auth0-react";

const Homepage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState("loading");
  const { user, isAuthenticated } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  // would change thiis to have pagination
  useEffect(() => {
    fetch("/api/ads", {
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
  // console.log(ads);

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
            _id: user.email,
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
        <SideBar>SideBar for search filter</SideBar>

        {/* have to map on all ads to get each ad info and pass to SmallAd */}
        {ads.map((ad, index) => {
          return <SmallAd key={index} car={ad} />;
        })}
      </Wrapper>
    </>
  );
};
// const Wrapper = styled.div`
//   display: flex;
// `;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const SideBar = styled.div`
  flex-basis: 10%;
  padding: 15px 20px 20px 10px;
  border-radius: 10px;
`;
export default Homepage;
