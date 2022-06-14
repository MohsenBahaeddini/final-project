import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";

import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";

const MyConversations = () => {
  // conversations as buyer
  const [conversations, setConversations] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);

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
        setError(true);
      });
  }, []);

  // const handleAfterSendMsg = () => {
  //   fetch(`/api/conversations-by-buyers/${id}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log(response);
  //       setConversations(response.conversations);
  //       setStatus("idle");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setMsg("");
  // };
  if (error) {
    return <ErrorPage />;
  }
  console.log("conversations ::::", conversations);
  return (
    <>
      <Wrapper>
        <Title>My Messages to Sellers</Title>

        <h5>
          {status === "loading" && <LoadingSpinner />}

          {status === "idle" &&
            conversations &&
            conversations.map((conversation, index) => {
              console.log("conversation ::##", conversation);
              return (
                <div key={index}>
                  <h2>
                    <h2>
                      You were interested in
                      <StyledNavLink to={`/ad/${conversation.adId}`}>
                        <span>this ad</span>
                      </StyledNavLink>
                    </h2>
                    <StyledNavLink to={`/conversation/${conversation._id}`}>
                      <h2>check your messages to {conversation.seller}</h2>
                    </StyledNavLink>
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
  border-bottom: 1px solid var(--color-blue);
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
