import { useEffect, useState, useContext } from "react"; 

import { useParams, useNavigate } from "react-router";
import * as jobService from "../../services/jobService";
import ApplyJobForm from "../ApplyJobForm/ApplyJobForm";
import { UserContext } from "../../contexts/UserContext";

function JobDetails() {
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getOneJob = async () => {
      const response = await jobService.show(id);

      setJob(response);
    };

    if (id) getOneJob();
  }, [id]);

  if (!id) return <h1>Loading...</h1>;
  if (!job) return <h1>Loading...</h1>;

  const isOwnerHR =
    user?.isHR &&
    (job.createdBy?._id === user._id || job.createdBy === user._id);

  return (
    <div key={job._id}>
      <h1>Name: {job.title}</h1>
      <h2>Company: {job.company}</h2>
      <p>{job.description}</p>

      {isOwnerHR && (
    <>
      <form>
      <button>Edit</button>
      </form>

      <form>
      <button>Delete</button>
      </form>
    </>
      )}

      {!user?.isHR && (
      <ApplyJobForm jobId={job._id} />
      )}
    </div>
  );
}

export default JobDetails;
