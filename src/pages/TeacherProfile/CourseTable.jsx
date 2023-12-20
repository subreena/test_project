import React, { useEffect, useState } from 'react';

const CourseTable = (props) => {
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    if (Array.isArray(props.courses)) {
      setCourses(props.courses);
      console.log(props.courses);
    }
  }, [props.courses]);
  
  useEffect(() => {
    if (Array.isArray(props.courses)) {
      console.log('Received courses:', props.courses);
      setCourses(props.courses);
    }
  }, [props.courses]);
  

  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Courses Name</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={`row-${course.value}`}>
            <th key={index} scope="row">{index + 1}</th>
            <td key={course.label}>{course.label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;