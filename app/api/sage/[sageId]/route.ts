import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, 
    { params }: {params: {sageId: string}}) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const {src, name, description, instructions, seed, categoryId} = body;

        if (!params.sageId) {
            return new NextResponse("Sage Id is required", {status: 400});
        }

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", {status: 401});
        }
        if(!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", {status: 400});
        }
        //TODO: Check for Subscription

        const sage = await prismadb.sage.update({
            where: {
                id: params.sageId,
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }
        });
        return NextResponse.json(sage);
    } catch(error) {
        console.log("[SAGE_PATCH]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function DELETE(
    req: Request, 
    {params}: {params: {sageId: string}}
) {
    try{
        const {userId} = auth();

        if(!userId) {
            return new NextResponse("Unauthorized", {status:401});
        }
        const sage = await prismadb.sage.delete({
            where: {
                userId,
                id: params.sageId
            }
        });

        return NextResponse.json(sage);
    }catch(error){
        console.log("SAGE_DELETE", error)
        return new NextResponse("Internal Error", {status:500})
    }
}