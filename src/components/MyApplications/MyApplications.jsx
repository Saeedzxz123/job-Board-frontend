import { useEffect, useState, useContext } from 'react'
import { Link, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { getMyApplications } from '../../services/applicationService'

const MyApplications = () => {
  const { user } = useContext(UserContext)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  if (!user) {
    return <p>Loading...</p>
  }

  if (user.isHR) {
    return <Navigate to="/" />
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyApplications()
        setApplications(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading your applications...</p>
  if (error) return <p>{error}</p>

  return (
    <main>
      <h1>My Applied Jobs</h1>

      {applications.length === 0 ? (
        <p>You haven’t applied to any jobs yet.</p>
      ) : (
        <ul>
          {applications.map(app => (
            <li key={app._id}>
              <span className="applied-label">Applied</span>
                <h3>{app.job.title}</h3>
                <p>{app.job.company}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default MyApplications
