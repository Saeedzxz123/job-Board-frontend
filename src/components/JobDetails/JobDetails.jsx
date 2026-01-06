import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as jobService from "../../services/jobService";
function JobDetails() {
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getOneJob = async () => {
      const job = await jobService.show(id);
      setJob(job);
      console.log(job);
    };

    if (id) getOneJob();
  }, [id]);

  if (!id) return <h1>Loading...</h1>;
  if (!job) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Name:{job.title}</h1>
    </div>
  );
}

export default JobDetails;
