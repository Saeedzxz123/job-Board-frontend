import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
 <main id="auth-page">
  <div className="auth-card">
    <h1 className="auth-title">Sign In</h1>

    {message && <p className="auth-message">{message}</p>}

    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="auth-form"
    >
      <div className="auth-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="auth-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="auth-actions">
        <button>Sign In</button>
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

export default SignInForm;
