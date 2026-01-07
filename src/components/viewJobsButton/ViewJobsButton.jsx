import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const ViewJobsButton = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleClick = () => {
    if (user.isHR) {
      navigate("/hr/jobs");
    } else {
      navigate("/my");
    }
  };

  return <button onClick={handleClick}>View My Jobs</button>;
};

export default ViewJobsButton;
