import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as jobService from "../../services/jobService";

const HrJobs = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  if (!user) return <p>Loading...</p>;
  if (!user.isHR) return <Navigate to="/" />;

  useEffect(() => {
    const fetchJobs = async () => {
    const allJobs = await jobService.index();
    const myJobs = allJobs.filter(
    (job) =>
    job.createdBy === user._id || job.createdBy?._id === user._id
      );
      setJobs(myJobs);
    };

    fetchJobs();
  }, [user]);

  return (
    <main>
      <h1>My Posted Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <ul>
    {jobs.map((job) => (
    <li key={job._id}>
         {job.title} {job.company}

    <button onClick={() => navigate(`/jobs/${job._id}`)}>Detail</button>
    </li> ))}
        </ul>
      )}
    </main>
  );
};

export default HrJobs;
