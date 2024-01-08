import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/ser1-style.css";
import React, { useState, useEffect, useRef } from "react";
import { Button, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Routine = () => {
  const [routine, setRoutine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const [overall, setOverall] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    fetch("http://localhost:5005/routine")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYearTerms(data[0].yearTerm);
        setOverall(data[0].yearTerm);
        setRoutine(data[0].overall);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    toModifiedRoutine();
  }, [yearTerms, routine]);

  const toModifiedRoutine = () => {
    if (!(routine && routine.length > 0)) return;

    console.log(yearTerms);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    var onlyFirstTime = true;
    var routineModified = [];

    let state = 1,
      labClass = "",
      labState = 0;
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
          <td className={cellBgColor} style={{ textAlign: "center" }}>
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
                rowSpan="200"
                className="vertical"
              >
                Lunch Break
              </td>
            );
            onlyFirstTime = false;
          }

          const block = routine[day][year][term][timeSlot];

          if (block.isAllocated) {
            if (block.course.type === "theory") {
              labClass = "";
              labState = 0;
            } else if (labState === 0) {
              labClass = "lab-style1";
              labState ^= 1;
            } else {
              labClass = "lab-style2";
              labState ^= 1;
            }

            row.push(
              <td
                key={`block-${day}-${year}-${term}-${timeSlot}`}
                className={`${cellBgColor} ${labClass}`}
                style={{ textAlign: "center" }}
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

  const changeYearTerm = (year, term) => {
    if (year === 0) setYearTerms(overall);
    else {
      setYearTerms([[year, term]]);
    }
  };

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
  const toggleRoutineCommittee = () => {
    console.log(teacher.isInRoutineCommittee);
    if (teacher?.isInRoutineCommittee) {
      setRoutineCommitteeErrorMessage("");
      navigate("/create-routine", { state: { routine } });
    } else {
      setRoutineCommitteeErrorMessage(
        "Sorry! You are not a member of routine committtee yet!"
      );
    }
  };

  const [showYearTerms, setShowYearTerms] = useState(false);

  return (
    <>
      <Button
        variant="info"
        style={{
          position: "fixed",
          top: "63px",
          right: "2px",
          zIndex: "1000",
          opacity: showYearTerms ? "1" : "0.3",
          transition: "opacity 0.3s",
        }}
        onMouseEnter={() => setShowYearTerms(true)}
        onMouseLeave={() => setShowYearTerms(false)}
      >
        Year-Term Wise
      </Button>
      {showYearTerms && (
        <ListGroup
          style={{
            position: "fixed",
            top: "100px",
            right: "2px",
            zIndex: "1000",
            width: "140px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setShowYearTerms(true)}
          onMouseLeave={() => setShowYearTerms(false)}
        >
          <ListGroup.Item key="100" onClick={() => changeYearTerm(0, 0)}>
            Overall
          </ListGroup.Item>
          {overall.map((option, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => changeYearTerm(option[0], option[1])}
            >
              {`Y-${option[0]}, T-${option[1]}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <div className="d-flex justify-content-center">
        <div>
          <button
            className="btn btn-success"
            style={{
              padding: "7px",
              width: "32vw",
              marginRight: "15px",
            }}
            onClick={toggleRoutineCommittee}
          >
            Teacher-Wise Routine
          </button>
        </div>
        <div>
          <button
            className="btn btn-success"
            style={{
              padding: "7px",
              width: "32vw",
              marginRight: "15px",
            }}
            onClick={toggleRoutineCommittee}
          >
            Re-order Routine
          </button>

          <p className="mx-3 text-danger">{routineCommitteeErrorMessage}</p>
        </div>
      </div>
      <Container fluid>
        <Row>
          <div>
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="scrollbar scrollbar-primary mx-auto">
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
              </div>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Routine;
