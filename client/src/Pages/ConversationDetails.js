import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
const ConversationDetails = ({ conversationId, sellerName, adsId }) => {
  const [ads, setAds] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    fetch(`/api/ad/${adsId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.ad);
        setAds(response.ad);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <Div>
      {status === "idle" && ads && (
        <>
          <Div2>
            <StyledNavLink to={`/conversation/${conversationId}`}>
              <Span>Message {sellerName}</Span>
            </StyledNavLink>
            <H2>
              {ads.year} {ads.type} {ads.make} {ads.model}
            </H2>
          </Div2>
          <Div3>
            <StyledNavLink to={`/ad/${adsId}`}>
              <Img src={ads.imageUrl[0]} />
            </StyledNavLink>
          </Div3>
        </>
      )}
    </Div>
  );
};
const Wrapper = styled.div`
  min-width: calc(100vw / 3.5);
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px;
  min-height: 230px;
  height: fit-content;
  background: var(--color-darkGrey);
  padding-bottom: 5px;
`;
const Div = styled.div`
  display: flex;
  margin-top: -10px;

  justify-content: center;
  margin-bottom: 30px;
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 15px;
`;
const Div3 = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  margin-top: 15px;
`;
const Img = styled.img`
  width: 200px;
  height: 130px;
  margin: 5px 20px -5px 20px;
  padding: 2px;
  border: 1px solid var(--color-blue);
  border-radius: 10px;
  &:hover {
    transform: scale(1.02);
  }
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
  padding-top: 20px;
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
export default ConversationDetails;
