import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Dashboard = ({ jobs = [] }) => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, _id)
  // which was decoded from the JWT token and stored in context
  const { user } = useContext(UserContext)

  return (
    <main>
      {/* Greet the logged-in user */}
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can view jobs after logging in.
      </p>

      <hr />

      {/* Job Listings Section */}
      <h2>Job Listings</h2>

      {/* If there are no jobs, show a message */}
      {jobs.length === 0 ? (
        <p>No jobs have been posted yet.</p>
      ) : (
        <ul>
          {/* Loop over the jobs array and display each job */}
          {jobs.map(job => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default Dashboard
