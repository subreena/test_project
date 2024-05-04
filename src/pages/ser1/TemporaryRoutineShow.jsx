import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/ser1-style.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RoutineTable from "./ser1_components/RoutineTable";
import CustomDropdown from "../ser3/CustomDropdown";
import { Col, Container, Row } from "react-bootstrap";
import Download from "../../assets/components/Download";

const Routine = () => {
  let { id, state } = useParams();

  console.log(id, state);
  
  let uri = `https://ice-web-nine.vercel.app/routine/data/${id}/routine`;
  if(state === 'permanent') uri = `https://ice-web-nine.vercel.app/classRoutineManagement/data/${id}`;

  const pdfRef = useRef();
  const [routine, setRoutine] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachersName, setTeachersName] = useState([]);

  const [routineError, setRoutineError] = useState("");

  useEffect(() => {
    fetch(uri)
      .then((response) => response.json())
      .then((d) => {
        console.log(d);
        if (d.success) {
          const data = d.data;
          console.log(data);
          setYearTerms(data.yearTerm);
          setRoutine(data.overall);
          setTeachersName(data.routineTeachersName);
          console.log(data.routineTeachersName);

          setRoutineError("");
        } else {
          setRoutineError(d.error);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const [routineCommitteeErrorMessage, setRoutineCommitteeErrorMessage] =
    useState("");

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
        <div className="mt-3 d-flex justify-content-center">
          <div>
            <Row>
              <Col>
                <Link to="/alldocuments">
                  <button
                    className="btn btn-success"
                    style={{
                      padding: "7px",
                      width: "32vw",
                      marginRight: "15px",
                    }}
                  >
                    All Documents
                  </button>
                </Link>
              </Col>
              <Col>
                <Link to={`/create-routine/${id}`}>
                  <button
                    className="btn btn-success"
                    style={{
                      padding: "7px",
                      width: "32vw",
                      marginLeft: "15px",
                    }}
                  >
                    Edit Routine
                  </button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
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
      <Download pdfRef={pdfRef} fileName={"current-routine.pdf"} />
    </>
  );
};

export default Routine;
