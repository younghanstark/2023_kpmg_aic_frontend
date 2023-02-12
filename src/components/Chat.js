import styles from "./Chat.module.css";

function Chat({ type, text }) {
  return (
    <div className={styles.wrapper}>
      <div className={[styles.chat, type === "message" ? styles.message : styles.response].join(' ')}>
        {text}
      </div>
    </div>
  );
}

export default Chat;
