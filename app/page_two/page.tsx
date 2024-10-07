"use client";

import { useEffect, useState } from "react";
import { BroadcastMessage } from "../types";

export default function PageOne() {
  const broadcastChannel = new BroadcastChannel("test_channel");
  const [messages, setMessages] = useState<BroadcastMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    broadcastChannel.onmessage = (event) => {
      const message = event.data as BroadcastMessage;
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
  }, []);

  function sendMessage() {
    const content = input;
    setInput("")
    broadcastChannel.postMessage({
      content,
      origin: "page_two",
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-bold text-2xl">Incoming Messages</h1>
          <div className="flex flex-col gap-2">
            {messages
              .filter((message) => message.origin === "index")
              .map((message) => (
                <div key={Math.random()} className="p-2">
                  <p className="font-medium">{message.content}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-bold text-2xl">Outgoing Messages</h1>
          <div className="flex flex-col gap-2">
            {messages
              .filter((message) => message.origin === "page_two")
              .map((message) => (
                <div key={Math.random()} className="p-2">
                  <p className="font-medium">{message.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0 left-0 right-0 flex p-10 items-center justify-center bg-background">
        <div className="flex flex-col gap-2 w-[275px]">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Type Message"
            className="rounded-lg text-foreground bg-background outline-none border-2 p-4 text-sm placeholder:text-sm border-gray-300"
          />
          <button
            onClick={sendMessage}
            className="bg-foreground text-background rounded-lg px-3.5 py-2.5 font-semibold duration-500 hover:opacity-80 text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
