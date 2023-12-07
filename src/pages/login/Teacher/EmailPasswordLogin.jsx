import { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../../App";

const EmailPasswordLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIssue, setPasswordIssue] = useState("");
  const [emailIssue, setEmailIssue] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const [userState, setUserState] = useContext(UserContext);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !user.emailVerified) {
        setVerificationMessage(
          "Verification email sent! Please check your email to verify your account first."
        );
      }
    });

    return () => unsubscribe();
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    setEmailIssue("");
    setPasswordIssue("");

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user && user.emailVerified) {
          setUserState(user);
          console.log(user);
          navigate(from);
        } else if(user && !user.emailVerified) {
          setPasswordIssue("Your email is not verified!");
        } else {
          setPasswordIssue("Your given email address is not sign up yet! Create an account first!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

        if (errorCode === "auth/user-not-found") {
          setEmailIssue(
            "Your given email address is not registered yet. Please Sign up first or try another email address."
          );
        } else if (errorCode === "auth/invalid-email") {
          setEmailIssue("Your email address format is not correct!");
        } else if (errorCode === "auth/wrong-password") {
          setPasswordIssue("Wrong Password! Try again.");
        } else if(errorCode === 'auth/invalid-credential') {
          setPasswordIssue("Email or password is incorrect!")
        } else {
          setPasswordIssue(errorMessage);
        }
      });
  };

  const toggleSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div>
        {/* Buttons */}
        <div className="container">
          <div className="row mt-5">
            <div className="col-6 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={toggleSignup}
                style={{ display: "block", marginLeft: "200px" }}
              >
                Want to Sign up?
              </button>
            </div>
            <div className="col-6 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                style={{ display: "none", marginRight: "200px" }}
              >
                Want to Log in?
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container d-flex justify-content-center mt-5">
        <section>
          <div className="login-form">
            <h3 className="text-center mb-3">Teacher Login Form</h3>
            {verificationMessage && (
              <div className="alert alert-success text-center">
                {verificationMessage}
              </div>
            )}
            <form>
              <div className="form-group">
                <label className="label-form" htmlFor="email-address">
                  Email address
                </label>
                <input
                  className="input-form"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              {emailIssue && (
                <div className="alert alert-danger text-center">
                  {emailIssue}
                </div>
              )}

              <div className="form-group">
                <label className="label-form" htmlFor="password">
                  Password
                </label>
                <input
                  className="input-form"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              {passwordIssue && (
                <div className="alert alert-danger text-center">
                  {passwordIssue}
                </div>
              )}

              <div className="form-group btn-right mt-3">
                <button className="button-form " onClick={onLogin}>
                  Login
                </button>
              </div>
            </form>

            <p className="text-sm text-center mt-3">
              Forgot your password? <Link to="/forgotpassword">Reset</Link>
            </p>

            <p className="text-sm text-center mt-3">
              No account yet? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EmailPasswordLogin;
