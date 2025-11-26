import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const id = parseInt(req.query.id, 10)
  if (isNaN(id)) return res.status(400).json({ error: 'invalid id' })

  if (req.method === 'GET') {
    const task = await prisma.task.findUnique({ where: { id }, include: { employee: true } })
    if (!task) return res.status(404).json({ error: 'not found' })
    res.json(task)
    return
  }

  if (req.method === 'PUT') {
    const { title, description, status, employeeId } = req.body
    const updated = await prisma.task.update({ where: { id }, data: { title, description, status, employeeId: employeeId || null } })
    res.json(updated)
    return
  }

  if (req.method === 'DELETE') {
    await prisma.task.delete({ where: { id } })
    res.status(204).end()
    return
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
