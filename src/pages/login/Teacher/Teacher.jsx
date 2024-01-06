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
        <div className="row">
          <div className="col-12">
            <div className=" mt-3 mb-5 text-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleSignup}
            style={{margin: "10px 20px"}}
            
            >
              Want to Sign up?
            </button>
            <button
              type="button"
              className="btn btn-primary ml-3"
              onClick={toggleLogin}
              style={{marginRight: "10px 20px "}}
            >
              Want to Log in?
            </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
