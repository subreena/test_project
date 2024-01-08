import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ExamControlTables from "./ExamControlTables";

const ExamControl = () => {
  const [theory, setTheory] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState(null);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const theoryData = JSON.parse(localStorage.getItem("theory"));
    const teacherCoursesData = JSON.parse(
      localStorage.getItem("teacherCourses")
    );
    setTheory(theoryData);
    setTeacherCourses(teacherCoursesData);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5005/examCommittee")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTheory(data[0].theory);
        setTeacherCourses(data[0].teachers);

        localStorage.setItem("theory", JSON.stringify(data[0].theory));
        localStorage.setItem(
          "teacherCourses",
          JSON.stringify(data[0].teachers)
        );
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
    for (let year = 4; year > 0; year--) {
      for (let term = 2; term > 0; term--) {
        if (theory[year][term].length !== 0) {
          theoryModified.push(theory[year][term]);
          yt.push([year, term]);
        }
      }
    }
    setModifiedTheory(theoryModified);
    setYearTerms(yt);
  };

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
        "Sorry! You are not a member of exam committtee yet!"
      );
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="mb-4">
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
                width: "32vw"
              }}
            >
              Teacher Wise Courses
            </button>
          </Col>
          <Col className="d-flex justify-content-center">
            <button
              onClick={toReorderExamCommittee}
              className="btn btn-success m-auto"
              style={{
                padding: "7px",
                width: "32vw"
              }}
            >
              Re-order Exam Committee
            </button>
          </Col>

          <p className="mx-3 text-danger">{examCommitteeErrorMessage}</p>
        </Row>
      </Container>
      
      <ExamControlTables modifiedTheoryProps={modifiedTheory} yearTermsProps={yearTerms} />
    </>
  );
};

export default ExamControl;
