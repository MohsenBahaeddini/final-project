import { useEffect, useState} from "react";
import SavedAdDetails from "./SavedAdDetails";
import styled from "styled-components";
import { useParams} from "react-router-dom";

const SavedAds = ({ user }) => {
  const [savedAds, setSavedAds] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    {
      fetch(`/api/saved-ads-by-user/${id}`, {
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
          setError(true);
        });
    }
  }, []);

  const updateMySavedAdsAfterDelete = () => {
    {
      fetch(`/api/saved-ads-by-user/${id}`, {
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
          setError(true);
        });
    }
  };
  return (
    <>
      <Wrapper>
        <Title>My Favorite List</Title>
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
    margin-bottom: 40px;
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
