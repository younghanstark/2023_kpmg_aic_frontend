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
        "http://20.115.157.77:8004", {
          method: 'POST',
          body: JSON.stringify({query: input, title: selected})
        }
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

  const [contextInput, setContextInput] = useState("");

  function handleChange(e) {
    setContextInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (contextInput === "") return;
    findReports(contextInput);
    setContextInput("");
  }

  const [reports, setReports] = useState([]);
  const findReports = async (contextInput) => {
    const response = await (
      await fetch("http://20.115.157.77:8004/search?keyword=" + contextInput, {
        mode:"cors"
      })
    ).json();
    setReports(response.result);
    console.log(reports)
  };

  const [selected, setSelected] = useState("null");
  const handleChangeSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <>
      <div className={styles.header}>
        <img className={styles.logo} src={require("./logo.png")} alt="logo" />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Conversation chats={chats} innerRef={convRef} />
          <Form query={query} disabled={disabled} />
        </div>
        <div className={styles.container}>
          <h2 style={{ color: "#161252" }}>Search Context (Reports)</h2>
          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.contextInput}
              placeholder="Enter your context ..."
              onChange={handleChange}
              value={contextInput}
            />
            <button className={styles.btn} type="submit">
              Submit
            </button>
          </form>
          <h2 style={{ color: "#161252" }}>Current Context</h2>
          <select className={styles.select} onChange={handleChangeSelect} value={selected}>
            <option value="null">No context selected.</option>
            {reports.map((report, index) => (
              <option key={index} value={report}>
                {report}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
