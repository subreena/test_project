import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/ser1-style.css";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CreateRoutine = () => {
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const { routine: locationRoutine } = location.state || {};
    console.log(locationRoutine);
    setRoutine(locationRoutine);
  }, []);

  useEffect(() => {
    toModifiedRoutine();
  }, [routine]);

  const overall = [
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
  ];
  const [yearTerms, setYearTerms] = useState(overall);

  const toModifiedRoutine = () => {
    if (!(routine && routine.length > 0)) return;

    console.log(yearTerms);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    var onlyFirstTime = true;
    var routineModified = [];

    let state = 1;
    for (let day = 0; day < days.length; day++) {
      for (let yearTerm = 0; yearTerm < yearTerms.length; yearTerm++) {
        const year = yearTerms[yearTerm][0];
        const term = yearTerms[yearTerm][1];

        let cellBgColor = "bg-color";
        if (state) cellBgColor = "";

        var row = [];
        if (yearTerm === 0) {
          row.push(
            <td rowSpan={yearTerms.length} className="vertical">
              <strong>
                <span>{days[day]}</span>
              </strong>
            </td>
          );
        }
        row.push(
          <td className={cellBgColor}>
            <span>
              Y-{year}, T-{term}
            </span>
          </td>
        );

        for (let timeSlot = 0; timeSlot < 7; timeSlot++) {
          if (onlyFirstTime && timeSlot === 5) {
            row.push(
              <td
                key={`lunch-${day}-${year}-${term}`}
                rowSpan="25"
                className="vertical"
              >
                Lunch Break
              </td>
            );
            onlyFirstTime = false;
          }

          const block = routine[0].overall[day][year][term][timeSlot];

          if (block.isAllocated) {
            row.push(
              <td
                key={`block-${day}-${year}-${term}-${timeSlot}`}
                className={cellBgColor}
              >
                {block.course.code} <br />
                {block.teacher.teacherCode} <br />
                {block.room}
              </td>
            );
          } else {
            row.push(
              <td
                key={`empty-${day}-${year}-${term}-${timeSlot}`}
                className={cellBgColor}
              >
                {" "}
              </td>
            );
          }
        }

        state = state ^ 1;
        routineModified.push(row);
      }
    }

    setModifiedRoutine(routineModified);
  };

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

    fetch("https://ice-web-nine.vercel.app/generateRandomRoutine")
        .then((response) => response.json())
        .then((data) => {
            setLoading(false);
            const newRoutine = [];
            newRoutine.push({
                overall: data
            })
            setRoutine(newRoutine)
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
    console.log(teacher?.isInRoutineCommittee);
    if (teacher?.isInRoutineCommittee === false) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Container>
        <div className="text-center">
          <h1 className="text-center">Routine Generator</h1>
          <div className="row">
            <div className="col-6">
              <Link to="/routine">
                <button
                  className="btn btn-success"
                  style={{
                    display: "inline-block",
                    margin: "50px auto",
                    padding: "10px",
                    width: "100%",
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
                  display: "inline-block",
                  margin: "50px auto",
                  padding: "10px",
                  width: "100%",
                }}
                onClick={generateRoutine}
              >
                Re-order Routine
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="routine-table">
            <thead>
              <tr>
                <td className="routine-header-tr">Day</td>
                <td className="routine-header-tr">Term, Year</td>
                <td className="routine-header-tr">9:00-9:45</td>
                <td className="routine-header-tr">9:50-10:35</td>
                <td className="routine-header-tr">10:40-11:25</td>
                <td className="routine-header-tr">11:30-12:15PM</td>
                <td className="routine-header-tr">12:15-1:00PM</td>
                <td className="routine-header-tr">1:00-2:00PM</td>
                <td className="routine-header-tr">2:00-2:50PM</td>
                <td className="routine-header-tr">2:55-3:45PM</td>
              </tr>
            </thead>
            <thead>
              {modifiedRoutine.map((item, index) => (
                <React.Fragment key={index}>
                  <tr> {item} </tr>
                </React.Fragment>
              ))}
            </thead>
          </table>
        )}
      </Container>
    </>
  );
};

export default CreateRoutine;
