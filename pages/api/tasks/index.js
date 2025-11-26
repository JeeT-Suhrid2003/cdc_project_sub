import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({ include: { employee: true } })
    res.json(tasks)
    return
  }

  if (req.method === 'POST') {
    const { title, description, status, employeeId } = req.body
    if (!title) return res.status(400).json({ error: 'title required' })
    try {
      // If an employeeId was provided, validate it exists before creating the task
      let empId = employeeId || null
      if (empId !== null && empId !== undefined) {
        const emp = await prisma.employee.findUnique({ where: { id: Number(empId) } })
        if (!emp) {
          return res.status(400).json({ error: `employee with id=${empId} does not exist` })
        }
        empId = Number(empId)
      }

      const task = await prisma.task.create({ data: { title, description, status, employeeId: empId } })
      res.status(201).json(task)
    } catch (err) {
      // Catch known Prisma foreign key error as a friendly message
      const msg = err && err.message ? err.message : String(err)
      res.status(500).json({ error: msg })
    }
    return
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
