import React, { useEffect, useState } from 'react';
import CustomDropdown from '../../ser3/CustomDropdown';
import { useParams } from 'react-router-dom';

const TeacherPriorityUpdater = () => {
  const {year, semester} = useParams();
  
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [submitSuccess, setUpdateSuccess] = useState('');
  const [submitError, setUpdateError] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teachersName, setTeachersName] = useState([]);
  const [formattedTeacherList, setFormattedTeacherList] = useState([]);
  const [priorityData, setPriorityData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/priority/teacher/data/${year}/${semester}`);
        const data = await response.json();
        if (data.success) {
          // console.log(data.data[0].teachers);
          setTeacherList(data.data[0].teachers);
          setPriorityData(data.data[0]);
        }
      } catch (error) {
        // console.log(error);
      }

      try {
        const response = await fetch("http://localhost:5000/teachers");
        const data = await response.json();
        if (data.success) {
          // console.log(data.data);
          setTeachers(data.data);

          const formattedOptions = data.data.map(teacher => 
            `${teacher.firstName} ${teacher.lastName}-${teacher.teacherCode}`);
          setTeachersName(formattedOptions);

        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(teachers.length !== 0 && teacherList.length !== 0) {
      // Step 1: Create a map of teacherCode -> teacher object
      const teacherMap = {};
      for (const teacher of teachers) {
        teacherMap[teacher.teacherCode] = teacher;
      }

      // Step 2: Map teacherList using the map for O(1) lookup
      const formattedTeachers = teacherList
        .map(code => {
          const teacher = teacherMap[code];
          return teacher
            ? `${teacher.firstName} ${teacher.lastName}-${teacher.teacherCode}`
            : null;
        })
        .filter(Boolean); // Remove any nulls in case of unmatched codes

      // Step 3: Update state
      setFormattedTeacherList(formattedTeachers);
      // // console.log(formattedNames);
      
      // To exclude those teachers which are already included teacherList 
      // Step 1: Convert teacherList to a Set for O(1) lookup
      const teacherSet = new Set(teacherList);

      // Step 2: Filter out the teachers already in teacherList and format the rest
      const formattedNames = teachers
        .filter(teacher => !teacherSet.has(teacher.teacherCode))
        .map(teacher => `${teacher.firstName} ${teacher.lastName}-${teacher.teacherCode}`);

      // Step 3: Set state
      setTeachersName(formattedNames);
    }
  }, [teachers, teacherList])

  const handleSelectChange = (value) => {
    setSelectedTeacher(value);
  };

  // useEffect(() => {
  //   // console.log(teachersName);
  // }, [teachersName]);

  // Handle adding a new teacher
  const addTeacher = () => {
    // console.log(selectedTeacher);
    if (selectedTeacher) {
        setFormattedTeacherList([...formattedTeacherList, selectedTeacher]);
    }

    const newTeachersName = teachersName.filter(teacher => teacher !== selectedTeacher);

    setSelectedTeacher("");
    setTeachersName(newTeachersName);
    setUpdateError("");
  };

  // Handle removing a teacher
  const removeTeacher = (index) => {
      setTeachersName([...teachersName, formattedTeacherList[index]]);

      setFormattedTeacherList(formattedTeacherList.filter((_, i) => i !== index));
  };

  const builtTeachersCodeList = () => {
    return formattedTeacherList.map(teacher => (teacher.split('-')[1]));
  }

  const [loading, setLoading] = useState(false);

  const updateMethod = async () => {
    try {
      // Display an alert to confirm before proceeding
      const shouldGenerate = window.confirm(
        "Are you sure you want to update the Teacher Priority List?"
      );

      if (!shouldGenerate) {
        // If the user clicks "Cancel" in the alert, do nothing
        return;
      }

      setLoading(true);
      const updatedData = {
        ...priorityData,
        teachers: builtTeachersCodeList(),
      };

      const response = await fetch(
        `http://localhost:5000/priority/teacher/update/${year}/${semester}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newData: updatedData
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      // // console.log(d);
      if (d.success) {
        const data = d.data;
        // // console.log(data);
        setUpdateError("");
        setUpdateSuccess('Teacher Priority successfully updated!');
      } else {
        setUpdateError(d.error);
        setUpdateSuccess('');
      }
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
      if (!year || !semester || teacherList.length === 0) {
          setUpdateError('Please ensure year, semester, and at least one teacher is selected.');
      } else {
          updateMethod();
          setUpdateError('');
      }
  };

  return (
      <div>
          <h2 className="text-center">Update Teacher Priority</h2>
          <hr />

          <div className="container my-3">
              <div className="row">
                  <div className="col-6 d-flex justify-content-end">
                      <h5>Year: {year}</h5>
                  </div>
                  <div className="col-6 d-flex justify-content-start">
                      <h5>Semester: {semester}</h5>
                  </div>
              </div>
          </div>

          <div className="d-flex justify-content-center">
              <div className="container d-flex justify-content-center m-3">
                  <table border="1" cellPadding="10">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th className="text-center">Teacher Name-Code</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {formattedTeacherList.map((teacher, index) => (
                              <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{teacher}</td>
                                  <td>
                                      <button className="btn btn-danger" onClick={() => removeTeacher(index)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x-fill" viewBox="0 0 16 16">
                                              <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"/>
                                          </svg>
                                      </button>
                                  </td>
                              </tr>
                          ))}
                          <tr>
                              <td>~</td>
                              <td>
                                  <CustomDropdown
                                      coursesName={teachersName}
                                      selectedCourse={selectedTeacher}
                                      handleSelectChange={handleSelectChange}
                                      title="Teacher"
                                  />
                              </td>
                              <td>
                                  <button className="btn btn-success" onClick={addTeacher}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                          <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                                      </svg>
                                  </button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          {submitError && <div className="alert alert-danger text-center mx-2">{submitError}</div>}
          {submitSuccess && <div className="alert alert-success text-center mx-2">{submitSuccess}</div>}
          
          {
            loading ? (
              <div className="d-flex justify-content-center mt-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="text-center mb-3 d-flex justify-content-around">
                <button
                    className="btn btn-primary text-white bg-primary bg-gradient w-25"
                    onClick={handleUpdate}
                >
                    Update
                </button>
              </div>
            )
          }
      </div>
  );
};

export default TeacherPriorityUpdater;
