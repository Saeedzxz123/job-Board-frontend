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
    <nav id="navParant">
        {user ? (
          <div className="navCon">
          <div className="childOne">
            <span className="navContant" >JOB BOARD</span>

            <span className="navContant"> Welcome,{user.username} </span>

            <Link className="navContant" to="/">Main </Link>

            {user.isHR && <Link className="navContant" to="/add-new-job">Add Job</Link>}
            {!user.isHR && <Link className="navContant" to="/my">My Applications</Link>}
          </div>

            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <dev className='navCon2'>

            <Link className="navContant2" to="/">Home</Link>
            <Link className="navContant2" to="/sign-in">Sign In</Link>
            <Link className="navContant2" to="/sign-up">Sign Up</Link>
          </dev>
        )}
    </nav>
  );
};

export default NavBar;
