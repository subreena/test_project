import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseTable from "./CourseTable";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/ser2-style.css";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [committee, setCommittee] = useState([]);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    console.log(data);
    setTeacher(data);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5005/teachers")
      .then((res) => res.json())
      .then((data) => {
        setCommittee(data);
      });
  }, []);


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
    <div className="container mb-5" style={{ maxWidth: "800px" }}>
      <div className="d-flex flex-row">
        <h1 className="p-2">Profile</h1>
        <strong>
          <Link to="edit-teacher" className="p-2">
            Edit
          </Link>
        </strong>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Name: {`${firstName} ${lastName}`}</h3>
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
        <div className="row">
        <div className="col-sm-12 col-lg-6">
        <div className="card m-2">
          <div className="pro-card">
          <div className="card-body">
            <p className="text-bold h5">
              Routine Committee Members
            </p>
          <ol type="1">
          {committee
            .filter((teacher) => teacher.isInRoutineCommittee === true)
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
       <div className="col-sm-12 col-lg-6">
       <div className="card m-2">
       <div className="pro-card">
          <div className="card-body">
            <p className="text-bold h5">
              Exam Committee Members
            </p>
          <ol type="1" >
          {committee
            .filter((teacher) => teacher.isInExamCommittee === true)
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
      </div>
      <div className="card">
        <div className="card-body">
          <p className="h5">
            See Teacher Information  &nbsp;
            <Link to="/teacherdetails">
          <button className="btn btn-primary">
            Click here
          </button>
          </Link>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
