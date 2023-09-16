"use client";

import { Sage } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  sage: Sage;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  sage,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={sage.src}
        role="system"
        content={`Hello I am ${sage.name}, ${sage.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={sage.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={sage.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};
