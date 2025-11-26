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
"[project]/pages/api/employees/index.js [api] (ecmascript)", ((__turbopack_context__) => {
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
        const employees = await prisma.employee.findMany({
            include: {
                tasks: true
            }
        });
        res.json(employees);
        return;
    }
    if (req.method === 'POST') {
        const { name, email, role } = req.body;
        if (!name || !email) return res.status(400).json({
            error: 'name and email required'
        });
        try {
            const employee = await prisma.employee.create({
                data: {
                    name,
                    email,
                    role
                }
            });
            res.status(201).json(employee);
        } catch (err) {
            // Prisma uses error code P2002 for unique constraint failures
            if (err && err.code === 'P2002') {
                return res.status(409).json({
                    error: 'email already exists'
                });
            }
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f28b720e._.js.map