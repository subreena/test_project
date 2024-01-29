import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/ser1-style.css";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RoutineTable from "./RoutineTable";

const CreateRoutine = () => {
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
      <div className="d-flex justify-content-center">
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
        <RoutineTable routineProps={routine} yearTermProps={yearTerms} />
      )}
    </>
  );
};

export default CreateRoutine;
