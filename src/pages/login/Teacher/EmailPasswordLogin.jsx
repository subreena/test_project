import { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../App";
import Teacher from "./Teacher";
import "../../../assets/stylesheets/login.css";

const EmailPasswordLogin = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIssue, setPasswordIssue] = useState("");
  const [emailIssue, setEmailIssue] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [userState, setUserState] = useContext(UserContext);
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get('redirectTo');

  console.log(props);

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

  const [loginError, setLoginError] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    setEmailIssue("");
    setPasswordIssue("");
    setLoading(true);

    console.log(window.history.state);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user && user.emailVerified) {
          setUserState(true);
          localStorage.setItem('user', JSON.stringify(user));

          const teacherApi = `https://ice-web-nine.vercel.app/teachers/by-email/${user.email}`;
          fetch(teacherApi)
          .then((response) => response.json())
          .then((data) => {
            if(data.success) {
              localStorage.setItem('teacher', JSON.stringify(data.data));
              setLoginError('');
            } else {
              setLoginError(data.error);
            }
            
          })
      .catch((error) => {
      console.error("Error fetching data:", error);
      });
          
          navigate(redirectTo || '/');
        } else if(user && !user.emailVerified) {
          setPasswordIssue("Your email is not verified! Check your email address.");
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
      })
      .finally(() => {
        setLoading(false);
      });
  };


  return (
    <>
      <Teacher isLogin={true}></Teacher>

      <main className="container mb-4">
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
                {
                  loading ? 
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  :
                  <button className="button-form " onClick={onLogin}>
                    Login
                </button>
                }
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
    </>
  );
};

export default EmailPasswordLogin;
