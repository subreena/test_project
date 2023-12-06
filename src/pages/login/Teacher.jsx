import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

//

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
  //firstName - string
  // lastName - string
  // email – string (unique)
  // mobile - string
  // teacherCode – string (unique)
  // courses – Array (only course code)
  // designation - string
  // department - string
  // joiningDate - Date
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    codeName: "",
    email: "",
    courses: [],
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Handle other input fields as before
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ice-lpycr33m4-sajib-baruas-projects.vercel.app/teachers",
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
        alert("Teacher Sign up Successful");
        console.log(formData);
        console.log("data submitted successfully!");
        console.log("Request Payload:", JSON.stringify(formData));
      } else {
        // Handle errors
        console.log(formData);
        console.log("Request Payload:", JSON.stringify(formData), formData);
        console.error("Error submitting  data.");
      }
    } catch (error) {
      console.log(formData);
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      {/* Buttons */}
      <div className="container">
        <div className="row mt-5">
          <div className="col-6" style={{paddingLeft: '350px'}}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleSignup}
              style={{ display: !showSignup ? "block" : "none" }}
            >
              Want to Sign up?
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleLogin}
              style={{ display: !showLogin ? "block" : "none" }}
            >
              Want to Login?
            </button>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div
        className="mt-3"
        id="signup-part"
        style={{ display: showSignup ? "block" : "none" }}
      >
        <h3 className="text-center">Teacher Sign Up Form</h3>
        <div className="container mt-5">
          <div className="m-auto w-75">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-6 mb-1">
                    <label htmlFor="firstName"> First Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="firstName"
                      onChange={handleFormChange}
                      value={formData.firstName}
                    />
                  </div>
                  <div className="col-6">
                  <label htmlFor="lastName"> Last Name: </label>
                    <input
                      type="text"
                      placeholder=""
                      name="lastName"
                      onChange={handleFormChange}
                      value={formData.lastName}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mt-1 mb-1">
                  <div className="col-12">
                  <label htmlFor="teacherCode">Teacher Code</label>
                    <input
                      type="text"
                      placeholder=""
                      name="teacherCode"
                      onChange={handleFormChange}
                      value={formData.teacherCode}
                      className="form-control"
                    />
                  </div>
                  <div className="row mt-1 mb-1">
                  <div className="col-12">
                  <label htmlFor="email"> Email: </label>
                    <input
                      type="email"
                      placeholder=""
                      name="email"
                      onChange={handleFormChange}
                      value={formData.email}
                      className="form-control"
                    />
                  </div>
                  </div>
                <div className="row mt-1 mb-1">
                <div className="col-12">
                  <label htmlFor="password"> Password: </label>
                    <input
                      type="password"
                      placeholder=""
                      name="password"
                      onChange={handleFormChange}
                      value=""
                      className="form-control"
                    />
                  </div>
                </div>
                  <div className="row mt-1 mb-1">
                  <div className="col-12">
                  <label htmlFor="mobile"> Mobile Number: </label>
                    <input
                      type="text"
                      placeholder=""
                      name="mobile"
                      onChange={handleFormChange}
                      value={formData.mobile}
                      className="form-control"
                    />
                  </div>
                  </div>

                 <div className="row mt-1 mb-1">
                 <div className="col-12">
                  <label htmlFor="designation"> Designation: </label>
                    <select name="designation" className="form-control">
                      <option value="-1">Choose Designation</option>
                      <option value={formData.designation}>Professor</option>
                      <option value={formData.designation}>
                        Assistant Professor
                      </option>
                      <option value={formData.designation}>
                        Associate Professor
                      </option>
                      <option value={formData.designation}>Lecturer</option>
                    </select>
                  </div>
                 </div>
                 <div className="row mt-1 mb-1">
                 <div className="col-12">
                  <label htmlFor="department"> Department: </label>
                    <input
                      type="text"
                      placeholder=""
                      name="department"
                      onChange={handleFormChange}
                      value={formData.department}
                      className="form-control"
                    />
                  </div>
                 </div>
                  <div className="col-12 mt-1 mb-1">
                  <label htmlFor="joiningDate"> Joining Date: </label>
                    <input
                      type="date"
                      placeholder=""
                      name="joiningDate"
                      onChange={handleFormChange}
                      value={formData.joiningDate}
                      className="form-control"
                    />
                  </div>
                  <div className="row mt-3">
                  <div className="col-12">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic checkbox toggle button group"
                    >
                      <label className="btn">Extra Duty: </label>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck1"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck1"
                        
                      >
                        Exam Comitee
                      </label>

                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btncheck2"
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="btncheck2"
                      >
                        Routine Comittee
                      </label>
                    </div>
                  </div>
                  </div>
                </div>

                <div className="row mt-1"></div>
                <br />
                <div className="row">
                  <div className="col-3 mt-5">
                    <Link to="/dashboard">
                    <button type="submit" className="btn btn-primary">
                      Sign up
                    </button>
                    </Link>
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
        <h3 className="text-center mt-3">Teacher Login Form</h3>
        <div className="container mt-5">
          <div className="m-auto w-75">
            <div>
              <form className="row">
                <div className="row">
                  <div className="col-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email for log in"
                      name="email"
                    />
                  </div>
                </div>

                <br />
                <div className="col-12 mt-5">
                  <Link to="/dashboard">
                  <button type="submit" className="btn btn-primary">
                    Log in
                  </button>
                  </Link>
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
