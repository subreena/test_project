import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseTable from "./CourseTable";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/ser2-style.css";
import "../../assets/stylesheets/login.css";
import icon from "../../assets/images/user.png";
import img from "../../assets/images/sub.png";
import VC from "../../assets/images/VC.png";
import ICE from "../../assets/images/ICE-chairman.png";
import EEE from "../../assets/images/EEE-chairman.png";
import SuperAdmin from "./SuperAdmin";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [committee, setCommittee] = useState([]);
  const [superAdmin, setSuperAdmin] = useState(false);
  const [routineView, setRoutineView] = useState(false);
  const [examView, setExamView] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    console.log(data);
    setTeacher(data);
  }, []);

  useEffect(() => {
    fetch("https://ice-web-nine.vercel.app/teachers")
      .then((res) => res.json())
      .then((data) => {
        setCommittee(data);
      });
  }, []);

  const handleRoutineView = () => {
    setRoutineView(!routineView);
  };

  const handleSuperAdminView = () => {
    setSuperAdmin(!superAdmin);
  };

  const handleExamView = () => {
    setExamView(!examView);
  };
  const {
    firstName,
    lastName,
    email,
    mobile,
    teacherCode,
    courses,
    designation,
    department,
    joiningDate,
    isAdmin,
    isInExamCommittee,
    isInRoutineCommittee,
  } = teacher || {};

  return (
    <div className="container mb-5">
      <div className="row d-flex justify-content-between">
        <div className="">
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="p-2"> Teacher Profile</h1>
            <p>
            <strong>
              <Link to="edit-teacher" className="p-2">
                Edit
              </Link>
            </strong>
            </p>
          </div>
          <hr />
        </div>
      </div>

      <div className="card p-3" style={{maxWidth: "60vw", margin: "10px auto"}}>
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <span className="">
                <strong>Name: &nbsp; </strong>
              </span>
              <h3 className="card-title text-small2">
                {" "}
                {`${firstName} ${lastName}`}
              </h3>
            </div>
            <div className="col-auto">
              {email === "drmdashikurrahmankhan@gmail.com" ? (
                <img
                  src={ICE}
                  alt="user"
                  width="100"
                  height="100"
                  className="rounded mx-auto d-block img-thumbnail"
                />
              ) : email === "drmddidarulalam123@gmail.com" ? (
                <img
                  src={VC}
                  alt="user"
                  width="100"
                  height="100"
                  className="rounded mx-auto d-block img-thumbnail"
                />
              ) : email === "subratabhowmik806@gmail.com" ? (
                <img
                  src={EEE}
                  alt="user"
                  width="100"
                  height="100"
                  className="rounded mx-auto d-block img-thumbnail"
                />
              ) : (
                <img
                  src={icon}
                  alt="user"
                  width="100"
                  height="100"
                  className="rounded mx-auto d-block img-thumbnail"
                />
              )}
            </div>
          </div>

          <hr />
          <div className="card-body">
            <p className="card-text">
              <strong>Email:</strong> {email}
            </p>
            <p className="card-text">
              <strong>Mobile:</strong> {mobile}
            </p>
            <p className="card-text">
              <strong>Teacher Code:</strong> {teacherCode}
            </p>
            <p className="card-text">
              <strong>Courses:</strong> <br />
              <CourseTable courses={courses} />
            </p>
            <p className="card-text">
              <strong>Designation:</strong> {designation}
            </p>
            <p className="card-text">
              <strong>Department:</strong> {department}
            </p>
            <p className="card-text">
              <strong>Joining Date:</strong>{" "}
              {new Date(joiningDate).toLocaleDateString()}
            </p>
            <p className="card-text">
              <strong>In Exam Committee:</strong>{" "}
              {isInExamCommittee ? "Yes" : "No"}
            </p>
            <p className="card-text">
              <strong>In Routine Committee:</strong>{" "}
              {isInRoutineCommittee ? "Yes" : "No"}
            </p>
          </div>
          {/* <div className="row">
            <div className="col-12">
              <div className="card m-2">
                <div className="">
                  <div className="card-body">
                    <button
                      className="btn btn-primary w-100 mt-1 mb-3"
                      onClick={handleRoutineView}
                    >
                      See Routine Committee
                    </button>
                    <div className={routineView ? "d-block" : "d-none"}>
                      <ol type="1">
                        {committee
                          .filter(
                            (teacher) => teacher.isInRoutineCommittee === true
                          )
                          .map((teacher, index) => (
                            <li key={index}>
                              <p>
                                {teacher.firstName} {teacher.lastName}
                              </p>
                            </li>
                          ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card m-2">
                <div className="">
                  <div className="card-body">
                    <button
                      className="btn btn-info w-100 mt-1 mb-3"
                      onClick={handleExamView}
                    >
                      See Exam Committee
                    </button>
                    <div className={examView ? "d-block" : "d-none"}>
                      <ol type="1">
                        {committee
                          .filter(
                            (teacher) => teacher.isInExamCommittee === true
                          )
                          .map((teacher, index) => (
                            <li key={index}>
                              <p>
                                {teacher.firstName} {teacher.lastName}
                              </p>
                            </li>
                          ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card card m-2">
                <div className="card-body">
                  <div className="row">
                    <div className="col-4">
                      <p className="h5 card-text">
                        <Link to="/teacherdetails">
                          <button className="btn btn-primary w-100">
                            See Teacher Information
                          </button>
                        </Link>
                      </p>
                    </div>
                    <div className="col-4">
                      {isAdmin ? (
                        <p className="h5 card-text">
                          <Link to="/super-admin">
                            <button className="btn btn-primary w-100">
                              Go to SuperAdmin page
                            </button>
                          </Link>
                        </p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                    <div className="col-4">
                      <p className="h5 card-text">
                        <Link to="/previousdocuments">
                          <button className="btn btn-success w-100">
                            Previous Documents
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
