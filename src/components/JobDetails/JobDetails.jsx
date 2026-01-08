import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import * as jobService from "../../services/jobService";
import { getHrApplications } from "../../services/applicationService";
import ApplyJobForm from "../ApplyJobForm/ApplyJobForm";
import { UserContext } from "../../contexts/UserContext";

function JobDetails({ deleteJob }) {
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await jobService.show(id);
      setJob(response);

      if (user && !user.isHR && response.applications) {
        const applied = response.applications.some(
          (app) => app.user?._id === user._id
        );
        setAlreadyApplied(applied);
      }

      if (user?.isHR) {
        const allApps = await getHrApplications();
        const jobApps = allApps.filter(
          (app) => String(app.job._id) === String(id)
        );
        setApplications(jobApps);
      }
    };

    if (id) fetchJob();
  }, [id, user]);

  if (!job) return <h1>Loading...</h1>;

  const isOwnerHR =
    user?.isHR && (job.createdBy?._id === user._id || job.createdBy === user._id);

  const handleDelete = async () => {
    try {
      const deletedJob = await jobService.deleteOne(id);
      if (deletedJob) deleteJob(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div key={job._id}>
      <h1>Name: {job.title}</h1>
      <h2>Company: {job.company}</h2>
      <p>{job.description}</p>

      {isOwnerHR && (
        <>
          <form className="form-card" action={`/jobs/${id}/edit`}>
            <button>Edit</button>
          </form>
          <form className="form-card" action="/">
            <button onClick={handleDelete}>Delete</button>
          </form>

          {applications.length > 0 && (
            <div>
              <h3>Applicants:</h3>
              <ul>
                {applications.map((app) => (
                  <li key={app._id}>
                    {app.user.username} -{" "}
                    <a href={app.cvUrl} target="_blank" rel="noreferrer">
                      Download CV
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {!user?.isHR && (
        <div>
          {alreadyApplied ? (
            <button disabled>Already Applied</button>
          ) : (
            <ApplyJobForm
              jobId={job._id}
              onApplied={() => setAlreadyApplied(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default JobDetails;
