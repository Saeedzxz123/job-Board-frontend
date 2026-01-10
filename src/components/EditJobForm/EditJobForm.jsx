import { useEffect, useState } from "react";
import * as jobService from "../../services/jobService";
import { useNavigate, useParams } from "react-router";
const EditJobForm = ({ updateOneJob }) => {
  const [formState, setFormState] = useState({
    title: "",
    company: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getOneJob = async (id) => {
      const job = await jobService.show(id);
      setFormState(job);
    };
    if (id) getOneJob(id);
  }, [id]);
  if (!id) return <h1>Loading...</h1>;
  if (!formState) return <h1>Loading..</h1>;
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const payload = { ...formState };
    const updatedJob = await jobService.update(id, payload);
    if (updatedJob) {
      updateOneJob(updatedJob);
      navigate("/");
    } else {
      console.log("something went wrong");
    }
  };
  return (
<main>
  <div className="job-form-card">
    <h1 className="job-form-title">Edit Job</h1>

    <form onSubmit={handleSubmit} className="job-form">

      <div className="job-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formState.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="job-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          name="company"
          id="company"
          value={formState.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="job-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>

      <div className="job-actions">
        <button type="submit">Save Changes</button>
        <button
          type="button"
          className="btn-outline"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </div>

    </form>
  </div>
</main>
  );
};
export default EditJobForm;
