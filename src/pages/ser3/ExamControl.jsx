import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExamControlTables from "./ExamControlTables";
import CustomDropdown from "./CustomDropdown";

const ExamControl = () => {
  const [theory, setTheory] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState(null);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [coursesName, setCoursesName] = useState([]);
  const [courseTeachers, setCourseTeachers] = useState([]);
  const navigate = useNavigate();

  const getObjectKeysAsArray = (obj) => {
    return Object.keys(obj).map((key) => key);
  };

  useEffect(() => {
    const theoryData = JSON.parse(localStorage.getItem("theory"));
    const teacherCoursesData = JSON.parse(
      localStorage.getItem("teacherCourses")
    );
    setTheory(theoryData);
    setTeacherCourses(teacherCoursesData);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/examCommittee")
      .then((response) => response.json())
      .then((d) => {
        if(d.success) {
          console.log(data);
          const data = d.data;
          setTheory(data[0].theory);
          setTeacherCourses(data[0].teachers);

          localStorage.setItem("theory", JSON.stringify(data[0].theory));
          localStorage.setItem(
            "teacherCourses",
            JSON.stringify(data[0].teachers)
          );
          setExamCommitteeErrorMessage('');
        } else {
          setExamCommitteeErrorMessage(d.error);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    toModifiedTheory();
  }, [theory]);

  const toModifiedTheory = () => {
    if (!(theory && theory.length > 0)) return;

    var theoryModified = [],
      yt = [];
    let allCourseInfo = {};
    for (let year = 4; year > 0; year--) {
      for (let term = 2; term > 0; term--) {
        if (theory[year][term].length !== 0) {
          theoryModified.push(theory[year][term]);
          yt.push([year, term]);

          // to create course wise teachers array
          const ytCourses = theory[year][term];
          for (
            let courseIndex = 0;
            courseIndex < ytCourses.length;
            courseIndex++
          ) {
            const singleCourse = ytCourses[courseIndex];
            for (
              let teacherIndex = 0;
              teacherIndex < singleCourse.length;
              teacherIndex++
            ) {
              console.log(singleCourse);
              const courseName = `${singleCourse[0].course.code}: ${singleCourse[0].course.name}`;
              allCourseInfo[courseName] = singleCourse;
            }
          }
        }
      }
    }

    setCourseTeachers(allCourseInfo);
    setCoursesName(getObjectKeysAsArray(allCourseInfo));
    setModifiedTheory(theoryModified);
    setYearTerms(yt);
  };

  const [examCommitteeErrorMessage, setExamCommitteeErrorMessage] =
    useState("");
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    setTeacher(data);
  }, []);

  const toReorderExamCommittee = () => {
    if (teacher?.isInExamCommittee) {
      setExamCommitteeErrorMessage("");
      navigate("/create-exam-control", { state: { theory } });
    } else {
      setExamCommitteeErrorMessage(
        "Sorry! May be you are not logged in or not a member of the Exam Committtee yet!"
      );
    }
  };

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    console.log(filteredTeachers);
  }, [filteredTeachers]);

  const handleSelectChange = (value) => {
    const selectedOption = value;
    setSelectedCourse(selectedOption);
    const filterCourses = selectedOption ? courseTeachers[selectedOption] : [];
    setFilteredTeachers(filterCourses);

    console.log(filterCourses, courseTeachers[selectedOption]);
  };

  return (
    <>
      <Container className="container-fluid">
        <Row>
          <Col className="d-flex justify-content-end">
            <button
              onClick={() =>
                navigate("/exam-control-teacher-wise", {
                  state: { teacherCourses },
                })
              }
              className="btn btn-success"
              style={{
                padding: "7px",
                width: "32vw",
              }}
            >
              Teacher Wise Courses
            </button>
          </Col>
          <Col className="d-flex justify-content-start">
            <button
              onClick={toReorderExamCommittee}
              className="btn btn-success"
              style={{
                padding: "7px",
                width: "32vw",
              }}
            >
              Re-order Committee
            </button>
          </Col>

          <p className="mx-3 text-danger text-center text-small">{examCommitteeErrorMessage}</p>
        </Row>
      </Container>

      <Container fluid>
        <Row className="mb-3 text-small">
          <CustomDropdown
            coursesName={coursesName}
            selectedCourse={selectedCourse}
            handleSelectChange={handleSelectChange}
            title="Course"
          />
        </Row>

        {selectedCourse && (
          <Row className="d-flex justify-content-center mb-5 text-small">
            <Col md={6}>
              <p>
                Search result for <b>{selectedCourse}</b>:
              </p>
              <table
                className="table table-striped table-hover text-small"
                style={{
                  height: "220px",
                  padding: "0 5px",
                  border: "1px solid grey",
                }}
              >
                <caption className="text-small1">{selectedCourse}</caption>
                <thead>
                  <tr>
                    <th scope="col"> # </th>
                    <th scope="col"> Name </th>
                    <th scope="col"> Designation </th>
                    <th scope="col"> Address </th>
                    <th scope="col"> Remark </th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredTeachers.map((teacher, index) => (
                    <tr key={`row-${index}`}>
                      <td scope="row"> {index + 1} </td>
                      <td> {teacher.teacher.name} </td>
                      <td> {teacher.teacher.designation} </td>
                      <td> {teacher.teacher.department} </td>
                      <td> {teacher.teacher.remark} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        )}
      </Container>

      { !selectedCourse && (
          <ExamControlTables
            modifiedTheoryProps={modifiedTheory}
            yearTermsProps={yearTerms}
          />
      )}
    </>
  );
};

export default ExamControl;
