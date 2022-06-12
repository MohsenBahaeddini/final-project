import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";

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
  return (
    <>
      <Wrapper>
        {status === "idle" &&
          ad &&
          ad.imageUrl.map((url, index) => {
            console.log(url, index);
            return <img src={url} key={index} />;
          })}
        <Container>
          <h1>
            {ad.year} {ad.make} {ad.model} {ad.type}
          </h1>
          <h1>Message the owner</h1>
          <textArea
            type="text"
            placeholder="Hi, this car looks intersting! Is it still available?"
            value={msg}
            onChange={(ev) => setMsg(ev.target.value)}
          ></textArea>
          <button onClick={sendMessage}>Send</button>
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
`;
export default AdDetails;
