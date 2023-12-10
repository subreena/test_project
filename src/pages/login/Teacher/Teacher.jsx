import { useNavigate } from "react-router-dom";
import "./Login.css";

const Teacher = () => {
  const navigate = useNavigate();

  const toggleSignup = () => {
    navigate("/signup");
  };
  const toggleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* Buttons */}
      <div className="container">
        <div className="row mt-5" style={{margin: 'auto'}}>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleSignup}
            
            >
              Want to Sign up?
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleLogin}
              
            >
              Want to Log in?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
