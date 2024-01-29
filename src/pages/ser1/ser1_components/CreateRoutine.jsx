import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/ser1-style.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RoutineTable from "./RoutineTable";
import RoutineFunction from "./RoutineFunction";
import Download from './../../../assets/components/Download';

const CreateRoutine = () => {
  const pdfRef = useRef();
  const {
    formData,
    handleInputChange,
    handleYearChange,
    generateRow,
    handleSubmit,
    handlebatchRow,
  } = RoutineFunction();

  const [routine, setRoutine] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { routine: locationRoutine, yearTerms: locationYearTerms } =
      location.state || {};
    setRoutine(locationRoutine);
    setYearTerms(locationYearTerms);
  }, []);

  const generateRoutine = () => {
    // Display an alert to confirm before proceeding
    const shouldGenerate = window.confirm(
      "Are you sure you want to generate a random routine?"
    );

    if (!shouldGenerate) {
      // If the user clicks "Cancel" in the alert, do nothing
      return;
    }

    setLoading(true);

    fetch("http://localhost:5000/generateRandomRoutine")
      .then((response) => response.json())
      .then((data) => {
        setRoutine(data.routineMatrix);
        setYearTerms(data.yearTerm);
      })
      .catch((error) => {
        console.error("Error fetching routine:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    if (teacher?.isInRoutineCommittee === false) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div>
        <div className="container">
          <h2 className="text-center fs-1">Generate Routine</h2>
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
                  formData.examYear
                    ? "text-success text-sm"
                    : "text-danger text-sm"
                }
              >
                Selected Year: {formData.examYear || "No year selected"}
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
            

        <div className="row">
          <div className="col-6">
          <div className="mb-3">
            <label htmlFor="totalBatch" className="form-label">
              Total Batch
            </label>
            <input
              type="number"
              name="totalBatch"
              min="0"
              className="form-control w-75"
              onChange={handlebatchRow}
              required
            />
          </div>
          </div>
          <div className="col-6">
            {/* Start date */}
          <div className="row mt-3">
            <div className="col-auto">
              <label htmlFor="startDate" className="form-label">
                Class Start Date{" "}
              </label>
            </div>
            <div className="col-auto">
              <input type="date" name="startDate" className="form-control" required 
              />
            </div>
          </div>
          </div>
        </div>

          

          

          <table className="mt-3 mb-3 table table-striped">
            <tbody>{generateRow()}</tbody>
          </table>
          </div>

          {/* routine table  */}

          <div className=" mt-3 d-flex justify-content-center">
            <div>
              <div className="row">
                <div className="col-6">
                  <Link to="/routine">
                    <button
                      className="btn btn-success"
                      style={{
                        padding: "7px",
                        width: "32vw",
                        marginRight: "15px",
                      }}
                    >
                      See Final Routine
                    </button>
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-success"
                    style={{
                      padding: "7px",
                      width: "32vw",
                      marginLeft: "15px",
                    }}
                    onClick={generateRoutine}
                  >
                    Click to Re-order
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center mt-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
          <div ref ={pdfRef}>
              <RoutineTable routineProps={routine} yearTermProps={yearTerms} />
          </div>
          )}
        <div className="mb-3 mt-3 d-flex justify-content-center">
        <button className="btn btn-primary" type="submit">Submit for Approval</button>
        </div>
        <div>
          <Download pdfRef={pdfRef} fileName={"Proposed-Routine.pdf"}/>
        </div>
        </form>
      </div>
    </>
  );
};

export default CreateRoutine;
