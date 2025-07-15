import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/style.css";
import Select from "react-select";

const CreateExternalTeacher = () => {

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
  const [joiningDate, setJoiningDate] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInExamCommittee, setIsInExamCommittee] = useState(false);
  const [isInRoutineCommittee, setIsInRoutineCommittee] = useState(false);

  const [emailIssue, setEmailIssue] = useState("");
  const [signupIssue, setSignupIssue] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setEmailIssue("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailIssue("Invalid email format.");
    } else {
      setEmailIssue(""); // No issue, clear error message
    }
  };
    
  const [emailTouched, setEmailTouched] = useState(false);
  useEffect(() => {
    if(emailTouched) validateEmail(email);
  }, [email])

  const handleEmail = value => {
    setEmail(value);
    setEmailTouched(true);
  }

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
      department: "Other",
      password: "Ha Ha Ha",
      joiningDate,
      isAdmin,
      isInExamCommittee,
      isInRoutineCommittee,
    };

    console.log(formData);
    try {
      const result = await fetch("https://teachercopilot.vercel.app/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (result.ok) {
        // Successfully saved
        console.log(result);
        console.log("Data saved successfully");
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
          "https://teachercopilot.vercel.app/courseDetails"
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

  return (
    <div>
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
                  onChange={(e) => handleEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>
              {emailIssue && (
                <div className="alert alert-danger">{emailIssue}</div>
              )}

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
                  Create
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateExternalTeacher;
