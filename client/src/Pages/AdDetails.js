import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
// import { IoCheckmarkCircleSharp } from "react-icons/Io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCheckmarkCircleOutline, IoCloseCircle } from "react-icons/io5";
import { FcCheckmark } from "react-icons/fc";
import { RiCloseCircleLine } from "react-icons/ri";
const AdDetails = () => {
  const [ad, setAd] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  console.log("currentUser******", currentUser);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`/api/ad/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setAd(response.ad);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  console.log(ad);
  const sendMessage = (ev) => {
    ev.preventDefault();
    console.log("working");
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
            console.log(response);
          }
        });
    }
  };
  console.log(msg);

  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }

  // having issue when loading
  console.log(" ^^^^^^^^^^", ad.imageUrl);
  console.log(ad);
  return (
    <>
      <Wrapper>
        {status === "idle" &&
          ad &&
          ad.imageUrl.map((url, index) => {
            console.log(url, index);
            return <Img src={url} key={index} />;
          })}
        <Container>
          <Details>
            <H1>
              {ad.year} {ad.make} {ad.model} {ad.type}
            </H1>
            <H1>Features & Options</H1>
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
                    <RiCloseCircleLine></RiCloseCircleLine>
                  )}
                  Air conditioning
                </H2>
                <H2>
                  {ad.alloyWheels ? (
                    <IoIosCheckmarkCircle
                      style={{
                        color: "green",
                        fontSize: "22px",
                      }}
                    ></IoIosCheckmarkCircle>
                  ) : (
                    <RiCloseCircleLine></RiCloseCircleLine>
                  )}
                  Alloy wheels
                </H2>
                <H2>
                  {ad.bluetooth ? "✔" : <RiCloseCircleLine></RiCloseCircleLine>}{" "}
                  Bluetooth
                </H2>
              </Div4>
              <Div4>
                <H2>
                  {ad.heatedSeats ? (
                    "✔"
                  ) : (
                    <RiCloseCircleLine></RiCloseCircleLine>
                  )}{" "}
                  Heated seats
                </H2>
                <H2>
                  {ad.navigationSystem ? (
                    "✔"
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
                    "✔"
                  ) : (
                    <IoCloseCircle
                      style={{
                        color: "red",
                        fontSize: "22px",
                      }}
                    ></IoCloseCircle>
                  )}
                  Stability control
                </H2>
              </Div4>
            </Div3>
            <H2>Descriptions</H2>
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
              <Button onClick={sendMessage}>Send</Button>
            </Div>
          )}
        </Container>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  /* min-width: calc(100vw / 3.5); */
  /* border: 1px solid #ddd; */
  margin: 80px;
  /* justify-content: space-between; */
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
  /* align-items: center; */
`;
const H1 = styled.h1`
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
`;
const H2 = styled.h2`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const Description = styled.p`
  padding-top: 10px;
  color: #ddd;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  padding: 10px 10px 60px 10px;
`;
const Button = styled.button`
  cursor: pointer;
  color: var(--color-blue);
  margin-top: 10px;
`;
export default AdDetails;
