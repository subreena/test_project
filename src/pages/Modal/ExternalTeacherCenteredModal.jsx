import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";

const ExternalTeacherCenteredModal = (props) => {
  const { externalTeacher, mode, onHide, onUpdate } = props;

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

  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "edit" && externalTeacher) {
      setFirstName(externalTeacher.firstName || "");
      setLastName(externalTeacher.lastName || "");
      setEmail(externalTeacher.email || "");
      setTeacherCode(externalTeacher.teacherCode || "");
      setSelectedCourses(externalTeacher.courses || [])
    } else {
      // Reset fields for adding a new External Teacher
      setFirstName("");
      setLastName("");
      setEmail("");
      setTeacherCode("");
      setSelectedCourses([]);
    }
  }, [externalTeacher, mode]);

  const handleEdit = async (updatedExternalTeacherData) => {
    try {
      const response = await fetch("http://localhost:5000/teachers/updateExternalTeacher", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newData: updatedExternalTeacherData
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Display error from backend
        setError(result.error || "An error occurred");
      } else {
        onUpdate(); // Call parent update function
        onHide();   // Close the modal
      }
    } catch (err) {
      console.error("Error updating externalTeacher:", err);
      setError("Internal Server Error");
    }
  }

  const handleAdd = async (formData) => {

    try {
      const result = await fetch("http://localhost:5000/teachers", {
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
        
        onUpdate(); // Call parent update function
        onHide();   // Close the modal
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
  

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    if(firstName === "") {
      setError("First name field is empty!");
    } else if(lastName === "") {
      setError("Last name field is empty!");
    } else if(email === "") {
      setError("Email field is empty!");
    } else if(teacherCode === "") {
      setError("Teacher code field is empty!");
    } else {
      // no field error
      if(mode === "edit") {
        handleEdit(formData);
      } else {
        handleAdd(formData);
      }
    }
  };

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
          "http://localhost:5000/courseDetails"
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
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {mode === "edit" ? `Update ${externalTeacher?.teacherCode}` : "Add New External Teacher"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

          {mode !== "edit" && <div className="form-group">
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
          }
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
        </form>

          <Modal.Footer>
            <p className="text-danger text-bold">{error}</p>

            <div className="form-group btn-right mt-3">
            <button
              className="button-form"
              type="submit"
              onClick={handleSubmit}
            >
              {mode === "edit" ? "Update" : "Create"}
            </button>
          </div>
          </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default ExternalTeacherCenteredModal;
