import { useState } from "react";
import { useNavigate } from "react-router";
import * as jobService from "../../services/jobService";

const AddJobForm = ({ addJob }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    company: "",
  });

  const handleChange = (evt) => {
    setFormState({ ...formState, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();

      const newJob = await jobService.create(formState);

      if (newJob) {
        addJob(newJob);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
<main>
  <div className="job-form-card">
    <h1 className="job-form-title">Add Job</h1>

    <form onSubmit={handleSubmit} className="job-form">

      <div className="job-group">
        <label>Title</label>
        <input
          required
          name="title"
          value={formState.title}
          onChange={handleChange}
        />
      </div>

      <div className="job-group">
        <label>Description</label>
        <textarea
          required
          name="description"
          value={formState.description}
          onChange={handleChange}
          rows="5"
        />
      </div>

      <div className="job-group">
        <label>Company</label>
        <input
          required
          name="company"
          value={formState.company}
          onChange={handleChange}
        />
      </div>

      <div className="job-actions">
        <button type="submit">Save Job</button>
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

export default AddJobForm;
