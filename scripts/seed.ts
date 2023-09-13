const {PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "Sales Sages"},
                {name: "Marketing Sages"},
                {name: "Accounting Sages"},
                {name: "UI/UX Sages"},
                {name: "Backend Dev Sages"},
                {name: "Frontend Dev Sages"},
                {name: "Infrastructure Sages"},
                {name: "Cybersecurity Sages"},
                {name: "Legal Sages"},
                {name: "HR Sages"},
                {name: "Other Sages"},
            ]
        })
    } catch (error) {
        console.log("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
};

main();