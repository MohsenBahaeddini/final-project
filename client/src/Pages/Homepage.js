import { useState, useEffect } from "react";
import styled from "styled-components";
// import { Link, NavLink } from "react-router-dom";
import SmallAd from "./SmallAd";

const Homepage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/ads", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setAds(response);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(ads);
  return (
    <>
      Homepage
      {/* have to map on all ads to get each ad info and pass to SmallAd */}
      <SmallAd />
    </>
  );
};

export default Homepage;
