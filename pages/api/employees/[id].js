import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const id = parseInt(req.query.id, 10)
  if (isNaN(id)) return res.status(400).json({ error: 'invalid id' })

  if (req.method === 'GET') {
    const employee = await prisma.employee.findUnique({ where: { id }, include: { tasks: true } })
    if (!employee) return res.status(404).json({ error: 'not found' })
    res.json(employee)
    return
  }

  if (req.method === 'PUT') {
    const { name, email, role } = req.body
    const updated = await prisma.employee.update({ where: { id }, data: { name, email, role } })
    res.json(updated)
    return
  }

  if (req.method === 'DELETE') {
    await prisma.employee.delete({ where: { id } })
    res.status(204).end()
    return
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
