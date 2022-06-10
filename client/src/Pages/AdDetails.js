import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";

const AdDetails = () => {
  const [ad, setAd] = useState({});
  const [loading, setLoading] = useState("loading");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  console.log("currentUser******", currentUser);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`/api/ad/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setAd(response.ad);
        setLoading("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);
  // console.log(ad);
  // console.log(msg);
  console.log(ad);
  const sendMessage = (ev) => {
    ev.preventDefault();
    console.log("working");
    if (msg) {
      fetch("/api/new-conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              user: currentUser.email,
              body: msg,
              date: moment().format("h:mm A - MMMM Do, YYYY"),
            },
          ],
          buyer: currentUser.email,
          buyerId: currentUser.sub,
          seller: ad.owner,
          adId: id,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response) {
            console.log(response);
            // localStorage.setItem("_id", response._id);
            //   setResId(response._id);
            //   history.push("/confirmed");
          }
        });
    }
  };
  console.log(msg);

  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }
  return (
    <>
      <img src={ad.imageUrl} />
      <h1>{ad.type}</h1>
      <h2>{ad.make}</h2>
      <h3>{ad.model}</h3>
      <label>send a message to the owner:</label>
      <textArea
        type="text"
        placeholder="Is this car still available?"
        value={msg}
        onChange={(ev) => setMsg(ev.target.value)}
      ></textArea>
      <button onClick={sendMessage}>Send Message</button>
    </>
  );
};
export default AdDetails;
