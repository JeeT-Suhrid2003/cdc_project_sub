module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/pages/api/tasks/index.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function handler(req, res) {
    if (req.method === 'GET') {
        const tasks = await prisma.task.findMany({
            include: {
                employee: true
            }
        });
        res.json(tasks);
        return;
    }
    if (req.method === 'POST') {
        const { title, description, status, employeeId } = req.body;
        if (!title) return res.status(400).json({
            error: 'title required'
        });
        try {
            // If an employeeId was provided, validate it exists before creating the task
            let empId = employeeId || null;
            if (empId !== null && empId !== undefined) {
                const emp = await prisma.employee.findUnique({
                    where: {
                        id: Number(empId)
                    }
                });
                if (!emp) {
                    return res.status(400).json({
                        error: `employee with id=${empId} does not exist`
                    });
                }
                empId = Number(empId);
            }
            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    status,
                    employeeId: empId
                }
            });
            res.status(201).json(task);
        } catch (err) {
            // Catch known Prisma foreign key error as a friendly message
            const msg = err && err.message ? err.message : String(err);
            res.status(500).json({
                error: msg
            });
        }
        return;
    }
    res.setHeader('Allow', [
        'GET',
        'POST'
    ]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a546448d._.js.map