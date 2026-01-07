import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import * as jobService from "../../services/jobService";

function JobDetails({deleteJob}) {
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getOneJob = async () => {
      const job = await jobService.show(id);
      setJob(job);
    };

    if (id) getOneJob();
  }, [id]);

      const handleDelete = async () => {
      const deletedJob = await jobService.deleteOne(id);
      deleteJob(id);
      navigate("/");
    };

  if (!id) return <h1>Loading...</h1>;
  if (!job) return <h1>Loading...</h1>;

  return (
    <div key={job._id}>
      <h1>Name: {job.title}</h1>
      <h2>Company: {job.company}</h2>
      <p>{job.description}</p>


        <Link to={`/jobs/${id}/edit`}>Edit</Link>

      <button onClick={handleDelete}>Delete</button>

      <form action="/">
        <button>Add CV</button>
      </form>
    </div>
  );
}

export default JobDetails;