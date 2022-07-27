import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const SavedAdDetails = ({ adId, userId, updateMySavedAdsAfterDelete }) => {

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
        setError(true);
      });
  }, []);

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <>
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

const Div1 = styled.div`
  display: flex;
  margin: 10px 0 10px -10px;
  @media (max-width: 420px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Div2 = styled.div`
  margin: 20px 20px 20px 0px;
  display: flex;
  flex-direction: column;
  @media (max-width: 420px) {
    margin: 10px 10px 20px 10px;
  }
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
const H2 = styled.h2`
  padding-top: 10px;
  color: #fff;
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
  @media (max-width: 420px) {
    width: 280px;
    height: 210px;
  }
`;
export default SavedAdDetails;
