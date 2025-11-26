import { useEffect, useState } from 'react'

export default function Home() {
  const [employees, setEmployees] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const [eRes, tRes] = await Promise.all([fetch('/api/employees'), fetch('/api/tasks')])
    const [eJson, tJson] = await Promise.all([eRes.json(), tRes.json()])
    setEmployees(eJson)
    setTasks(tJson)
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container">
      <header>
        <h1>Employees & Tasks</h1>
      </header>

      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid">
            <section>
              <h2>Employees</h2>
              <ul>
                {employees.map(e => (
                  <li key={e.id} className="card">
                    <strong>{e.name}</strong>
                    <div>{e.role}</div>
                    <div className="muted">{e.email}</div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Tasks</h2>
              <ul>
                {tasks.map(t => (
                  <li key={t.id} className="card">
                    <strong>{t.title}</strong>
                    <div className="muted">{t.status} {t.employee && `(assigned to ${t.employee.name})`}</div>
                    <p>{t.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>

      <footer>
        <small>Track 1&2 demo — Frontend (React) + Backend (API + Prisma)</small>
      </footer>
    </div>
  )
}
