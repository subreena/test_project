import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

function Teacher() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false);
  };

  return (
    <div>
      {/* Buttons */}
      <div className="container">
        <div className="row mt-5">
          <div className="col-6 m-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleSignup}
              style={{ display: !showSignup ? 'block' : 'none' }}
            >
              Want to Sign up?
            </button>
          </div>
          <div className="col-6 m-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleLogin}
              style={{ display: !showLogin ? 'block' : 'none' }}
            >
              Want to Login?
            </button>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="mt-3" id="signup-part" style={{ display: showSignup ? 'block' : 'none' }}>
        <h3 className="text-center">Teacher Sign Up Form</h3>
        <div className="container mt-5">
          <div className="m-auto w-75">
            <div>
              <form className="row">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="formGroupExampleInput" className="form-label">
                      First Name
                    </label>
                    <input type="text" className="form-control" id="formGroupExampleInput" />
                  </div>
                  <div className="col-6">
                    <label htmlFor="formGroupExampleInput2" className="form-label">
                      Last Name
                    </label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" id="inputEmail4" />
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="mt-2">
                    <label htmlFor="inputYear" className="form-label">
                      Course List
                    </label>
                    <select id="inputYear" className="form-select">
                      <option selected>Choose...</option>
                      <option>Digital Signal Processing</option>
                      <option>Signal and System</option>
                      <option>Computer Fundamentals</option>
                      <option>Physics</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3 mt-5">
                    <button type="submit" className="btn btn-primary">
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="student-login-form" id="login-part" style={{ display: showLogin ? 'block' : 'none' }}>
        <h3 className="text-center mt-3">Teacher Login Form</h3>
        <div className="container mt-5">
          <div className="m-auto w-75">
            <div>
              <form className="row">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" id="inputEmail4" />
                  </div>
                </div>

                <br />
                <div className="col-12 mt-5">
                  <button type="submit" className="btn btn-primary">
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Teacher;
