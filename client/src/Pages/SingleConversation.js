import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";

const SingleConversation = () => {
  const [conversation, setConversation] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);

  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);
  //   console.log(currentUser);

  const { id } = useParams();
  console.log("id &&&& :", id);

  useEffect(() => {
    fetch(`/api/conversation-by-id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setConversation(response.conversation);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const handleAfterSendMsg = () => {
    fetch(`/api/conversation-by-id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setConversation(response.conversation);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    setMsg("");
  };

  console.log("conversation.messages ::", conversation.messages);
  if (error) {
    return <ErrorPage />;
  }
  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <Wrapper>
      {status === "idle" && conversation && (
        <>
          <Container>
            <Title>Message {conversation.seller}</Title>

            {conversation.messages.map((message, index) => {
              console.log(message);
              return (
                <>
                  <Div
                    key={index}
                    className={
                      message.user === conversation.seller ? "me" : "seller"
                    }
                  >
                    <Div2>
                      <h2> {message.user}</h2>
                      <h2>{message.body}</h2>
                      <h2>{message.date}</h2>
                    </Div2>
                  </Div>
                </>
              );
            })}
            <Div3>
              <textarea
                type="text"
                placeholder="Type your message here"
                value={msg}
                onChange={(ev) => setMsg(ev.target.value)}
              ></textarea>
              <Button
                onClick={(ev) => {
                  ev.preventDefault();
                  console.log("working&&&&&&");
                  if (msg) {
                    fetch(`/api/update-conversation/${conversation._id}`, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        messages: {
                          user: currentUser.email,
                          body: msg,
                          date: moment().format("h:mm A - MMMM Do, YYYY"),
                        },
                      }),
                    })
                      .then((res) => res.json())
                      .then((response) => {
                        if (response) {
                          console.log(response);
                          // localStorage.setItem("_id", response._id);
                          handleAfterSendMsg();
                        }
                      });
                  }
                }}
              >
                Send Message
              </Button>
            </Div3>
          </Container>
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #fff;
  margin: 40px 40px 40px calc(100vw / 3.7);
  padding: 20px;
  max-width: 600px;
`;
const Title = styled.h1`
  padding-bottom: 10px;
  border-bottom: 1px solid #fff;
  margin-bottom: 10px;
`;
const Container = styled.div`
  /* border: 1px solid #fff; */
`;
const Div = styled.div`
  display: flex;
  /* flex-direction: column; */
  &.me {
    justify-content: right;
  }
  &.seller {
    justify-content: left;
  }
`;
const Div2 = styled.div`
  max-width: 250px;
  word-break: break-all;
`;
const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0;
`;
const Button = styled.button`
  color: var(--color-blue);
  font-size: 18px;
  padding: 5px 200px;
  margin-top: 5px;
`;
export default SingleConversation;
