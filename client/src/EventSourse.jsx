import axios from "axios";
import { useEffect, useState } from "react";

const EventSourse = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventtSourse = new EventSource("http://localhost:5000/connect");
    eventtSourse.onmessage = function (event) {
      // console.log(event.data);
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
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
        <h1 style={{ marginBottom: "10px" }}>Event sourse</h1>
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

export default EventSourse;
