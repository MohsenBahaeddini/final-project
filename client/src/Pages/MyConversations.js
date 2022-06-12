import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";

import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
import styled from "styled-components";

const MyConversations = () => {
  // conversations as buyer
  const [conversations, setConversations] = useState([]);
  const [status, setStatus] = useState("loading");
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  const { id } = useParams();
  console.log("id in myconversation :", id);
  useEffect(() => {
    fetch(`/api/conversations-by-buyers/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setConversations(response.conversations);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAfterSendMsg = () => {
    fetch(`/api/conversations-by-buyers/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setConversations(response.conversations);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
    setMsg("");
  };

  console.log(conversations);
  return (
    <>
      <Wrapper>
        <Title>My Messages to Sellers</Title>
        <h5>
          {status === "idle" &&
            conversations &&
            conversations.map((conversation, index) => {
              console.log(conversation);
              return (
                <div key={index}>
                  {conversation.messages.map((msg) => {
                    console.log(msg);
                    return (
                      <>
                        <h4>{msg.body}</h4>
                        <h4>{msg.date}</h4>
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
export default MyConversations;
