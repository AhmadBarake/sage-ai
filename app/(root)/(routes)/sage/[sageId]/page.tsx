import prismadb from "@/lib/prismadb";
import { SageForm } from "./components/sage-form";

interface sageIdPageProps {
    params: {
        sageId: string;
    }
};

const sageIdPage = async ({
    params
}: sageIdPageProps) => {
    //TODO: Check subscription

    const sage = await prismadb.sage.findUnique({
        where: {
            id: params.sageId,
        }
    })

    const categories = await prismadb.category.findMany();

    return (
        <SageForm initialData={sage} categories={categories} />
    )
}

 export default sageIdPage;