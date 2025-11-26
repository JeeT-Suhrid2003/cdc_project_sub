import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const employees = await prisma.employee.findMany({ include: { tasks: true } })
    res.json(employees)
    return
  }

  if (req.method === 'POST') {
    const { name, email, role } = req.body
    if (!name || !email) return res.status(400).json({ error: 'name and email required' })
    try {
      const employee = await prisma.employee.create({ data: { name, email, role } })
      res.status(201).json(employee)
    } catch (err) {
      // Prisma uses error code P2002 for unique constraint failures
      if (err && err.code === 'P2002') {
        return res.status(409).json({ error: 'email already exists' })
      }
      const msg = err && err.message ? err.message : String(err)
      res.status(500).json({ error: msg })
    }
    return
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
