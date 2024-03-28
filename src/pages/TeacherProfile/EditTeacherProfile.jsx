import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import "../../assets/stylesheets/login.css";

const EditTeacherProfile = () => {
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
  const [joiningDate, setJoiningDate] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInExamCommittee, setIsInExamCommittee] = useState(false);
  const [isInRoutineCommittee, setIsInRoutineCommittee] = useState(false);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [coursesFromBackend, setCoursesFromBackend] = useState([]);

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem('teacher'));
    console.log(teacher);
    teacher.joiningDate = new Date(teacher.joiningDate);

    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setMobile(teacher.mobile);
    setDesignation(teacher.designation);
    setDepartment(teacher.department);
    setEmail(teacher.email);
    setTeacherCode(teacher.teacherCode);
    setJoiningDate(teacher.joiningDate.toISOString().split('T')[0]);
    setIsInExamCommittee(teacher.isInExamCommittee);
    setIsInRoutineCommittee(teacher.isInRoutineCommittee);
    
    setSelectedCourses(teacher.courses);

    console.log(teacher.joiningDate);
  }, []);

  const [courseError, setCourseError] = useState('');

  // Mock data for courses fetched from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ice-web-nine.vercel.app/courseDetails"
        );
        let data = await response.json();
        if(data.success) {
          let courseDetails = data.data;
          // Sort the in-memory array by 'course_code'
          courseDetails.sort((a, b) => a.code.localeCompare(b.code));

          const courses = courseDetails.map((course) => ({
            value: course.code,
            label: course.code + ": " + course.name,
          }));

          setCoursesFromBackend(courses);
          setCourseError('');
        } else {
          setCourseError(data.error);
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

  const onUpdateDatabase = async (e) => {
    e.preventDefault();

    const newData = {
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
  
    console.log(newData);

    try {
    const response = await fetch('https://ice-web-nine.vercel.app/teachers/updateTeacher', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newData }),
    });

    if (response.ok) {
        console.log('Teacher updated successfully');
        localStorage.setItem('teacher', JSON.stringify(newData));
        navigate('/profile');
        // You can handle success, e.g., show a success message or redirect
    } else {
        console.error('Failed to update teacher');
        // Handle error, e.g., show an error message to the user
    }
    } catch (error) {
        console.error('Error updating teacher:', error);
    }
  }

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
      <div className="container">
        <div className="">
          <div className="signup-form">
            <h3 className="text-center mb-4  h3">Teacher Update Account Form</h3>
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
                    placeholder={firstName}
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
                    placeholder={lastName}
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className="input-form"
                  />
                </div>
              </div>

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
                  placeholder={mobile}
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
                  placeholder={teacherCode}
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
                      className="btn btn-outline-primary"
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
                      className="btn btn-outline-primary"
                      htmlFor="btncheck2"
                    >
                      Routine Committee
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-group btn-right mt-3">
                <button
                  className="button-form"
                  type="submit"
                  onClick={onUpdateDatabase}
                >
                  Update
                </button>
              </div>
            </form>

            <p className="link-text mt-3">
              Nothing to update? <NavLink to="/profile">Go Back to Profile</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeacherProfile;
