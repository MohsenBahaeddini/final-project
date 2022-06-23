import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RiCloseCircleLine } from "react-icons/ri";
import LoadingSpinner from "./LoadingSpinner";
import SlideShow from "./SlideShow";
import { useHistory } from "react-router-dom";

const AdDetails = () => {
  const [ad, setAd] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  const history = useHistory();

  const { id } = useParams();
  // Get the specific ad by Id
  useEffect(() => {
    fetch(`/api/ad/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setAd(response.ad);
        console.log(ad);
        setStatus("idle");
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  // Create new conversation between user(buyer) and seller when a msg is written and sendMsg is clicked
  const sendMessage = (ev) => {
    ev.preventDefault();
    if (msg) {
      fetch("/api/new-conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              user: currentUser.email,
              body: msg,
              date: moment().format("h:mm A - MMMM Do, YYYY"),
            },
          ],
          buyer: currentUser.email,
          buyerId: currentUser.sub,
          seller: ad.owner,
          adId: id,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response) {
            setMsg("");
            // take the user to the profile page to see his/her msg to seller
            history.push(`/profile/${currentUser.sub}`);
          }
        });
    }
  };

  // Display errorPage if an error occurred
  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }
  // Display loadingSpinner when the page is loading
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // Display adDetails once the page is loaded
  return (
    <>
      <Wrapper>
        {status === "idle" && ad && <SlideShow imgs={ad.imageUrl} />}

        <Container>
          <Details>
            <H1>
              {ad.year} {ad.make} {ad.model} {ad.type}
            </H1>
            <Features>Features & Options</Features>
            <Div3>
              <Div4>
                <H2>
                  {ad.airConditioning ? (
                    <IoCheckmarkCircleOutline
                      style={{
                        color: "green",
                        fontSize: "22px",
                      }}
                    ></IoCheckmarkCircleOutline>
                  ) : (
                    <RiCloseCircleLine
                      style={{
                        color: "red",
                        fontSize: "22px",
                      }}
                    ></RiCloseCircleLine>
                  )}
                  Air conditioning
                </H2>
                <H2>
                  {ad.alloyWheels ? (
                    <IoCheckmarkCircleOutline
                      style={{
                        color: "green",
                        fontSize: "22px",
                      }}
                    ></IoCheckmarkCircleOutline>
                  ) : (
                    <RiCloseCircleLine
                      style={{
                        color: "red",
                        fontSize: "22px",
                      }}
                    ></RiCloseCircleLine>
                  )}
                  Alloy wheels
                </H2>
                <H2>
                  {ad.bluetooth ? (
                    <IoCheckmarkCircleOutline
                      style={{
                        color: "green",
                        fontSize: "22px",
                      }}
                    ></IoCheckmarkCircleOutline>
                  ) : (
                    <RiCloseCircleLine
                      style={{
                        color: "red",
                        fontSize: "22px",
                      }}
                    ></RiCloseCircleLine>
                  )}{" "}
                  Bluetooth
                </H2>
              </Div4>
              <Div4>
                <H2>
                  {ad.heatedSeats ? (
                    <IoCheckmarkCircleOutline
                      style={{
                        color: "green",
                        fontSize: "22px",
                      }}
                    ></IoCheckmarkCircleOutline>
                  ) : (
                    <RiCloseCircleLine
                      style={{
                        color: "red",
                        fontSize: "22px",
                      }}
                    ></RiCloseCircleLine>
                  )}
                  Heated seats
                </H2>
                <H2>
                  {ad.navigationSystem ? (
                    <IoCheckmarkCircleOutline
                      style={{
                        color: "green",
                        fontSize: "22px",
                      }}
                    ></IoCheckmarkCircleOutline>
                  ) : (
                    <RiCloseCircleLine
                      style={{
                        color: "red",
                        fontSize: "22px",
                      }}
                    ></RiCloseCircleLine>
                  )}
                  Navigation system
                </H2>
                <H2>
                  {ad.stabilityControl ? (
                    <IoCheckmarkCircleOutline
                      style={{
                        color: "green",
                        fontSize: "22px",
                      }}
                    ></IoCheckmarkCircleOutline>
                  ) : (
                    <RiCloseCircleLine
                      style={{
                        color: "red",
                        fontSize: "22px",
                      }}
                    ></RiCloseCircleLine>
                  )}
                  Stability control
                </H2>
              </Div4>
            </Div3>
            <Desc>Descriptions</Desc>
            <Description>{ad.description}</Description>
          </Details>
          {currentUser && (
            <Div>
              <H1>Message the owner</H1>
              <TextArea
                type="text"
                placeholder="Hi, this car looks intersting! Is it still available?"
                value={msg}
                onChange={(ev) => setMsg(ev.target.value)}
              ></TextArea>
              <Button disabled={!msg ? true : false} onClick={sendMessage}>
                Send
              </Button>
            </Div>
          )}
        </Container>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin: 80px;
  max-height: 500px;
`;
const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  border: 1px solid #ddd;
  margin: 0 40px;
  min-width: 500px;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 650px;
  height: 500px;
  padding: 2px;
  border: 2px solid var(--color-blue);
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const Div3 = styled.div`
  display: flex;
  flex-direction: row;
`;
const Div4 = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 70px;
`;
const H1 = styled.h1`
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
  font-size: 16px;
`;
const Features = styled.h1`
  display: flex;
  justify-content: left;
  margin: 10px 0;
  font-size: 16px;
`;
const H2 = styled.h2`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-top: 5px;
  font-size: 14px;
`;

const Desc = styled.h2`
  display: flex;
  justify-content: left;
  align-items: center;
  padding-top: 5px;
  margin-top: 10px;
  font-size: 16px;
`;
const Description = styled.p`
  padding-top: 10px;
  color: #ddd;
  font-size: 14px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  padding: 10px 10px 60px 10px;
  font-size: 14px;
  outline: none;
`;
const Button = styled.button`
  cursor: pointer;
  color: var(--color-dark-blue);
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid #fff;
  &:disabled {
    background-color: grey;
    border: 1px solid grey;
    cursor: auto;
  }
  &:hover:enabled {
    transform: scale(1.01, 1.01);
    outline: none;
    border-radius: 2px;
    border: 1px solid #fff;
  }
`;
export default AdDetails;
