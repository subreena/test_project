import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/style.css";
import "../../../assets/stylesheets/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import Select from "react-select";
import Teacher from "./Teacher";

const Signup = () => {
  const navigate = useNavigate();

  // firstName - string
  // lastName - string
  // email – string (unique)
  // mobile - string
  // teacherCode – string (unique)
  // courses – Array (only course code)
  // designation - string
  // department - string
  // joiningDate - Date

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInExamCommittee, setIsInExamCommittee] = useState(false);
  const [isInRoutineCommittee, setIsInRoutineCommittee] = useState(false);

  const [passwordIssue, setPasswordIssue] = useState("");
  const [emailIssue, setEmailIssue] = useState("");
  const [signupIssue, setSignupIssue] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordIssue("Your password is not matched!");
    } else if (password !== "" && password.length < 8) {
      setPasswordIssue("Try at least 8 characters in your password");
    } else {
      setPasswordIssue("");
    }
  }, [password, confirmPassword]);

  const onGoogleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);

      if (errorCode === "auth/invalid-email") {
        setEmailIssue("Your email address format is not correct!");
      } else if(errorCode === "auth/email-already-in-use") {
        setSignupIssue("Your given email address is already in use. Try another one or log in now!");
      } else {
        setEmailIssue(error.message);
      }
    }
  };

  const onDatabaseSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      mobile,
      teacherCode,
      courses: selectedCourses,
      designation,
      department,
      password: "Ha Ha Ha",
      joiningDate,
      isAdmin,
      isInExamCommittee,
      isInRoutineCommittee,
    };

    console.log(formData);
    try {
      const result = await fetch("https://ice-web-nine.vercel.app/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        // Successfully saved
        console.log("Data saved successfully");
        onGoogleSubmit(e);
      } else {
        const error = await result; // Get the error message
        console.error("Error:", error);
        if(error.status === 400) {
          setSignupIssue("Your given email address is already in use. Try another one or log in now!");
        }
        else {
          setSignupIssue(error.text());
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setSignupIssue(error.message);
    }
  };

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [coursesFromBackend, setCoursesFromBackend] = useState([]);

  const [courseDetailsError, setCourseDetailsError] = useState('');

  // Mock data for courses fetched from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ice-web-nine.vercel.app/courseDetails"
        );
        let data = await response.json();

        if(data.success) {
          const courseDetails = data.data;
          courseDetails.sort((a, b) => a.code.localeCompare(b.code));

          const courses = courseDetails.map((course) => ({
            value: course.code,
            label: course.code + ": " + course.name,
          }));

          setCoursesFromBackend(courses);
          setCourseDetailsError('');
        } else {
          setCourseDetailsError(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check if coursesFromBackend is not empty before filtering
    if (coursesFromBackend.length > 0) {
      // Filter and update course options based on search input
      const filteredCourses = coursesFromBackend.filter((course) =>
        course.label.toLowerCase().includes(searchInput.toLowerCase())
      );

      setCourseOptions(filteredCourses);
    }
  }, [searchInput, coursesFromBackend]);

  const handleCourseChange = (selectedOptions) => {
    setSelectedCourses(selectedOptions);
  };

  const toggleLogin = () => {
    navigate("/login");
  };

  const [otherDepartment, setOtherDepartment] = useState('');
  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleOtherDepartmentChange = (e) => {
    setOtherDepartment(e.target.value);
    setDepartment(e.target.value);
  };

  return (
    <div>
     
        {/* Buttons */}
      <Teacher isLogin={false}></Teacher>

      <main className="container">
        <section>
          <div className="signup-form">
            <h3 className="text-center mb-4">Teacher Create Account Form</h3>
            <form className="form">
              <div className="row form-group">
                <div className="col-6 mb-1">
                  <label className="label-form" htmlFor="firstName">
                    {" "}
                    First Name:{" "}
                  </label>
                  <input
                    type="text"
                    className="input-form"
                    placeholder="First Name"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </div>
                <div className="col-6">
                  <label className="label-form" htmlFor="lastName">
                    {" "}
                    Last Name:{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className="input-form"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label-form" htmlFor="email-address">
                  Email address:
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
                <div className="alert alert-danger">{emailIssue}</div>
              )}

              <div className="form-group">
                <label className="label-form" htmlFor="mobile">
                  Mobile Number:
                </label>
                <input
                  className="input-form"
                  type="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="Mobile Number"
                />
              </div>

              <div className="form-group">
                <label className="label-form" htmlFor="teacherCode">
                  Teacher Code:
                </label>
                <input
                  className="input-form"
                  type="text"
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                  required
                  placeholder="Teacher Code"
                />
              </div>

              <div className="form-group">
                <label className="label-form" htmlFor="courses">
                  Select Courses:
                </label>
                <Select
                  className="input-form"
                  isMulti
                  value={selectedCourses}
                  options={courseOptions}
                  onChange={handleCourseChange}
                  onInputChange={(value) => setSearchInput(value)}
                  placeholder="Search and select courses"
                />
              </div>

              <div className="form-group">
                <label className="label-form" htmlFor="designation">
                  Designation:
                </label>
                <input
                  className="input-form"
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                  placeholder="Designation"
                />
              </div>

              <div className="form-group">
                <label className="label-form">Department:</label>
                <div>
                  <input
                    type="radio"
                    id="ice"
                    name="department"
                    value="ICE, NSTU"
                    checked={department === "ICE, NSTU"}
                    onChange={handleDepartmentChange}
                  />
                  <label className="mx-2" htmlFor="ice">ICE</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="other"
                    name="department"
                    value="Other"
                    checked={department === "Other"}
                    onChange={handleDepartmentChange}
                  />
                  <label className="mx-2" htmlFor="other">Other</label>
                  {department === "Other" && (
                    <input
                      type="text"
                      value={otherDepartment}
                      onChange={handleOtherDepartmentChange}
                      placeholder="Enter your department"
                    />
                  )}
                </div>
              </div>

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

              <div className="form-group">
                <label className="label-form" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  className="input-form"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                />
              </div>

              {passwordIssue && (
                <div className="alert alert-danger text-center">
                  {passwordIssue}
                </div>
              )}

              <div className="form-group">
                <label className="label-form" htmlFor="joiningDate">
                  Joining Date:
                </label>
                <input
                  className="input-form"
                  type="date"
                  name="joiningDate"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  required
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

                    {/* Exam Committee Checkbox */}
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck1"
                      autoComplete="off"
                      checked={isInExamCommittee}
                      onChange={() => setIsInExamCommittee(!isInExamCommittee)}
                    />
                    <label
                      className="btn btn-outline-primary h6"
                      htmlFor="btncheck1"
                    >
                      Exam Committee
                    </label>

                    {/* Routine Committee Checkbox */}
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck2"
                      autoComplete="off"
                      checked={isInRoutineCommittee}
                      onChange={() =>
                        setIsInRoutineCommittee(!isInRoutineCommittee)
                      }
                    />
                    <label
                      className="btn btn-outline-primary h6"
                      htmlFor="btncheck2"
                    >
                      Routine Committee
                    </label>
                  </div>
                </div>
              </div>
              
              {signupIssue && (
                <div className="alert alert-danger text-center mt-3">
                  {signupIssue}
                </div>
              )}
              <div className="form-group btn-right mt-3">
                <button
                  className="button-form"
                  type="submit"
                  onClick={onDatabaseSubmit}
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="link-text mt-3">
              Already have an account? <NavLink to="/login">Log in now</NavLink>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;
