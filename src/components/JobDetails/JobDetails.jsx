import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as jobService from "../../services/jobService";
function JobDetails(props) {
  const [job, setJob] = useState(null);
  const { deleteJob } = props;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getOneJob = async () => {
      const job = await jobService.show(id);
      setJob(job);
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
      <h1>Name:{job.title}</h1>
      <h2>Company: {job.company}</h2>
      <p>{job.description}</p>

      <form action="/">
        <button>Edite</button>
      </form>
      <form action="/">
        <button onClick={handleDelete}>Delete</button>
      </form>
      <form action="/">
        <button>Add CV</button>
      </form>
    </div>
  );
}

export default JobDetails;
