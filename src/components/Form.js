import { useState } from "react";
import styles from "./Form.module.css";

function Form({ query, disabled }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (input === "") return;
    query(input);
    setInput("");
  }

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className={styles.footer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          disabled={disabled}
          className={styles.input}
          placeholder="Enter your question ..."
        />
        <button className={styles.btn} type="submit" disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
