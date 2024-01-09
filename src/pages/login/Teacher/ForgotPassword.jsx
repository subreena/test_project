import { useState } from 'react';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Teacher from './Teacher';
import "../../../assets/stylesheets/login.css";

const ForgotPassword = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setError(null); // Reset any previous errors

      await sendPasswordResetEmail(auth, resetEmail);
      setSuccess('Password reset email sent successfully!');
      // Optionally, you can provide feedback to the user (e.g., show a success message).
    } catch (error) {
      setSuccess(null);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      if (errorCode === 'auth/user-not-found') {
        setError(
          'Your given email address is not registered yet. Please Sign up first or try another email address.'
        );
      } else if (errorCode === 'auth/invalid-email') {
        setError('Your email address format is not correct!');
      } else {
        setError(errorMessage);
      }
    }
  };

  return (
    <div className='mb-5'>
      <Teacher></Teacher>
      <main className="container">
        <section>
          <div className="login-form">
            <h3 className='text-center mb-5'>Forgot Password</h3>

            {success && (
              <div className="alert alert-success text-center" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleForgotPassword}>
              <div className='form-group my-3'>
                <label className='label-form' htmlFor="resetEmail">
                  Email address:
                </label>
                <input
                  className='input-form'
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  placeholder='Email address'
                />
              </div>
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
              <div className='form-group btn-right'>
                <button type="submit" className='button-form'>
                  Reset Password
                </button>
              </div>
            </form>

            <p className="link-text mt-3">
              Already have an account?{' '}
              <Link to="/login">Log in now</Link>
            </p>

            <p className="link-text mt-3">
              No account yet?{' '}
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ForgotPassword;
