const {PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "Sales"},
                {name: "Marketing"},
                {name: "Accounting"},
                {name: "UI/UX"},
                {name: "Backend"},
                {name: "Frontend"},
                {name: "Infrastructure"},
                {name: "Cybersecurity"},
                {name: "Legal"},
                {name: "HR"},
                {name: "Other"},
            ]
        })
    } catch (error) {
        console.log("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
};

main();