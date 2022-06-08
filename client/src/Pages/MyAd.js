import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import MyMessages from "./MyMessages";
import { NavLink, useParams } from "react-router-dom";

const MyAd = ({ currentUser }) => {
  const [allAds, setAllAds] = useState([]);
  const [myAds, setMyAds] = useState([]);
  const [status, setStatus] = useState("loading");
  //   console.log(currentUser);
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
  console.log("myAds :::", myAds);
  // const getMyAds = ()=>{

  // }
  // heads up! find returns only the first matched element
  // will have to find a way to fetch the specefied item from backend
  // let matchedAd;
  // if (allAdsStatus === "idle") {
  //   matchedAd = allAds.find((ad) => {
  //     return ad.owner === currentUser.email;
  //   });
  // }
  // console.log(matchedAd);
  return (
    <>
      MyAds
      {status === "idle" && (
        <>
          {myAds.map((ad, index) => {
            return (
              <div key={index}>
                <h4>{ad.type}</h4>
                <h4>{ad.make}</h4>
                <h4>{ad.model}</h4>
                <h4>{ad.year}</h4>
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
export default MyAd;
