import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseTable from './CourseTable';
import { Link } from 'react-router-dom';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('teacher'));
    console.log(data);
    setTeacher(data);
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
    <div className="container mb-5" style={{width: "700px"}}>
      <div className='d-flex flex-row'>
        <h1 className='p-2'>Profile</h1>
        <strong><Link to='edit-teacher' className='p-2'>Edit</Link></strong>
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
            <strong>Joining Date:</strong> {new Date(joiningDate).toLocaleDateString()}
          </p>
          <p className="card-text">
            <strong>In Exam Committee:</strong> {isInExamCommittee ? 'Yes' : 'No'}
          </p>
          <p className="card-text">
            <strong>In Routine Committee:</strong> {isInRoutineCommittee ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
