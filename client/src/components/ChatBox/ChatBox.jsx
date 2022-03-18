import React, { useState, useEffect, useRef } from 'react';
import { IoPaperPlane } from 'react-icons/io5';

function ChatBox({ socket, username, room, setChatRoom, chatRoom }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageHist, setMessageHist] = useState([]);
    const scrollNewChat = useRef(null)

    useEffect(()=>{
        scrollNewChat.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
          })
          return;
    }, [ messageHist ])

    const time = ()=>{
        const date = new Date();
        let currentHours = date.getHours();
        let currentMinutes = date.getMinutes();
        currentHours = ("0" + currentHours).slice(-2);
        currentMinutes = ("0" + currentMinutes).slice(-2);
        return currentHours + ":" + currentMinutes
    }

    const capitalise= (msg) =>{
        const firstLetter = msg[0].toUpperCase()
        return firstLetter + msg.slice(1)
    }

    const sendMessage = async ()=>{
        if( currentMessage !== ""){
        const capsMsg = capitalise(currentMessage);
        const messageData ={
            room: room,
            author: username,
            message: capsMsg,
            time: time(),
        }
        await socket.emit("send_message", messageData)
        setCurrentMessage(messageData.message)
        setMessageHist([...messageHist, messageData])
        setCurrentMessage("")}
    }
    
    useEffect(() => {
        socket.on("receive_message", (data)=>{
            setMessageHist([...messageHist, data])
        })
    }, [socket, messageHist])
    
  return (
    <div className='chat-box'>
        <div className='chat-header'>
            <div>{room}</div>
            <button onClick={()=>{
                setChatRoom(false)}}>out</button>
        </div>
        <div className='chat-body'>
            <>
            {messageHist.map((v, idx)=>{
                return <div key={idx} id={v.author === username ? "send" : "receive"} className='bubble-container'>
                    <div id={v.author === username ? "send-color" : "receive-color"} className='bubble-msg'>{v.message}</div>
                    <div className='msg-status-container'>
                    <div className='bubble-msg-status'>{v.time}</div>
                    <div className='bubble-msg-status'>{v.author}</div>
                    </div>
                </div>
            })}
            <div ref={scrollNewChat}></div>
            </>
        </div>
        <div className='chat-footer'>
        <input type="text" 
        placeholder='Say Hi...' 
        onChange={(e)=>setCurrentMessage(e.target.value)} 
        value={currentMessage}
        onKeyPress={(e)=>{
            e.key === "Enter" && sendMessage()
        }}
        />
        <button onClick={sendMessage}><IoPaperPlane /></button>
        </div>

    </div>
  )
}

export default ChatBox