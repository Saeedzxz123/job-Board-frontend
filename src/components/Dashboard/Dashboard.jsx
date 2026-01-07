import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router'
const Dashboard = ({ jobs = [] }) => {
  const { user } = useContext(UserContext)

  return (
    <main>
      <h1>Welcome, {user.username}</h1>

      {user.isHR && (
        <Link to="/add-new-job">
          <button>Add Job</button>
        </Link>
      )}

      {!user.isHR && (
        <Link to="/my">
          <button>View Your Applied Jobs</button>
        </Link>
      )}

      <hr />

      <h2>Job Listings</h2>

      {jobs.length === 0 ? (
        <p>No jobs have been posted yet.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job._id}>
              <Link to={`/jobs/${job._id}`}>
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Dashboard