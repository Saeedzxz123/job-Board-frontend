import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { getMyApplications } from '../../services/applicationService'

const MyApplications = () => {
  const navigate = useNavigate()
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
    <p className="empty-state">You haven’t applied to any jobs yet.</p>
  ) : (
    <ul className="jobs-list">
      {applications.map(app => (
        <li key={app._id} className="job-card">

          <div className="job-status applied">Applied</div>

          <div className="job-card-body">
            <h3>{app.job.title}</h3>
            <p className="company">{app.job.company}</p>

            <button
              className="btn-primary-lg"
              onClick={() => navigate(`/jobs/${app.job._id}`)}
            >
              Details
            </button>
          </div>

        </li>
      ))}
    </ul>
  )}
</main>

  )
}
 

export default MyApplications
