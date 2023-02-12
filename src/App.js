import { useState, useRef, useEffect } from "react";
import Conversation from "./components/Conversation";
import Form from "./components/Form";
import styles from "./App.module.css";

function App() {
  const [chats, setChats] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const query = async (input) => {
    const newMsg = { type: "message", text: input };
    setChats([...chats, newMsg]);
    setDisabled(true);

    const response = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year"
      )
    ).json();
    setChats((prevState) => {
      const newRes = {
        type: "response",
        text: response.data.movies[0].summary.slice(0, 3),
      };
      return [...prevState, newRes];
    });
    setDisabled(false);
  };

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
