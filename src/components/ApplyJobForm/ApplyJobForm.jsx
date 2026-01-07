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
    <div>
      <h3>Apply for this job</h3>

    {alreadyApplied ? (
    <p >You already applied for this job</p>
    ) : (
    <form onSubmit={handleSubmit}>
    <input
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={(e) => setCv(e.target.files[0])}
    required
    />
        <button type="submit">Apply</button>
        </form>
      )}


    </div>
  );
};

export default ApplyJobForm;
