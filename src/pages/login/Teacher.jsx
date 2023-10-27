import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

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
    firstName: "",
    lastName: "",
    email: "",
    courses: [],
    teacherCode: "",
  });
  
 
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const selectedCourses = [...formData.courses];
      if (checked) {
        selectedCourses.push(value);
      } else {
        const index = selectedCourses.indexOf(value);
        if (index !== -1) {
          selectedCourses.splice(index, 1);
        }
      }
      setFormData({
        ...formData,
        courses: selectedCourses,
      });
    } else {
     
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
    console.log(formData);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "https://ice-ps2h27s05-sajib-baruas-projects.vercel.app/teachers",
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
        console.log("data submitted successfully!");
      } else {
        // Handle errors
        console.error("Error submitting  data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const courseApi =
    "https://ice-ps2h27s05-sajib-baruas-projects.vercel.app/courseDetails";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(courseApi)
      .then((res) => res.json())
      .then((d) => {
        setCourses(d);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading</div>;
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
              style={{ display: !showSignup ? "block" : "none" }}
            >
              Want to Sign up?
            </button>
          </div>
          <div className="col-6 m-auto">
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
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      name="firstName"
                      onChange={handleFormChange}
                      value={formData.firstName}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={handleFormChange}
                      value={formData.lastName}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      placeholder="Teacher Code"
                      name="teacherCode"
                      onChange={handleFormChange}
                      value={formData.teacherCode}
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleFormChange}
                      value={formData.email}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="mt-2">
                    <div className="row">
                      <strong>Select courses: </strong>
                      {courses.map((c, i) => (
                        <div key={i} className="col-2">
                          <label
                            htmlFor="course"
                            title={c.name + " credit: " + c.credit}
                          >
                            <input
                              type="checkbox"
                              name="courses"
                              id="course"
                             
                              title={c.name}
                              value={c.code}
                              onChange={handleFormChange}
                            />
                            {c.code}
                          </label>
                        </div>
                      ))}
                    </div>

                    
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3 mt-5">
                    <button type="submit" className="btn btn-primary">
                      Sign up
                    </button>
                  </div>
                  <div className="col-3 mt-5">
                    <Link to="/coursedetails">
                      <button type="button" className="btn btn-primary">
                        See Course details?
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
