import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

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
   <>
     <table className='table table-striped'>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Courses Name</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={`row-${course.value}`} >
            <th key={index} scope="row">
              <p>
              {index + 1}
              </p>
            </th>
            <td key={course.label}>
              <p>
              {course.label}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   </>
  );
};

export default CourseTable;