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
"[project]/pages/api/employees/[id].js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function handler(req, res) {
    const id = parseInt(req.query.id, 10);
    if (isNaN(id)) return res.status(400).json({
        error: 'invalid id'
    });
    if (req.method === 'GET') {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            },
            include: {
                tasks: true
            }
        });
        if (!employee) return res.status(404).json({
            error: 'not found'
        });
        res.json(employee);
        return;
    }
    if (req.method === 'PUT') {
        const { name, email, role } = req.body;
        const updated = await prisma.employee.update({
            where: {
                id
            },
            data: {
                name,
                email,
                role
            }
        });
        res.json(updated);
        return;
    }
    if (req.method === 'DELETE') {
        await prisma.employee.delete({
            where: {
                id
            }
        });
        res.status(204).end();
        return;
    }
    res.setHeader('Allow', [
        'GET',
        'PUT',
        'DELETE'
    ]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ef8aded3._.js.map