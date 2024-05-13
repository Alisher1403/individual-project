import backend, { supabase } from "backend";
import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

const Chat: FC = () => {
  const { messages, currentChat, user_id } = backend.chats();
  const [input, setInput] = useState("");

  if (!user_id) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    if (currentChat) {
      supabase.from("chats").select("*").eq("vacancy_id", currentChat);
    }
  }, []);

  function send() {
    console.log(input);
    supabase.from("chats");
    setInput("");
  }

  return (
    <Container className="main-container">
      <Content>
        <Aside></Aside>
        {currentChat ? (
          <Main>
            <Header></Header>
            <Messages ref={messages.ref}>
              <div
                className="loading-animation"
                ref={messages.observer}
                data-loading={messages.loading}
              ></div>
              <ul className="messages-list">
                {messages?.list
                  ? messages.list.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="message"
                          data-self-message={item?.sender_id === user_id}
                        >
                          <div className="message-content">{item.message}</div>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </Messages>
            <Input className="input-wrapper">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <div className="content">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </form>
            </Input>
          </Main>
        ) : (
          "Select chat"
        )}
      </Content>
    </Container>
  );
};

export default Chat;

const Container = styled.div``;

const Content = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 350px auto;
  height: calc(100vh - var(--navigation-height));
`;

const Aside = styled.aside`
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  height: 100%;
  overflow-y: scroll;
`;

const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
`;

const Header = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid var(--border-color);
`;

const Messages = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 25px;
  padding: 20px;

  .message {
    display: flex;
    margin: 3px 0;

    &[data-self-message="true"] {
      justify-content: flex-end;

      .message-content {
        background-color: var(--element-color);
        border-color: var(--element-color);
        color: white;
        border-bottom-right-radius: 0;
      }
    }

    &[data-self-message="false"] {
      justify-content: flex-start;

      .message-content {
        border-bottom-left-radius: 0;
      }
    }

    .message-content {
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background-color: var(--element-background);
      padding: 10px 15px;
    }
  }

  .loading-animation {
    height: 20px;
  }
`;

const Input = styled.div`
  padding: 0 20px;
  padding-bottom: 40px;

  .content {
    height: 40px;
    border: 1px solid var(--border-color-dark);
    border-radius: 10px;
    width: 100%;
    overflow: hidden;

    input {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      border: none;
      padding: 0 15px;
      outline: none;
    }
  }
`;
