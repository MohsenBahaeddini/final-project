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
            conversations &&
            conversations.map((conversation, index) => {
              console.log("conversation ::##", conversation);
              return (
                <div key={index}>
                  <h2>
                    <H2>
                      Your
                      <StyledNavLink to={`/conversation/${conversation._id}`}>
                        <Span>messages</Span>
                      </StyledNavLink>
                      for
                      <StyledNavLink to={`/ad/${conversation.adId}`}>
                        <Span>this ad</Span>
                      </StyledNavLink>
                      !
                    </H2>
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
  min-width: calc(100vw / 3.5);
  border: 1px solid #ddd;
  margin: 10px;
  min-height: 230px;
  height: fit-content;
  padding-bottom: 5px;
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
  font-size: 12px;
  text-decoration: none;
  outline: none;

  &:hover {
    color: var(--color-blue);
  }
`;
const Span = styled.span`
  font-size: 16px;
`;

const H2 = styled.h2`
  padding-top: 10px;
`;
const H3 = styled.h3`
  font-size: 16px;
  padding-bottom: 10px;
  margin-top: -10px;
  &:hover {
    color: var(--color-blue);
  }
`;
export default MyConversations;
