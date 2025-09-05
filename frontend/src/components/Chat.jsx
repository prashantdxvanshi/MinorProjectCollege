import { adminAtom, creatorAtom } from "@/atom";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const Chat = () => {
  const courseId = useParams();
  const creatorName = useRecoilValue(creatorAtom);
  console.log("crator name is ", creatorName);
  console.log("courseId is ", courseId);
  const [messages, setmessages] = useState([]);
  const [inbox, setinbox] = useState([]);

  const token = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("user");

  const frontendIdref = useRef(token);
  const socket = useRef();
  // this state is used to set the connection socket so that i can use any where in the component
  const [inputdata, setinputdata] = useState({ input: "" });

  const handleinputdata = (e) => {
    setinputdata({ [e.target.name]: e.target.value });
  };
  //  console.log(inputdata)
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");
    socket.current = ws;
    ws.onmessage =async (event) => {
      const parsedevent = JSON.parse(event.data);
 
      setmessages((p) => [
        ...p,
        {
          text: parsedevent.payload.message,
          backenduserId: parsedevent.payload.userId,
          userName: parsedevent.payload.userName,
        },
      ]);
    };
    ws.onopen = () => {
      socket.current.send(
        JSON.stringify({
          type: "join",
          payload: {
            room: courseId.id,
          },
        })
      );
    };
    return () => {
      ws.close();
    };
  }, []);
        console.log("messages are ",messages);

  const sendmessage = (e) => {
    e.preventDefault();
    socket.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: inputdata.input,
          userId: frontendIdref.current,
          userName: userName,
        },
      })
    );
    setinputdata({ input: "" });
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="flex flex-col bg-gradient-to-b from-gray-900 via-gray-400 to-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md h-[90vh] relative">
          <div className="bg-purple-700 text-white text-xl font-semibold text-center py-4 shadow-md">
            Chat Room #<>{courseId.id}</>
          </div>

          <div className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide ">
            {messages.map((msg,idx) => (
              <div
                key={idx}
                className={`flex ${
                  frontendIdref.current === msg.backenduserId
                    ? "justify-end "
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl break-words relative   shadow-md ${
                    frontendIdref.current === msg.backenduserId
                      ? "bg-black text-white"
                      : "bg-gray-50 text-neutral-950"
                  }`}
                >
                  <p className="text-green-900 text-[8px] ">
                    {msg.userName}{" "}
                    <span>
                      {creatorName == msg.userName ? "(owner)" : "(client)"}
                    </span>
                  </p>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        <form onSubmit={sendmessage}>
          <div className="border-t border-gray-300 shadow-lg flex p-2 bg-white">
            <input
              className="flex-1 text-black outline-none px-4 py-2 rounded-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
              type="text"
              name="input"
              value={inputdata.input}
              onChange={handleinputdata}
              placeholder="Type your message..."
            />
            <button
              className="ml-2 text-white bg-purple-600 px-5 py-2 text-lg rounded-full hover:bg-purple-800 transition duration-200 shadow-md"
              // onClick={sendmessage}
              type="submit"
              
            >
              Send
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
