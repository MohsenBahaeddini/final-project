import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import moment from "moment";
import ErrorPage from "./ErrorPage";
import LoadingSpinner from "./LoadingSpinner";
import MsgSent from "./MsgSent";
import MsgReceived from "./MsgRecieved";

const MyMessages = () => {
  const [myConversations, setMyConversations] = useState([]);
  const [status, setStatus] = useState("loading");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const [chat, setChat] = useState({});
  const [chatId, setChatId] = useState("");
  const [chatStatus, setChatStatus] = useState("loading");

  const [active, setActive] = useState();
  const { currentUser } = useContext(CurrentUserContext);

  const { id } = useParams();
 
  // get the messages that owner has received for a specific ad
  useEffect(() => {
    fetch(`/api/conversations-by-ad/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        
        setMyConversations(response.conversations);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  // Get conversation by id 
  useEffect(() => {
    fetch(`/api/conversation-by-id/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        
        setChat(response.conversation);
        setChatStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [chatId]);

  // re-fetch messages once the new msg has been sent and dispaly on screen 
  const handleAfterSendMsg = () => {
    fetch(`/api/conversation-by-id/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
       
        setChat(response.conversation);
        setChatStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
    setMsg("");
  };
  if (error) {
    return <ErrorPage />;
  }
  if (status === "loading") {
    return <LoadingSpinner />;
  }
 
  return (
    <>
      <Wrapper>
        <Preview>
          <Title>My Chats</Title>
          
          <h5>
            {status === "idle" &&
              myConversations.map((conversation, index) => {
                return (
                  <Chat key={index}>
                    
                    <Email
                      
                      id={conversation.id}
                      className={
                        active === conversation.id ? "inactive" : "active"
                      }
                      onClick={(ev) => {
                        console.log(ev);
                        ev.preventDefault();
                        fetch(`/api/conversation-by-id/${conversation._id}`, {
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                        })
                          .then((res) => res.json())
                          .then((response) => {
                                                        setChat(response.conversation);
                                                        setChatId(response.conversation._id);
                            setChatStatus("idle");
                            
                          });
                        setActive(ev.target.id);
                      }}
                    >
                      {conversation.buyer}
                    </Email>
                  </Chat>
                );
              })}
          </h5>
        </Preview>
        
        <Div>
          <Title>Messages</Title>
          
          {chatStatus === "idle" && chat && (
            <>
             
              {chat.messages.map((message, index) => {
                console.log(message);
                return (
                  <>
                    <Div4
                      key={index}
                      className={message.user === chat.buyer ? "buyer" : "me"}
                    >
                      <Div5
                        className={message.user === chat.buyer ? "buyer" : "me"}
                      >
                        <User
                          className={
                            message.user === chat.buyer ? "buyer" : "me"
                          }
                        >
                          {message.user}
                        </User>
                        <Body
                          className={
                            message.user === chat.buyer ? "buyer" : "me"
                          }
                        >
                          {message.body}
                        </Body>
                        <Date
                          className={
                            message.user === chat.buyer ? "buyer" : "me"
                          }
                        >
                          {message.date}
                        </Date>
                      </Div5>
                      <Bubble>
                        {message.user === chat.buyer && <MsgSent />}
                      </Bubble>
                      <BubbleSent>
                        {message.user !== chat.buyer && <MsgReceived />}
                      </BubbleSent>
                    </Div4>
                  </>
                );
              })}
              <Div6>
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
                      fetch(`/api/update-conversation/${chat._id}`, {
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
                            setChatId(chat._id);
                            handleAfterSendMsg();
                          }
                        });
                    }
                  }}
                >
                  Send Message
                </Button>
              </Div6>
            </>
          )}
        </Div>
        
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 40px;
`;

const Preview = styled.div`
  border: 1px solid #ddd;
  margin: 10px;
  min-width: calc(100vw / 3);
  max-width: calc(100vw / 3);
  min-height: 600px;
`;
const Chat = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Main = styled.div``;
const Div = styled.div`
  border: 1px solid #ddd;
  min-width: calc(100vw / 3);
  max-width: calc(100vw / 3);
  min-height: 600px;
  margin: 10px;
`;
const Div4 = styled.div`
  display: flex;
  padding: 5px;
  margin: 0 20px;
  &.me {
    justify-content: left;
  }
  &.buyer {
    justify-content: right;
  }
`;
const Div5 = styled.div`
  border: 1px solid #ddd;
  border-radius: 20px;
  word-break: break-all;

  padding: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  &.me {
    background-color: #c7e6f0;
  }
  &.buyer {
  }
`;
const Bubble = styled.div`
  position: absolute;
  left: 1155px;
  z-index: -1;
  margin-top: 50px;
`;
const BubbleSent = styled.div`
  position: absolute;
  left: 757px;
  z-index: -1;
  margin-top: 50px;
`;
const User = styled.h2`
  font-size: 14px;
  padding-bottom: 5px;
  &.me {
    display: flex;
    justify-content: left;
    color: #59c0e3;
  }
  &.buyer {
    display: flex;
    justify-content: right;
    color: var(--color-yellow);
  }
`;
const Body = styled.h2`
  font-size: 16px;
  color: var(--color-dark-blue);
  padding-bottom: 5px;
  &.me {
    display: flex;
    justify-content: left;
  }
  &.buyer {
    display: flex;
    justify-content: right;
  }
`;
const Date = styled.h2`
  font-size: 12px;
  color: var(--color-dark-blue);
  padding-bottom: 5px;
  &.me {
    display: flex;
    justify-content: left;
  }
  &.buyer {
    display: flex;
    justify-content: right;
  }
`;
const Div6 = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  border-bottom: 1px solid var(--color-blue);
  padding: 5px 5px 10px 5px;
  margin: 20px;
  text-align: left;
  font-size: 18px;
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
const Email = styled.button`
  cursor: pointer;
  color: #fff;
  padding: 3px 20px;
  font-size: 16px;
  margin: 20px 5px 5px 20px;
  background-color: var(--color-dark-blue);
  border: none;

  &:hover {
    color: var(--color-blue);
    font-size: 16px;
  }

  &:focus {
    color: var(--color-yellow);
    font-size: 16px;
  }
`;
const TextArea = styled.textarea`
  padding: 10px 10px 40px 10px;
  margin: 20px;
  font-size: 14px;
  outline: none;
`;
export default MyMessages;
