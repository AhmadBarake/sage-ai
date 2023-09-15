import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";

interface chatIdPageProps {
    params: {
        chatId: string;
    }
}

const ChatIdPage = async ({
    params
}: chatIdPageProps) => {

    const {userId} = auth();

    if(!userId) {
        return redirectToSignIn();
    }

    const sage = await prismadb.sage.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });
    
    if (!sage) {
        return redirect('/');
    }

    return (
        <div >
            <ChatClient sage={sage}/>
        </div>
    )
}

export default ChatIdPage;