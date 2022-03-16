import React from "react";

function loginawal() {
  return (
    <div>
      <h1>welcome to socket chat app</h1>
      <h2>to join enter username and room</h2>
      <input
        type="text"
        placeholder="username here"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="text"
        placeholder="room to start chat"
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <button onClick={joinChat}>Join Chat</button>
    </div>
  );
}

export default loginawal;
