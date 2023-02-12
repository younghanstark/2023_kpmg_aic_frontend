import { useState, useRef, useEffect } from "react";
import Conversation from "./components/Conversation";
import Form from "./components/Form";
import styles from "./App.module.css";

function App() {
  const [chats, setChats] = useState([]);
  const [disabled, setDisabled] = useState(false);

  function query(input) {
    const newMsg = { type: "message", text: input };
    setChats([...chats, newMsg]);
    setChats((prevState) => {
      const newRes = { type: "response", text: "Sample response" };
      return [...prevState, newRes];
    });
  }

  const convRef = useRef();

  const scrollToBottom = () => {
    if (convRef.current)
      convRef.current.scrollTop = convRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <>
      <div className={styles.header}>
        <img
          className={styles.logo}
          src="https://cdn-icons-png.flaticon.com/512/5578/5578817.png"
          alt="logo"
        />
      </div>
      <div className={styles.container}>
        <Conversation chats={chats} innerRef={convRef} />
        <Form query={query} disabled={disabled} />
      </div>
    </>
  );
}

export default App;
