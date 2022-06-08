import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import MyMessages from "./MyMessages";

const MyAd = ({ currentUser }) => {
  const [allAds, setAllAds] = useState([]);
  const [myAds, setMyAds] = useState([]);
  const [allAdsStatus, setAllAdsStatus] = useState("loading");
  //   console.log(currentUser);
  useEffect(() => {
    fetch("/api/ads", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        setAllAds(response.ads);
        setAllAdsStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const getMyAds = ()=>{

  // }
  // heads up! find returns only the first matched element
  // will have to find a way to fetch the specefied item from backend
  let matchedAd;
  if (allAdsStatus === "idle") {
    matchedAd = allAds.find((ad) => {
      return ad.owner === currentUser.email;
    });
  }
  console.log(matchedAd);
  return (
    <>
      MyAds
      {matchedAd && (
        <>
          <h4>{matchedAd.type}</h4>
          <h4>{matchedAd.make}</h4>
          <h4>{matchedAd.model}</h4>
          <MyMessages matchedAd={matchedAd} />
        </>
      )}
    </>
  );
};
export default MyAd;
