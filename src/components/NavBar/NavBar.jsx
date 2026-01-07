import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav >
      <div >
      </div>

      <div >
        {user ? (
          <>
      <span>JOB BOARD</span>

    <span  > Welcome,{user.username} </span>

      <Link to="/">Main </Link>

      {user.isHR && (
      <Link to="/add-new-job">Add Job</Link>
      )}
      {!user.isHR && (
      <Link to="/my">My Applications</Link> )}

          <button onClick={handleSignOut} className="logout-btn">Sign Out</button>
          </>
        ) : (
        <>
      <Link to="/">Home</Link>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
      </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
