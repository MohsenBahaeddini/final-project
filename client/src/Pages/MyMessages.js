import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import moment from "moment";

const MyMessages = () => {
  // const [allMessages, setAllMessages] = useState([]);
  // const [myMsgs, setMyMsgs] = useState([]);
  const [myConversations, setMyConversations] = useState([]);
  const [status, setStatus] = useState("loading");
  const [msg, setMsg] = useState("");
  // const [msgStatus, setMsgStatus] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);

  // get the messages that owner has received for a specific ad
  const { id } = useParams();
  console.log("id **** :", id);

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
        setMyConversations(response.conversations);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(msg);

  const handleAfterSendMsg = () => {
    fetch(`/api/conversations-by-ad/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setMyConversations(response.conversations);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
    setMsg("");
  };

  console.log(myConversations);
  return (
    <>
      My messages
      <h5>
        {status === "idle" &&
          myConversations.map((conversation, index) => {
            return (
              <div key={index}>
                <h4>{conversation.buyer} is interested in your car</h4>
                <h4>your ad id is : {conversation.adId} </h4>
                <h4>your conversation id is : {conversation._id} </h4>
                {conversation.messages.map((msg) => {
                  console.log("msg +++++", msg);
                  return (
                    <>
                      {/* rendering all messages */}
                      {/* user or id */}
                      <h2>{msg.user}</h2>
                      <h2>{msg.body}</h2>
                      <h2>{msg.date}</h2>
                    </>
                  );
                })}
                <label>send message:</label>
                <textArea
                  type="text"
                  placeholder="You can type here"
                  value={msg}
                  onChange={(ev) => setMsg(ev.target.value)}
                ></textArea>
                <button
                  onClick={(ev) => {
                    ev.preventDefault();
                    console.log("working&&&&&&");
                    if (msg) {
                      fetch(`/api/update-conversation/${conversation._id}`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                        body: JSON.stringify({
                          messages: {
                            user: currentUser.email,
                            body: msg,
                            date: moment().format("h:mm A - MMMM Do, YYYY"),
                          },
                        }),
                      })
                        .then((res) => res.json())
                        .then((response) => {
                          if (response) {
                            console.log(response);
                            // localStorage.setItem("_id", response._id);
                            handleAfterSendMsg();
                          }
                        });
                    }
                  }}
                >
                  Send Message
                </button>
              </div>
            );
          })}
      </h5>
    </>
  );
};
export default MyMessages;
