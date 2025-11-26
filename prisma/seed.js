const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.task.deleteMany()
  await prisma.employee.deleteMany()

  const alice = await prisma.employee.create({
    data: { name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' }
  })

  const bob = await prisma.employee.create({
    data: { name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' }
  })

  await prisma.task.createMany({
    data: [
      { title: 'Implement auth', description: 'Simple JWT auth', status: 'in-progress', employeeId: alice.id },
      { title: 'Design landing', description: 'Create hero section', status: 'todo', employeeId: bob.id },
      { title: 'Write tests', description: 'Unit tests for API', status: 'todo' }
    ]
  })

  console.log('Seed finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
