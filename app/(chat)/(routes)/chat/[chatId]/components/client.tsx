"use client";
import { ChatHeader } from "@/components/chat-header";
import { Message, Sage } from "@prisma/client";

 

interface ChatClientProps {
    sage: Sage & {
        messages: Message[];
        _count: {
            messages: number;
        };
    };
};

export const ChatClient = ({
    sage
}: ChatClientProps) => {
    return ( 
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader sage={sage} />
        </div>
    )
}

export default ChatClient;