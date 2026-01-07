import { useEffect, useState, useContext } from "react"; 

import { useParams, useNavigate } from "react-router";
import * as jobService from "../../services/jobService";
import ApplyJobForm from "../ApplyJobForm/ApplyJobForm";
import { UserContext } from "../../contexts/UserContext";

function JobDetails(props) {
  const [job, setJob] = useState(null);
  const { deleteJob } = props;
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

  const handleDelete = async () => {
    try {
      const deletedJob = await jobService.deleteOne(id);

      if (deletedJob) {
        deleteJob(id);
      } else {
        return <h1>Something went wrong!</h1>;
      }
    } catch (error) {
      console.error(error);
    }

    if (!id) {
      return <h1>Loading...</h1>;
    }
    if (!job) {
      return <h1>Loading...</h1>;
    }
  };

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
      <form action="/">
        <button onClick={handleDelete}>Delete</button>
      </form>
      <form action="/">
        <button>Add CV</button>
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
