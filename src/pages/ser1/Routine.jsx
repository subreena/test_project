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

  // useEffect(() => {
  //   const routineData = JSON.parse(localStorage.getItem("routine"));
  //   const yearTermsData = JSON.parse(localStorage.getItem("yearTerms"));
  //   setRoutine(routineData);
  //   setYearTerms(yearTermsData);
  // }, []);

  const [routineError, setRoutineError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let routineId;

        const response1 = await fetch("https://ice-web-nine.vercel.app/serviceId");
        const data1 = await response1.json();
        console.log(data1);
        if (data1.success) {
          routineId = data1.data[0]["classRoutine"];
          console.log(routineId);

          const response2 = await fetch(
            `https://ice-web-nine.vercel.app/classRoutineManagement/data/${routineId}`
          );
          const data2 = await response2.json();
          console.log(data2);
          if (data2.success) {
            const data = data2.data;
            console.log(data);
            setYearTerms(data.yearTerm);
            setRoutine(data.overall);
            setTeachersName(data.routineTeachersName);
            console.log(data.routineTeachersName);

            localStorage.setItem("routine", JSON.stringify(data.overall));
            localStorage.setItem("yearTerms", JSON.stringify(data.yearTerm));
            localStorage.setItem(
              "routineTeachersName",
              JSON.stringify(data.routineTeachersName)
            );
            setRoutineError("");
          } else {
            setRoutineError(data2.error);
          }
        } else {
          setRoutineError(data1.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [routineCommitteeErrorMessage, setRoutineCommitteeErrorMessage] =
    useState("");
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    setTeacher(data);
    // console.log(data);
    // console.log(yearTerms);
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
        <Row>
          <Col className="mt-1 mb-3 d-flex justify-content-center">
            <Link to="/alldocuments">
              <button
                className="btn btn-success"
                style={{
                  padding: "7px",
                  margin: "10px",
                  width: "20vw",
                }}
              >
               All Documents
              </button>
            </Link>
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
          </Col>
        </Row>
        <Row>
          <b>
            <p className="mx-3 text-danger text-center text-small">
              {routineError}
            </p>
          </b>
        </Row>

        <CustomDropdown
          coursesName={teachersName}
          selectedCourse={selectedTeacher}
          handleSelectChange={handleSelectChange}
          title="Teacher"
        />
        <br />
      </Container>

      <div className="" ref={pdfRef}>
        <div className="container">
          <h4 className="text-center">Class Routine</h4>
          <hr />
        </div>
        <RoutineTable
          routineProps={routine}
          yearTermProps={yearTerms}
          selectedTeacher={selectedTeacher}
        />
      </div>
      <Download pdfRef={pdfRef} fileName={"current-routine.pdf"} />
    </>
  );
};

export default Routine;
