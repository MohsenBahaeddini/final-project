import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";

const MyMessages = ({ matchedAd }) => {
  // const [allMessages, setAllMessages] = useState([]);
  // const [myMsgs, setMyMsgs] = useState([]);
  const [myConversations, setMyConversations] = useState([]);
  const [status, setStatus] = useState("loading");
  const { currentUser } = useContext(CurrentUserContext);

  // get the messages that owner has received for a specific ad
  const { id } = useParams();
  console.log("id **** :", id); // undefined !!!!!!

  useEffect(() => {
    fetch(`/api/conversations-by-ad/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setMyConversations(response);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(matchedAd._id);
  // useEffect(() => {
  //   fetch("/api/messages", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       // console.log(response);
  //       setAllMessages(response.messages);
  //       setStatus("idle");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  //   console.log(allMessages.messages);
  // heads up! find returns only the first matched element
  // will have to find a way to fetch the specefied item from backend
  // let myMessages;
  // if (status === "idle") {
  //   allMessages.map((msg) => {
  //     if (msg.receiver === currentUser.email && msg.adId === matchedAd._id) {
  //       return (myMessages = msg);
  //     }
  //     return;
  //   });
  // }

  // console.log(myMessages);

  // owner should be able to respond to the msg sender // conversations

  return (
    <>
      My messages
      <h5>{/* {myMessages && myMessages.message} */}</h5>
    </>
  );
};
export default MyMessages;
