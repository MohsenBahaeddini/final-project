import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
const SavedAdDetails = ({ adId, userId, updateMySavedAdsAfterDelete }) => {
  console.log(adId, userId);
  const [savedAd, setSavedAd] = useState();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`/api/ad/${adId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setSavedAd(response.ad);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  // const updateMySavedAdsAfterDelete = () => {
  //   fetch(`/api/ad/${adId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setSavedAd(response.ad);
  //       setStatus("idle");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(true);
  //     });
  // };

  console.log(savedAd);
  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <>
      {/* <Title>My Favorite List</Title> */}
      {status === "idle" && savedAd && (
        <>
          <Div1>
            <StyledNavLink to={`/ad/${savedAd._id}`}>
              <Img src={savedAd.imageUrl[0]} />
            </StyledNavLink>
            <Div2>
              <H2>
                {savedAd.year} {savedAd.type} {savedAd.make} {savedAd.model}
              </H2>
              <Button
                onClick={(ev) => {
                  ev.preventDefault();
                  fetch(`/api/delete-saved-ad/${savedAd._id}`, {
                    method: "DELETE",
                  })
                    .then((res) => res.json())
                    .then((response) => {
                      console.log(response);
                      localStorage.removeItem("isSaved");
                    });
                  updateMySavedAdsAfterDelete();
                }}
              >
                Delete
              </Button>
            </Div2>
          </Div1>
        </>
      )}
    </>
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
const Div1 = styled.div`
  display: flex;
  margin: 10px 0 10px -10px;

  /* overflow: hidden;
  overflow-y: scroll; */
`;
const Div2 = styled.div`
  margin: 20px 20px 20px 0px;
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  cursor: pointer;
  font-size: 15px;
  color: var(--color-darkGrey);
  margin-top: 10px;
  &:hover {
    transform: scale(1.01, 1.01);
    outline: none;
  }
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
export default SavedAdDetails;
