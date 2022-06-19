import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import moment from "moment";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";
import MsgSent from "./MsgSent";
import MsgReceived from "./MsgRecieved";

const SingleConversation = () => {
  const [conversation, setConversation] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  const { id } = useParams();

  // Get a specific conversation by id
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

  // refetch to re-render the conversation after a new message has been sent
  const handleAfterSendMsg = () => {
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
    setMsg("");
  };

  // Display errorPage if an error occurred
  if (error) {
    return <ErrorPage />;
  }
  // Display loading page while the page is being loaded
  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <Wrapper>
      {status === "idle" && conversation && (
        <>
          <Container>
            <Chat>
              <Title>My Chat with</Title>
              <Seller> {conversation.seller}</Seller>
            </Chat>
            <ChatContainer>
              {conversation.messages.map((message, index) => {
                return (
                  <>
                    <Div
                      key={index}
                      className={
                        message.user === conversation.seller ? "me" : "seller"
                      }
                    >
                      <Div2
                        className={
                          message.user === conversation.seller ? "me" : "seller"
                        }
                      >
                        <User
                          className={
                            message.user === conversation.seller
                              ? "me"
                              : "seller"
                          }
                        >
                          {message.user}
                        </User>
                        <Body
                          className={
                            message.user === conversation.seller
                              ? "me"
                              : "seller"
                          }
                        >
                          {message.body}
                        </Body>
                        <Date
                          className={
                            message.user === conversation.seller
                              ? "me"
                              : "seller"
                          }
                        >
                          {message.date}
                        </Date>
                      </Div2>
                      {/* <Bubble> */}
                      {/* {message.user === conversation.seller && <MsgSent />} */}
                      {/* </Bubble> */}
                      {/* <BubbleSent> */}
                      {/* {message.user !== conversation.seller && <MsgReceived />} */}
                      {/* </BubbleSent> */}
                    </Div>
                  </>
                );
              })}
            </ChatContainer>
            <Div3>
              <TextArea
                type="text"
                placeholder="Type your message here"
                value={msg}
                onChange={(ev) => setMsg(ev.target.value)}
              ></TextArea>
              <Button
                onClick={(ev) => {
                  ev.preventDefault();

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
  /* max-height: calc(100vh- 800px); */
`;
const Title = styled.h1`
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
`;
const Seller = styled.h1`
  padding: 10px 10px 0 10px;
  text-align: right;
  margin-bottom: 10px;
`;
const Chat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px -10px 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-blue);
`;
const Container = styled.div``;
const Div = styled.div`
  display: flex;
  padding: 5px;
  margin: 0 20px;

  &.me {
    justify-content: right;
  }
  &.seller {
    justify-content: left;
  }
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;
const Bubble = styled.div`
  position: absolute;
  left: 891px;
  bottom: 252px;
`;
const BubbleSent = styled.div`
  left: 432px;
  position: absolute;
  right: 906px;
  margin-top: 50px;
`;
const Div2 = styled.div`
  max-width: 250px;
  word-break: break-all;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  &.seller {
    background-color: #c7e6f0;
  }
  &.me {
  }
`;

const Div4 = styled.div`
  display: flex;
  padding: 5px;
  margin: 0 20px;
  &.seller {
    justify-content: left;
  }
  &.me {
    justify-content: right;
  }
`;
const Div5 = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  &.seller {
    background-color: #c7e6f0;
  }
  &.me {
  }
`;
const User = styled.h2`
  font-size: 14px;
  padding-bottom: 5px;
  &.seller {
    display: flex;
    justify-content: left;
    color: #59c0e3;
  }
  &.me {
    display: flex;
    justify-content: right;
    color: var(--color-yellow);
  }
`;
const Body = styled.h2`
  word-break: break-all;
  font-size: 16px;
  color: var(--color-dark-blue);
  padding-bottom: 5px;
  &.seller {
    display: flex;
    justify-content: left;
  }
  &.me {
    display: flex;
    justify-content: right;
  }
`;
const Date = styled.h2`
  font-size: 12px;
  color: var(--color-dark-blue);
  padding-bottom: 5px;
  &.seller {
    display: flex;
    justify-content: left;
  }
  &.me {
    display: flex;
    justify-content: right;
  }
`;

const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px -20px 10px 0;
`;

const TextArea = styled.textarea`
  padding: 10px 280px 40px 10px;
  margin: 20px;
  font-size: 14px;
`;
const Button = styled.button`
  cursor: pointer;
  color: #fff;
  padding: 3px 20px;
  font-size: 16px;
  margin: -10px 20px 20px 20px;
  background-color: var(--color-dark-blue);
  border: none;
`;
export default SingleConversation;
