import { useContext } from "react";
import { useNavigate } from "react-router"; 
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import ViewJobsButton from "../viewJobsButton/ViewJobsButton";

const Dashboard = ({ jobs }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); 

  return (
    <main>
      <h1>Job Board</h1>

  <ViewJobsButton />

    {user?.isHR && (
    <Link to="/add-new-job">
    <button>Add Job</button>
    </Link>
      )}

      <ul>
    {jobs.map((job) => (
    <li
    key={job._id}
    style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
      }}>
    <span>{job.title} - {job.company}</span>

    <button onClick={() => navigate(`/jobs/${job._id}`)}>View</button>
    </li>
    ))}
  </ul>
  </main>
  );
};

export default Dashboard;
