import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { useLocation, useNavigate } from "react-router-dom";
import ExamControlTables from "./ExamControlTables";
import { Col, Container, Row } from "react-bootstrap";

const ReorderExamControl = () => {
  const [theory, setTheory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { theory: locationTheory } = location.state || {};
    console.log(locationTheory);
    setTheory(locationTheory);
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

  const generateExamCommitteeTheory = () => {
    // Display an alert to confirm before proceeding
    const shouldGenerate = window.confirm("Are you sure you want to re-order the Exam Committee?");
    if (!shouldGenerate) {
        // If the user clicks "Cancel" in the alert, do nothing
        return;
    }
    setLoading(true);

    fetch(
      "https://ice-web-nine.vercel.app/generateExamCommittee"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const newRoutine = [];
        newRoutine.push({
          theory: data,
        });
        setTheory(newRoutine[0].theory);
      })
      .catch((error) => {
        console.error("Error fetching theory:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem('teacher'));
    if(teacher?.isInExamCommittee === false) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Container fluid>
        <Row className="mb-4">
          <Col className="d-flex justify-content-end">
          <button
          onClick={() => {navigate('/examcontrol')}}
            className="btn btn-success"
            style={{
              padding: "7px",
              width: "32vw"
            }}
          >
            Back To Exam Committee
        </button>
          </Col>
          <Col className="d-flex justify-content-start">
          <button
          onClick={generateExamCommitteeTheory}
          className="btn btn-success"
          style={{
            padding: "7px",
            width: "32vw"
          }}
        >
          Click To Re-order
        </button>
          </Col>
        </Row>
      </Container>
      
      {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
        <ExamControlTables modifiedTheoryProps={modifiedTheory} yearTermsProps={yearTerms} />
      )}
    </div>
  );
};

export default ReorderExamControl;