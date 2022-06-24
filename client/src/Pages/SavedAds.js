import { useEffect, useState } from "react";
import SavedAdDetails from "./SavedAdDetails";
import styled from "styled-components";

const SavedAds = ({ user }) => {
  const [savedAds, setSavedAds] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  //   console.log(user.sub);

  useEffect(() => {
    if (user) {
      fetch(`/api/saved-ads-by-user/${user.sub}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setSavedAds(response.savedAds);
          setStatus("idle");
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  }, []);
  console.log(savedAds);
  const updateMySavedAdsAfterDelete = () => {
    if (user) {
      fetch(`/api/saved-ads-by-user/${user.sub}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setSavedAds(response.savedAds);
          setStatus("idle");
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        });
    }
  };
  return (
    <>
      <Wrapper>
        {status === "idle" &&
          (savedAds.length ? (
            savedAds.map((savedAd) => {
              console.log(savedAd);
              return (
                <SavedAdDetails
                  adId={savedAd._id}
                  userId={savedAd.userId}
                  updateMySavedAdsAfterDelete={updateMySavedAdsAfterDelete}
                />
              );
            })
          ) : (
            <>
              <Title>My Favorite List</Title>
              <Div>
                <h2>No Saved Ad!</h2>
              </Div>
            </>
          ))}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  min-width: calc(100vw / 4.5);
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
  flex-direction: column;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  border-bottom: 1px solid var(--color-blue);
  padding: 5px;
  color: #fff;
  margin: 20px;
  text-align: left;
`;

export default SavedAds;
