import { useState } from "react";
import * as applicationService from "../../services/applicationService";

const ApplyJobForm = ({ jobId }) => {
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!cv) return setMessage("Please select a CV PDF file");

    try {
      const formData = new FormData();
      formData.append("job", jobId);
      formData.append("cv", cv);

      await applicationService.apply(formData);

      setMessage("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Apply for this job</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setCv(e.target.files[0])}
        required
      />
      <button type="submit">Submit CV</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ApplyJobForm;
