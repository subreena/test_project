import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/style.css";
function Student() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

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
     

      {/* Signup Form */}
      <div
        className="student-signup-form"
        id="signup-part"
        style={{ display: showSignup ? "block" : "none" }}
      >
        <h3 className="text-center mt-3">Student Sign Up Form</h3>
        <div className="container mt-5">
          <div className="m-auto w-75">
            <div>
              <form className="row" id="studentSignup">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="sign-in-email"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="roll" className="form-label">
                      Roll Number
                    </label>
                    <input type="text" name="roll" className="form-control" />
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-6">
                    <label htmlFor="year" className="form-label">
                      Year
                    </label>
                    <select id="year" className="form-select">
                      <option selected>Choose Year</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="term" className="form-label">
                      Semester
                    </label>
                    <select id="term" className="form-select">
                      <option selected>Choose Semester</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="col-6 mt-5">
                 <div className="row">
                 <div className="col-6">
                 <button type="submit" className="btn btn-primary">
                    Sign up
                  </button>
                 </div>
                 <div className="col-6">
                 <button
                    type="button"
                    className="btn btn-primary"
                    onClick={toggleLogin}
                    style={{ display: showLogin ? "none" : "block" }}
                  >
                    Want to Login?
                  </button>
                 </div>
                  
                 </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div
        className="student-login-form"
        id="login-part"
        style={{ display: showLogin ? "block" : "none" }}
      >
        <h3 className="text-center mt-3">Student Login Form</h3>
        <div className="container mt-5">
          <div className="m-auto w-75">
            <div>
              <form className="row">
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="login-email"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" />
                  </div>
                </div>

                <br />
                <div className="row mt-5">
                <div className="col-6">
                  <button type="submit" className="btn btn-primary">
                    Log in
                  </button>
                </div>
                <div className="ml-5 col-6">
                <button
              type="button"
              className="btn btn-primary"
              onClick={toggleSignup}
              style={{ display: showSignup ? "none" : "block" }}
            >
              Want to Sign up?
            </button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
