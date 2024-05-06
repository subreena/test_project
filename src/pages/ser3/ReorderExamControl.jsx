import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect, useRef } from "react";
import "../../assets/stylesheets/exam-control.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Download from "../../assets/components/Download";
import ManualExamControlTables from "./ManualExamControlTables";

const ReorderExamControl = () => {
  const pdfRef = useRef();
  const [theory, setTheory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [defaults, setDefaults] = useState(true);
  const [examControlData, setExamControlData] = useState(null);
  const [senderName, setSenderName] = useState('');

  useEffect(() => {
    const { theory: locationTheory } = location.state || {};
    console.log(locationTheory);
    setTheory(locationTheory);
  }, []);

  useEffect(() => {
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
    toModifiedTheory();
  }, [theory]);

  const [examCommitteeError, setExamCommitteeError] = useState('');

  const generateExamCommitteeTheory = async (e) => {
    try{
    // Display an alert to confirm before proceeding
    const shouldGenerate = window.confirm("Are you sure you want to re-order the Exam Committee?");
    if (!shouldGenerate) {
        // If the user clicks "Cancel" in the alert, do nothing
        return;
    }
    setLoading(true);
    e.preventDefault();

    const response = await fetch(
      "https://ice-web-nine.vercel.app/generateExamCommittee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: year,
          semester: semester
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const d = await response.json();
    console.log(d);
    if (d.success) {
      const data = d.data;
      console.log(data);
      setExamControlData(data);
      setTheory(data.theory);
      setExamCommitteeError('');
    } else {
      setExamCommitteeError(d.error);
    }
    // setErrorMessage("");
  } catch (error) {
    // setErrorMessage(error.message);
    console.error("Error creating Exam Control:", error);
  } finally {
    setLoading(false);
    setDefaults(false);
  }
  };

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem('teacher'));
    if(teacher?.isInExamCommittee === false) {
      navigate('/');
    }
  }, []);

  const handleSubmit =  (event) => {
    event.preventDefault();
    console.log(year, semester);         
  };

  const handleYearChange = (event) => {
    const inputValue = event.target.value;

    if (!isNaN(inputValue) && inputValue >= 1900 && inputValue <= 2100) {
      setYear(inputValue);
    } else {
      // Handle invalid input (optional)
      setYear('');
    }
  };

  const handleInputChange = (event) => {
    const { name, value, id } = event.target;

    console.log(name, value, id);

    const newValue = event.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;

    console.log(newValue);

    setSemester(newValue);
  };

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const name = `${teacher.firstName} ${teacher.lastName}`;
    console.log(name);
    setSenderName(name);
  }, []);

  let serviceId = null;
  const handleSubmitForApproval = async (event) => {
    try {
      // Display an alert to confirm before proceeding
      const shouldGenerate = window.confirm(
        "Are you sure you want to submit the routine?"
      );

      if (!shouldGenerate) {
        // If the user clicks "Cancel" in the alert, do nothing
        return;
      }

      setLoading(true);
      event.preventDefault();

      const response = await fetch(
        "https://ice-web-nine.vercel.app/generateExamCommittee/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: examControlData,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      console.log(d);
      if (d.success) {
        const data = d.data;
        serviceId = data._id;
        setExamCommitteeError("");
        console.log(serviceId);
      } else {
        setExamCommitteeError(d.error);
      }
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    } finally {
      setLoading(false);
      setDefaults(false);
    }

    // to save it at pending service
    try {
      // Make a POST request to your endpoint
      const response = await fetch("https://ice-web-nine.vercel.app/pendingService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: serviceId,
          serviceName: "Theory Exam Committee",
          senderName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      console.log("pending: ", d);
      if (!d.success) {
        setExamCommitteeError(d.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="container">
          <h2 className="text-center fs-1">Generate Exam Committee</h2>
          <hr />
        </div>
      </div>
      <div>
      <form action="" onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-6">
                {/* exam year */}
                <div className="row">
                  <div className="col-auto ">
                    <label htmlFor="examYear" className="form-label">
                      Exam Year:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="number"
                      id="yearInput"
                      name="examYear"
                      onChange={handleYearChange}
                      placeholder="e.g., 2022"
                      min="2004"
                      required
                      max="2100"
                      className="form-control"
                    />
                    <p
                      className={
                        year
                          ? "text-success text-sm"
                          : "text-danger text-sm"
                      }
                    >
                      Selected Year: {year || "No year selected"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                {/* semester selection */}
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="semester">Semester Selection</label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="btn-check"
                      id="odd"
                      name="semester"
                      autoComplete="off"
                      required
                      onChange={handleInputChange}
                    />
                    <label className="btn btn-outline-primary" htmlFor="odd">
                      Odd
                    </label>
                    &nbsp; &nbsp;
                    <input
                      type="radio"
                      className="btn-check"
                      id="even"
                      name="semester"
                      autoComplete="off"
                      required
                      onChange={handleInputChange}
                    />
                    <label className="btn btn-outline-primary" htmlFor="even">
                      Even
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>  
      </div>
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
          Click To Generate
        </button>
          </Col>
        </Row>
      </Container>

      {
            defaults ? (
              <div></div>
            ) : 
            (
              loading ? (
                <div className="d-flex justify-content-center mt-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div ref={pdfRef}>
                  <ManualExamControlTables 
                    modifiedTheoryProps={modifiedTheory} 
                    yearTermsProps={yearTerms} 
                    isExamCommittee={true}
                  />
                  </div>
                  <div className="text-center d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-primary bg-primary bg-gradient h-100"
                      type="submit"
                      onClick={handleSubmitForApproval}
                    >
                      Submit for Approval
                    </button>
                  </div>
                  <div>
                    <Download pdfRef={pdfRef} fileName={"Proposed-Routine.pdf"} />
                  </div>
                </div>
              )
            )
          }
    </div>
  );
};

export default ReorderExamControl;