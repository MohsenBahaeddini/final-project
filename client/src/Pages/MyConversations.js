import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";

import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";
import ConversationDetails from "./ConversationDetails";

const MyConversations = () => {
  // conversations as buyer
  const [conversations, setConversations] = useState([]);
  const [ads, setAds] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const { id } = useParams();

  // Get all my conversations as buyer
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
  const sellersAd = () => {
    fetch(`/api/ad/${adsId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        setAds(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   sellersAd();
  // });
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
                // console.log(conversation);
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
  min-width: calc(100vw / 3.5);
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px;
  min-height: 250px;
  height: fit-content;
  max-height: 550px;
  background: var(--color-darkGrey);
  padding-bottom: 5px;
`;
const Div = styled.div`
  display: flex;
  justify-content: left;
  padding-left: 15px;
`;
const Title = styled.h2`
  border-bottom: 1px solid var(--color-blue);
  padding: 5px;
  color: #fff;
  margin: 20px;
  text-align: left;
`;

const StyledNavLink = styled(NavLink)`
  color: #ddd;
  margin-left: 10px;
  font-size: 12px;
  text-decoration: none;
  outline: none;

  &:hover {
    color: var(--color-blue);
  }
`;
const Span = styled.span`
  font-size: 16px;
  color: #fff;
  &:hover {
    color: var(--color-blue);
  }
`;

const H2 = styled.h2`
  padding-top: 10px;
  color: #fff;
`;
const H3 = styled.h3`
  font-size: 16px;
  padding-bottom: 10px;
  margin-top: -10px;
  color: #fff;

  &:hover {
    color: var(--color-blue);
  }
`;
export default MyConversations;
