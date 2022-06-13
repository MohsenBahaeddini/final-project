import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
import styled from "styled-components";

const SingleConversation = () => {
  const [conversation, setConversation] = useState({});
  const [status, setStatus] = useState("loading");
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  //   console.log(currentUser);

  const { id } = useParams();
  console.log("id &&&& :", id);

  useEffect(() => {
    fetch(`/api/conversation-by-id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setConversation(response.conversation);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   if (status === "loading") {
  //     return <>Loading ...</>;
  //   }

  const handleAfterSendMsg = () => {
    fetch(`/api/conversation-by-id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setConversation(response.conversation);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
    setMsg("");
  };

  console.log("conversation.messages ::", conversation.messages);
  return (
    <>
      <h1>Single conversation</h1>
      {status === "idle" && conversation && (
        <>
          <h2>Message seller: {conversation.seller}</h2>
          {conversation.messages.map((message) => {
            console.log(message);
            return (
              <>
                <h2>{message.body}</h2>
              </>
            );
          })}
          <label>send message:</label>
          <textarea
            type="text"
            placeholder="You can type here"
            value={msg}
            onChange={(ev) => setMsg(ev.target.value)}
          ></textarea>
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
        </>
      )}

      {/* {status === " idle" &&
        conversation &&
        conversation.messages.map((msg, index) => {
          console.log("msg", msg);
          //   return (
          <div key={index}>
            <h3>msg.body</h3>
          </div>;
          //   );
        })} */}
    </>
  );
};
export default SingleConversation;
