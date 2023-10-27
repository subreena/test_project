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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    courses: ''
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
  }

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
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6">
                 
                    <input type="text"
                     className="form-control" 
                     placeholder='First name'
                     name="firstName"
                     onChange={handleFormChange} />
                  </div>
                  <div className="col-6">
                   
                    <input type="text" 
                    placeholder='Last Name'
                    name="lastName"
                    onChange={handleFormChange}
                    className="form-control" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    
                    <input type="email"
                    placeholder='Email'
                    name="email"
                    onChange={handleFormChange}
                    className="form-control" />
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="mt-2">
                    {/* <label htmlFor="inputYear" className="form-label">
                      Course List
                    </label>
                    <select id="inputYear" className="form-select">
                      <option selected>Choose...</option>
                      <option>Digital Signal Processing</option>
                      <option>Signal and System</option>
                      <option>Computer Fundamentals</option>
                      <option>Physics</option>
                    </select> */}
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
                    
                    <input type="email" className="form-control" 
                    placeholder='Enter Email for log in'
                    name="email"
                    />
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
