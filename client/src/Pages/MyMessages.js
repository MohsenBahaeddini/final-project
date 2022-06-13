import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import styled from "styled-components";
import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import moment from "moment";

const MyMessages = () => {

  const [myConversations, setMyConversations] = useState([]);
  const [status, setStatus] = useState("loading");
  const [msg, setMsg] = useState("");
  
  const [chat, setChat] = useState({});
  const [chatId, setChatId] = useState("");
  const [chatStatus, setChatStatus] = useState("loading");
  const { currentUser } = useContext(CurrentUserContext);

  // get the messages that owner has received for a specific ad
  const { id } = useParams();
  console.log("id **** :", id);

  useEffect(() => {
    fetch(`/api/conversations-by-ad/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setMyConversations(response.conversations);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/conversation-by-id/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("__________ ---", response);
        setChat(response.conversation);
        setChatStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chatId]);

  console.log("chatId ^^^^^^^^", chatId);
  const handleAfterSendMsg = () => {
    console.log("chatId ++++++++++++ :", chatId);
    fetch(`/api/conversation-by-id/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setChat(response.conversation);
        setChatStatus("idle");
      })
      .catch((err) => {
        console.log(err);
      });
    setMsg("");
  };

  console.log("myConversations ::: ", myConversations);
  return (
    <>
      <Wrapper>
        <div>
          <h3>All messages for the specific ad</h3>
          <h5>
            {status === "idle" &&
              myConversations.map((conversation, index) => {
                return (
                  <div key={index}>
                    <h4>Message from :{conversation.buyer}</h4>
                    <button
                      onClick={(ev) => {
                        ev.preventDefault();
                        fetch(`/api/conversation-by-id/${conversation._id}`, {
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                        })
                          .then((res) => res.json())
                          .then((response) => {
                            console.log(response);
                            setChat(response.conversation);
                            console.log("chat >>>>", chat);
                            setChatId(response.conversation._id);
                            setChatStatus("idle");
                            console.log("chatId ****************** ", chatId);
                          });
                      }}
                    >
                      check this chat
                    </button>
                  </div>
                );
              })}
          </h5>
        </div>
        <Div>
          <h3>
            section that displays the messages when user clicks on the
            conversation
          </h3>
          {chatStatus === "idle" && chat && (
            <>
              <h1>message from : {chat.buyer}</h1>
              {chat.messages.map((message) => {
                console.log(message);
                return (
                  <>
                    <h1>{message.user}</h1>
                    <h1>{message.body}</h1>
                    <h1>{message.date}</h1>
                  </>
                );
              })}
              <label>send message:</label>
              <textArea
                type="text"
                placeholder="You can type here"
                value={msg}
                onChange={(ev) => setMsg(ev.target.value)}
              ></textArea>
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  console.log("working&&&&&&");
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
              </button>
            </>
          )}
        </Div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
const Div = styled.div`
  border: 1px solid #fff;
`;
export default MyMessages;
