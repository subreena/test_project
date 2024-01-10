import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/style.css";
import "../../../assets/stylesheets/login.css";
import { useEffect, useState } from "react";

const Teacher = ({ isLogin }) => {
  const navigate = useNavigate();

  const toggleSignup = () => {
    navigate("/signup");
  };
  const toggleLogin = () => {
    navigate("/login");
  };

  const [hiddenLoginBtn, setHiddenLoginBtn] = useState('');
  const[hiddenSignupBtn, setHiddenSignupBtn] = useState('');
  useEffect(() => {
    if(isLogin) {
      setHiddenLoginBtn('hidden-button');
      setHiddenSignupBtn('');
    } else {
      setHiddenLoginBtn('');
      setHiddenSignupBtn('hidden-button');
    }

    console.log(isLogin);
  }, [isLogin])

  useEffect(() => {
    console.log(hiddenLoginBtn, hiddenSignupBtn);
  }, [hiddenLoginBtn, hiddenSignupBtn]);

  return (
    <div>
      {/* Buttons */}
      <div className="container container-fluid mb-2">
        <div className="row">
          <div className="col-6 d-flex justify-content-end">
            <button
              type="button"
              className={`btn btn-primary ${hiddenSignupBtn}`}
              onClick={toggleSignup}
            
            >
              Want to Sign up?
            </button>
          </div>
          <div className="col-6 d-flex justify-content-start">
            <button
              type="button"
              className={`btn btn-primary ${hiddenLoginBtn}`}
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
