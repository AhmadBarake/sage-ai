import prismadb from "@/lib/prismadb";
import { SageForm } from "./components/sage-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface sageIdPageProps {
    params: {
        sageId: string;
    }
};

const sageIdPage = async ({
    params
}: sageIdPageProps) => {
    const { userId } = auth();
    
    //TODO: Check subscription of the user, might add usuage limits for free tier users


    if (!userId) {
        return redirectToSignIn();
    }
    const sage = await prismadb.sage.findUnique({
        where: {
            id: params.sageId,
            userId
        }
    })

    const categories = await prismadb.category.findMany();

    return (
        <SageForm initialData={sage} categories={categories} />
    )
}

 export default sageIdPage;