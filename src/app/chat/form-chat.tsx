"use client";
import React, {useEffect, useState} from "react";
import style from "./chat.module.css";
import {Button, Input} from "@nextui-org/react";

interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  time: String;
}

const ChatPage = ({socket, auth}: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId: auth?.roomId ?? "",
        user: auth?.userName ?? "",
        msg: currentMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  console.log("chat :>> ", chat);

  return (
    <div>
      <div>
        <div>
          {chat.map(({roomId, user, msg, time}, key) => (
            <div
              key={key}
              className={user == auth?.userName ? style.chatProfileRight : style.chatProfileLeft}
            >
              <span
                className={style.chatProfileSpan}
                style={{textAlign: user == auth?.userName ? "right" : "left"}}
              >
                {user.charAt(0)}
              </span>
              <h3 style={{textAlign: user == auth?.userName ? "right" : "left"}}>{msg}</h3>
            </div>
          ))}
        </div>
        <div>
          <form onSubmit={(e) => sendData(e)}>
            <Input
              type="text"
              value={currentMsg}
              placeholder="Type your message.."
              onChange={(e: any) => {
                setCurrentMsg(e.target.value);
              }}
            />
            <Button type="submit" color="primary" className="mt-2">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
