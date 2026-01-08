import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const ViewJobsButton = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleClick = () => {
    if (user.isHR) {
      navigate("/hr");
    } else {
      navigate("/my");
    }
  };

  return <button className="viewButton" onClick={handleClick}>{user.isHr ? 'View opening' : 'View My Application'}</button>;
};

export default ViewJobsButton;
