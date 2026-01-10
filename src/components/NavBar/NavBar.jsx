import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
<nav id="navParent">
  {user ? (
    <div className="navCon">
      <div className="nav-left">
        <span className="nav-logo">JOB BOARD</span>

        <span className="welcome-badge">
          Welcome, {user.username}
        </span>

        <Link to="/" className="nav-btn ghost">Main</Link>

        {user.isHR && (
          <Link to="/add-new-job" className="nav-btn">
            Add Job
          </Link>
        )}

        {!user.isHR && (
          <Link to="/my" className="nav-btn">
            My Applications
          </Link>
        )}
      </div>

      <button className="nav-btn danger" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  ) : (
    <div className="navCon2">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="nav-btn ghost">Home</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/sign-in" className="nav-btn ghost">
          Sign In
        </Link>
        <Link to="/sign-up" className="nav-btn">
          Sign Up
        </Link>
      </div>
    </div>
  )}
</nav>
  );
};

export default NavBar;
