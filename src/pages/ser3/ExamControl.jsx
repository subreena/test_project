import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect, useRef } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExamControlTables from "./ExamControlTables";
import CustomDropdown from "./CustomDropdown";
import Download from "../../assets/components/Download";

const ExamControl = () => {
  const { id, state } = useParams();
  const pdfRef = useRef();
  const [theory, setTheory] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState(null);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [coursesName, setCoursesName] = useState([]);
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allServiceId, setAllServiceId] = useState(null);
  const navigate = useNavigate();

  const getObjectKeysAsArray = (obj) => {
    return Object.keys(obj).map((key) => key);
  };

  // useEffect(() => {
  //   const theoryData = JSON.parse(localStorage.getItem("theory"));
  //   const teacherCoursesData = JSON.parse(
  //     localStorage.getItem("teacherCourses")
  //   );
  //   setTheory(theoryData);
  //   setTeacherCourses(teacherCoursesData);
  // }, []);

  let uri = `https://ice-web-nine.vercel.app/examCommittee/data/${id}/examcommittees`;
  if(state === 'permanent') uri = `https://ice-web-nine.vercel.app/TheoryExamCommitteeManagement/data/${id}`;

  useEffect(() => {
    setLoading(true);
    if(id) {
      // to show temporary data
      fetch(uri)
      .then((response) => response.json())
      .then((d) => {
        console.log(d);
        if(d.success) {
          const data = d.data;
          console.log(data);
          setYearTerms(data.yearTerm);
          setTheory(data.theory);
          setTeacherCourses(data.teachers);

          setExamCommitteeErrorMessage('');
          setLoading(false);
        } else {
          setExamCommitteeErrorMessage(d.error);
          setLoading(false);
        }
      })
      .catch((error) => console.error(error));
    } else {
      // to show default data
      fetch("https://ice-web-nine.vercel.app/serviceId")
        .then((response) => response.json())
        .then((d) => {
          if (d.success) {
            const data = d.data;
            setAllServiceId(data[0]);
            setExamCommitteeErrorMessage("");
          } else {
            setExamCommitteeErrorMessage(d.error);
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    if(allServiceId) {
      const exam_routine_id = allServiceId?.theoryExamCommittee;

      fetch(
        `https://ice-web-nine.vercel.app/TheoryExamCommitteeManagement/data/${exam_routine_id}`
      )
        .then((response) => response.json())
        .then((d) => {
          if (d.success) {
            const data = d.data;
            console.log(data);
            setYearTerms(data.yearTerm);
            setTheory(data.theory);
            setTeacherCourses(data.teachers);

            setExamCommitteeErrorMessage('');
            setLoading(false);
          } else {
            setExamCommitteeErrorMessage(d.error);
            setLoading(false);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [allServiceId]);

  useEffect(() => {
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
      console.log(yt);
    };

    toModifiedTheory();
  }, [theory]);

  const [examCommitteeErrorMessage, setExamCommitteeErrorMessage] = useState("");

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
        {id ? (
            <Col className="d-flex justify-content-center">
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
          ) : (
            <>
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
                  Re-order Exam Committee
                </button>
              </Col>
            </>
          )}

          <b> <p className="my-3 text-danger text-center text-small">{examCommitteeErrorMessage}</p> </b>
        </Row>
      </Container>

    <div ref={pdfRef}>
    <Container fluid>
        <div>
          <h3 className="text-center">Examination Committee and Question Moderators <span className="text-small">
          (Theory)</span></h3>
        </div>
        <hr />
        {
          loading ? (
            <div className="d-flex justify-content-center mt-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div>
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
            </div>
        )}
      </Container>

      { !selectedCourse && (
          <ExamControlTables
            modifiedTheoryProps={modifiedTheory}
            yearTermsProps={yearTerms}
            isExamCommittee={true}
          />
      )}
    </div>
    <Download pdfRef={pdfRef} fileName={"exam-committee.pdf"} />
    </>
  );
};

export default ExamControl;
