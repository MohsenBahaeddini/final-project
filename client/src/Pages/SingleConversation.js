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
              <Seller> {conversation.seller.split("@", 1)}</Seller>
            </Chat>
            <ChatContainer2>
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
                            message.user === conversation.seller
                              ? "me"
                              : "seller"
                          }
                        >
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
                          <Bubble>
                            {message.user === conversation.seller && (
                              <MsgSent />
                            )}
                          </Bubble>
                          <BubbleSent>
                            {message.user !== conversation.seller && (
                              <MsgReceived />
                            )}
                          </BubbleSent>
                        </Div2>
                        {message.user === conversation.seller && (
                          <User
                            className={
                              message.user === conversation.seller
                                ? "me"
                                : "seller"
                            }
                          >
                            {message.user.split("@", 1)}
                          </User>
                        )}
                      </Div>
                    </>
                  );
                })}
              </ChatContainer>
            </ChatContainer2>
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
  background-color: var(--color-darkGrey);
  border: 1px solid #fff;
  border-radius: 10px;
  margin: 40px 40px 40px calc(100vw / 3.7);
  padding: 20px;
  max-width: 600px;

  height: 78vh;
`;
const Title = styled.h1`
  padding: 10px 10px 0 10px;
  margin-bottom: 10px;
  color: #fff;
`;
const Seller = styled.h1`
  padding: 10px 10px 0 10px;
  text-align: right;
  margin-bottom: 10px;
  color: #fff;
`;
const Chat = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px -10px 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-blue);
`;
const Container = styled.div`
  height: 500px;
`;
const Div = styled.div`
  position: relative;
  display: flex;
  padding: 5px;
  margin: 0 20px 0 0;

  &.me {
    justify-content: right;
  }
  &.seller {
    justify-content: left;
  }
`;
const ChatContainer2 = styled.div`
  /* display: flex;
  flex-direction: column;
  height: 50vh;
  overflow-y: scroll;
  scrollbar-width: thin;
  scroll-behavior: smooth; */
  overflow-y: hidden;
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 50vh;
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
const Bubble = styled.div`
  position: absolute;
  bottom: -9px;
  right: 0px;
`;
const BubbleSent = styled.div`
  position: absolute;
  bottom: -9px;
  left: 0px;
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
  position: relative;
  margin: 20px -30px 0 0;
  padding: 10px 10px 5px 10px;
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
  opacity: 0.7;
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
  margin: -15px -20px 10px -20px;
`;

const TextArea = styled.textarea`
  padding: 10px 10px 40px 10px;
  margin: 20px;
  min-width: 550px;
  font-size: 14px;
`;
const Button = styled.button`
  cursor: pointer;
  color: #fff;
  /* color: var(--color-darkGrey); */
  padding: 3px 20px;
  border-radius: 10px;
  font-size: 16px;
  margin: -18px 20px 20px 20px;
  background-color: var(--color-dark-blue);
  /* background-color: #fff; */

  border: none;
`;
export default SingleConversation;
