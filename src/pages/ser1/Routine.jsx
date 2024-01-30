import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/ser1-style.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoutineTable from "./ser1_components/RoutineTable";
import CustomDropdown from "../ser3/CustomDropdown";
import { Col, Container, Row } from "react-bootstrap";
import Download from "../../assets/components/Download";

const Routine = () => {
  const pdfRef = useRef();
  const [routine, setRoutine] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachersName, setTeachersName] = useState([]);

  useEffect(() => {
    const routineData = JSON.parse(localStorage.getItem("routine"));
    const yearTermsData = JSON.parse(localStorage.getItem("yearTerms"));
    setRoutine(routineData);
    setYearTerms(yearTermsData);
  }, []);

  useEffect(() => {
    fetch("https://ice-web-nine.vercel.app/routine")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYearTerms(data[0].yearTerm);
        setRoutine(data[0].overall);
        setTeachersName(data[0].routineTeachersName);

        localStorage.setItem("routine", JSON.stringify(data[0].overall));
        localStorage.setItem("yearTerms", JSON.stringify(data[0].yearTerm));
        localStorage.setItem(
          "routineTeachersName",
          JSON.stringify(data[0].routineTeachersName)
        );
      })
      .catch((error) => console.error(error));
  }, []);

  const [routineCommitteeErrorMessage, setRoutineCommitteeErrorMessage] =
    useState("");
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    setTeacher(data);
    console.log(data);
    console.log(yearTerms);
  }, []);

  const navigate = useNavigate();
  const toCreateRoutine = () => {
    if (teacher?.isInRoutineCommittee) {
      setRoutineCommitteeErrorMessage("");
      navigate("/create-routine", { state: { routine, yearTerms } });
    } else {
      setRoutineCommitteeErrorMessage(
        "Sorry! May be you are not logged in or not a member of the Routine Committtee yet!"
      );
    }
  };

  const handleSelectChange = (value) => {
    setSelectedTeacher(value);
  };

  return (
    <>
      <Container fluid>
        <CustomDropdown
          coursesName={teachersName}
          selectedCourse={selectedTeacher}
          handleSelectChange={handleSelectChange}
          title="Teacher"
        />
        <br />
        <Row>
          <Col className="mt-3 mb-3 d-flex justify-content-center">
            <button
              className="btn btn-success bg-success bg-gradient "
              style={{
                padding: "7px",
                margin: "10px",
                width: "20vw",
              }}
              onClick={toCreateRoutine}
            >
              Generate Routine
            </button>
            <Link to="/previousdocuments">
              <button
                className="btn btn-success"
                style={{
                  padding: "7px",
                  margin: "10px",
                  width: "20vw",
                }}
              >
                Previous Documents
              </button>
            </Link>
          </Col>
        </Row>
        <Row>
          <p className="mx-3 text-danger text-center text-small">
            {routineCommitteeErrorMessage}
          </p>
        </Row>
      </Container>

      <div className="" ref={pdfRef}>
        <div className="container">
        <p className="h5 text-center">Class Routine</p>
        <hr />
        </div>
      <RoutineTable
        routineProps={routine}
        yearTermProps={yearTerms}
        selectedTeacher={selectedTeacher}
      />
      </div>
      <Download pdfRef={pdfRef} fileName={"current-routine.pdf"}/>
    </>
  );
};

export default Routine;
