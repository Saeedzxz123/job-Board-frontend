import { useState } from "react";
import { apply } from "../../services/applicationService";

const ApplyJobForm = ({ jobId, alreadyApplied, onApplied }) => {
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alreadyApplied) return;

    const formData = new FormData();
    formData.append("job", jobId);
    formData.append("cv", cv);

    try {
      await apply(formData);

      setMessage("Application submitted successfully");
      onApplied();
    } catch (err) {
    setMessage(err.message);
    }
  };

  return (
<div className="apply-cta">
  <h3>Apply for this job</h3>

  {alreadyApplied ? (
    <div className="apply-success">
      ✔ You have already applied to this job
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="apply-form">
      <label className="file-upload">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCv(e.target.files[0])}
          required
        />
        <span>
          Upload CV (PDF / Word)
        </span>
      </label>

      <button type="submit" className="apply-btn">
        Apply Now
      </button>
    </form>
  )}
</div>
  );
};

export default ApplyJobForm;
