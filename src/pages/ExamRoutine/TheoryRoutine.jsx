import { useEffect, useRef, useState } from "react";
import Download from "../../assets/components/Download";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const TheoryRoutine = () => {
  const { id, state } = useParams();
  const pdfRef = useRef();
  const [routine, setRoutine] = useState({
    examYear: "",
    totalBatch: 0,
    gapBetweenExams: 0,
    semester: "",
    sessions: [
      { session: "", totalStudents: "", startDate: "", year: 0, term: 0 },
    ],
    unavailableDates: [],
    theoryExamRoutine: [{ courseCode: "", date: "" }],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [allServiceId, setAllServiceId] = useState(null);

  let uri = `https://ice-web-nine.vercel.app/theoryExamRoutine/data/${id}/TheoryExamRoutine`;
  if(state === 'permanent') uri = `https://ice-web-nine.vercel.app/TheoryExamRoutineManagement/data/${id}`;

  useEffect(() => {
    setLoading(true);
    if (id) {
      // to show temporary data
      fetch(
        uri
      )
        .then((response) => response.json())
        .then((d) => {
          console.log(d);
          if (d.success) {
            const data = d.data;
            console.log(data);
            setRoutine(data);

            setErrorMessage("");
            setLoading(false);
          } else {
            setErrorMessage(d.error);
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
            setErrorMessage("");
          } else {
            setErrorMessage(d.error);
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    if(allServiceId) {
      const exam_routine_id = allServiceId?.theoryExamRoutine;

      fetch(
        `https://ice-web-nine.vercel.app/TheoryExamRoutineManagement/data/${exam_routine_id}`
      )
        .then((response) => response.json())
        .then((d) => {
          if (d.success) {
            const data = d.data;
            setRoutine(data);

            localStorage.setItem("theoryExamRoutine", JSON.stringify(data));
            setErrorMessage("");
            setLoading(false);
          } else {
            setErrorMessage(d.error);
            setLoading(false);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [allServiceId]);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="mb-3 d-flex justify-content-center">
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
            <Link to="/create-theory-exam-routine">
              <button
                className="btn btn-success bg-success bg-gradient "
                style={{
                  padding: "7px",
                  margin: "10px",
                  width: "20vw",
                }}
              >
                Generate Routine
              </button>
            </Link>
          </Col>
        </Row>
        <b><p className="text-danger text-center">{errorMessage}</p></b>
      </Container>
      {
        <div className="container mb-5">
          <div className="mt-3 ">
            <div style={{ margin: "20px auto" }}>
              <div className="card" ref={pdfRef}>
                <div className="card-body">
                  <h3 className="text-center">Theory Exam Routine</h3>
                  {loading ? (
                    <div className="d-flex justify-content-center mt-4">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <Table striped bordered hover>
                      <thead>
                        <tr className="text-center">
                          <th>#</th>
                          <th>Date</th>
                          <th>Course Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routine?.theoryExamRoutine?.map((data, index) => (
                          <tr key={index} className="text-center">
                            <td>{index + 1}</td>
                            <td>{data.date}</td>
                            <td>{data.courseCode}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>
              </div>
              <Download pdfRef={pdfRef} fileName={"Theory-Exam-Routine.pdf"} />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default TheoryRoutine;
