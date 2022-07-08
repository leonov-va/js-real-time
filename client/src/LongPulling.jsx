import axios from "axios";
import { useEffect, useState } from "react";

const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      id: Date.now(),
      message: value,
    });
  };

  return (
    <div className="center">
      <div>
        <h1 style={{ marginBottom: "10px" }}>Long pulling</h1>
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map((m) => (
            <div key={m.id} className="message">
              {m.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongPulling;
