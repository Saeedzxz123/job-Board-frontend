// SignUpForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import * as authService from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    isHR: false

  });
  const { setUser } = useContext(UserContext);

  const { username, password, passwordConf  , isHR } = formData;

  const handleChange = (evt) => {
  setMessage('')

  const { name, type, checked, value } = evt.target

  setFormData({
    ...formData, [name]: type === 'checkbox' ? checked : value
  });
};


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const user = await authService.signUp(formData)
    setUser(user); 
    navigate('/')
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
<main id="auth-page">
  <div className="auth-card">
    <h1 className="auth-title">Sign Up</h1>

    {message && <p className="auth-message">{message}</p>}

    <form onSubmit={handleSubmit} className="auth-form">

      <div className="auth-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
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
          value={password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="auth-group">
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          id="confirm"
          name="passwordConf"
          value={passwordConf}
          onChange={handleChange}
          required
        />
      </div>

      <div className="auth-checkbox">
        <input
          type="checkbox"
          id="isHR"
          name="isHR"
          checked={isHR}
          onChange={handleChange}
        />
        <label htmlFor="isHR">I am an HR recruiter</label>
      </div>

      <div className="auth-actions">
        <button disabled={isFormInvalid()}>Sign Up</button>
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

export default SignUpForm;
