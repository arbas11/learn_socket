import React from 'react'

function LoginForm({username, setUsername, room, setRoom, setChatRoom, socket}) {
    const joinChat = () => {
        console.log(room);
        console.log(username);
        socket.emit("join_room", room);
        setChatRoom(false)
      };
  return (
    <div className='outer-login'>
    <div className='login-body'>
        <div className="login-form">
  <p className="login-text">
    <span className="fa-stack fa-lg">
      <i className="fa fa-circle fa-stack-2x"></i>
      <i className="fa fa-lock fa-stack-1x"></i>
    </span>
  </p>
  <input type="text" className="login-username" placeholder="username here" onChange={(e) => setUsername(e.target.value)} value={username}/>
  <input type="text" className="login-password" placeholder="room to start chat" onChange={(e) => setRoom(e.target.value)} value={room} />
  <button className="login-submit" onClick={joinChat}>Join Chat</button>
</div>
<div className="underlay-photo"></div>
<div className="underlay-black"></div> 
</div>
</div>
  )
}

export default LoginForm