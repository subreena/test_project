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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    year: 0,
    term: 0,
    ID: "",
    Session: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ice-web-nine.vercel.app/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 201) {
        // Successful submission
        console.log("Student data submitted successfully!");
        alert("Student login successful!");
      } else {
        // Handle errors
        alert("Unsuccessful!! Possibly duplicate Email.")
        console.error("Error submitting student data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
              <form id="studentSignup" onSubmit={handleSignupSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      id="Session"
                      name="Session"
                      className="form-control"
                      placeholder="Session"
                      value={formData.Session}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      id="ID"
                      name="ID"
                      className="form-control"
                      placeholder="Roll ID: "
                      value={formData.ID}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <select
                      id="year"
                      onChange={handleInputChange}
                      className="form-select"
                      value={formData.year}
                      name="year"
                      type="number"
                    >
                      <option>Choose Year</option>
                      <option name="year" type="number" value={1}>
                        1
                      </option>
                      <option name="year" type="number" value={2}>
                        2
                      </option>
                      <option name="year" type="number" value={3}>
                        3
                      </option>
                      <option name="year" type="number" value={4}>
                        4
                      </option>
                    </select>
                  </div>
                  <div className="col-6">
                    <select
                      onChange={handleInputChange}
                      className="form-select"
                      id="term"
                      value={formData.term}
                      name="term"
                      type="number"
                    >
                      <option>Choose Term</option>
                      <option name="term" type="number" value={1}>
                        1
                      </option>
                      <option name="term" type="number" value={2}>
                        2
                      </option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="col-6 mt-5">
                  <div className="row">
                    <div className="col-6">
                      <button type="submit" className="btn btn-success">
                        Sign up
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-success"
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
                    <input
                      type="email"
                      placeholder="Enter email for login"
                      name="email"
                      className="form-control"
                    />
                  </div>
                </div>

                <br />
                <div className="row mt-5">
                  <div className="col-6">
                    <button type="submit" className="btn btn-success">
                      Log in
                    </button>
                  </div>
                  <div className="ml-5 col-6">
                    <button
                      type="button"
                      className="btn btn-success"
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
