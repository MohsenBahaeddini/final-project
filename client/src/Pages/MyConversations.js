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

  console.log("conversations ::::", conversations);
  return (
    <>
      <Wrapper>
        <Title>My Messages to Sellers</Title>
        <h5>
          {status === "idle" &&
            conversations &&
            conversations.map((conversation, index) => {
              console.log("conversation.messages ::##", conversation.messages);
              return (
                <div key={index}>
                  <h2>
                    <StyledNavLink to={`/conversation/${conversation._id}`}>
                      <h2>Conversation Id: {conversation._id}</h2>
                    </StyledNavLink>
                    <h2> Which ad? {conversation.adId}</h2>
                    <h2>to seller {conversation.seller}</h2>
                    {/* {conversation.messages[conversation.messages.length - 1]} */}
                  </h2>
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

const StyledNavLink = styled(NavLink)`
  color: #ddd;
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

export default MyConversations;
