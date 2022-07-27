import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";
import ConversationDetails from "./ConversationDetails";

const MyConversations = () => {
  /**
   ** conversations as buyer */
  const [conversations, setConversations] = useState([]);
  const [ads, setAds] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const { id } = useParams();

  /**
   ** Get all my conversations as buyer */
  useEffect(() => {
    fetch(`/api/conversations-by-buyers/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setConversations(response.conversations);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);
  let adsId;

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Wrapper>
        <Title>My Messages to Sellers</Title>

        <h5>
          {status === "loading" && <LoadingSpinner />}

          {status === "idle" &&
            (conversations && conversations.length ? (
              conversations.map((conversation, index) => {
                adsId = conversation.adId;
                const sellerName = conversation.seller.split("@", 1);
                return (
                  <ConversationDetails
                    conversationId={conversation._id}
                    sellerName={sellerName}
                    adsId={adsId}
                  />
                );
              })
            ) : (
              <H2>No Messages Yet!</H2>
            ))}
        </h5>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  width: 402px;
  min-width: 402px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px;
  min-height: 250px;
  height: fit-content;
  background: var(--color-darkGrey);
  padding-bottom: 5px;
  max-height: 250px;
  @media (max-width: 420px) {
    min-width: 330px;
    width: 330px;
  }
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #bbbbbb;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #3d4247;
  }
`;

const Title = styled.h2`
  border-bottom: 1px solid var(--color-blue);
  padding: 5px;
  color: #fff;
  margin: 20px;
  text-align: left;
`;

const H2 = styled.h2`
  padding-top: 10px;
  color: #fff;
`;

export default MyConversations;
