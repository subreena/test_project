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
    firstName: '',
    lastName: '',
    email: '',
    roll: '',
    year: 0 ,
    term: 0 ,
    session:'' ,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === "year" || name === "term" ? parseInt(value, 10) : value;
    
    setFormData({
      ...formData,
      [name]: numericValue,
    });
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    try {
    
      const response = await fetch('https://ice-9duauifmg-sajib-baruas-projects.vercel.app/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
        
      });
      if (response.ok) {
        console.log("Success\n");
      } else {
        console.log("not ok\n");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
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
                    <input placeholder="First Name" 
                    onChange={handleInputChange}
                    type="text" name="firstName" 
                    className="form-control" />
                  </div>
                  <div className="col-md-6">
                                <input type="text"
                                 placeholder="Last Name" 
                                 name="lastName"
                                 onChange={handleInputChange}
                                 className="form-control" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      id="sign-in-email"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12">
                    
                    <input
                      type="text"
                      name="session"
                      placeholder="Session"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-12">
                    <input placeholder="ID" 
                    onChange={handleInputChange}
                    type="text" name="roll" className="form-control" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    
                    <select id="year" onChange={handleInputChange}  
                    className="form-select" name="year" type="number">
                      <option >Choose Year</option>
                      <option name="year" type="number" value={1}>1</option>
                      <option name="year" type="number" value={2}>2</option>
                      <option name="year" type="number" value={3}>3</option>
                      <option name="year" type="number" value={4}>4</option>
                    </select>
                  </div>
                  <div className="col-6">
                    
                    <select onChange={handleInputChange} className="form-select" 
                    id="term" name="term" type="number">
                      <option>Choose Term</option>
                      <option name="term" type="number" value={1}>1</option>
                      <option name="term" type="number" value={2}>2</option>
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