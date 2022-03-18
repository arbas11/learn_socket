import "./App.scss";
import { useState } from "react";
import io from "socket.io-client";
import ChatBox from "./components/ChatBox/ChatBox";
import LoginForm from "./components/login/LoginForm";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatRoom, setChatRoom] = useState(false);

  return (
    <div className="App">
      {chatRoom ? (
        <ChatBox
          socket={socket}
          username={username}
          room={room}
          setChatRoom={setChatRoom}
          chatRoom={chatRoom}
        />
      ) : (
        <>
          <LoginForm
            socket={socket}
            username={username}
            setUsername={setUsername}
            room={room}
            setRoom={setRoom}
            chatRoom={chatRoom}
            setChatRoom={setChatRoom}
          />
        </>
      )}
    </div>
  );
}

export default App;
