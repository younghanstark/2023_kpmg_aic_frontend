import Chat from "./Chat";
import styles from "./Conversation.module.css";

function Conversation({ chats, innerRef }) {
  return (
    <div className={styles.container} ref={innerRef}>
      {chats.map((chat, index) => (
        <Chat key={index} type={chat.type} text={chat.text} />
      ))}
    </div>
  );
}

export default Conversation;
