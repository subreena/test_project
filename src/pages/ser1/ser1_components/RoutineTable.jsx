import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/ser1-style.css";
import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Row } from "react-bootstrap";

const RoutineTable = (props) => {
  const { routineProps, yearTermProps, selectedTeacher } = props;
  const [routine, setRoutine] = useState([]);
  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const [overall, setOverall] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);

  useEffect(() => {
    console.log(selectedTeacher);
  }, [selectedTeacher]);

  useEffect(() => {
    setRoutine(routineProps);
    setYearTerms(yearTermProps);
    setOverall(yearTermProps);

    console.log(routineProps);
  }, [routineProps, yearTermProps]);

  useEffect(() => {
    toModifiedRoutine();
  }, [yearTerms, routine, selectedTeacher]);

  const toModifiedRoutine = () => {
    if (!(routine && routine.length > 0)) return;

    console.log(yearTerms);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    var onlyFirstTime = true;
    var routineModified = [];

    let state = 1, labClass = "", labState = 0;
    for (let day = 0; day < days.length; day++) {
      for (let yearTerm = 0; yearTerm < yearTerms.length; yearTerm++) {
        const year = yearTerms[yearTerm][0];
        const term = yearTerms[yearTerm][1];

        let cellBgColor = "bg-color";
        if (state) cellBgColor = "";

        var row = [];
        if (yearTerm === 0) {
          row.push(
            <td rowSpan={yearTerms.length}  className="vertical">
              
              
                <p style={{transform: 'rotate(-90deg)',  marginBlockStart: '0em', marginBlockEnd:'0em',}}>
                  <strong>
                  {days[day]}
                  </strong>
                </p>
            
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
             <strong>
             <p style={{transform: 'rotate(-90deg)', marginBlockStart: '0em', marginBlockEnd:'0em'}}> Lunch Break</p>
             </strong>
              </td>
            );
            onlyFirstTime = false;
          }

          const block = routine[day][year][term][timeSlot];

          const teacherName = `${block?.teacher?.firstName} ${block?.teacher?.lastName}`;
          const teacher2Name = `${block?.teacher2?.firstName} ${block?.teacher2?.lastName}`;
          if (block.isAllocated && (!selectedTeacher || teacherName === selectedTeacher || teacher2Name === selectedTeacher)) {
            const currentCourseCode = block.course.code;
            const onlyCode = currentCourseCode.split('-')[1];
            const onlyCodeNum = parseInt(onlyCode, 10);
            if (onlyCodeNum%2 === 1) {
              labClass = "";
              labState = 0;
            } else if (labState === 0) {
              labClass = "lab-style1";
              labState ^= 1;
            } else {
              labClass = "lab-style2";
              labState ^= 1;
            }

            let teacherString = block.teacher.teacherCode;
            if(block['teacher2'] !== undefined) {
              teacherString += `+${block.teacher2.teacherCode}`;
            }

            row.push(
              <td
                key={`block-${day}-${year}-${term}-${timeSlot}`}
                className={`${cellBgColor} ${labClass}`}
                style={{ textAlign: "center" }}
              >
                {block.course.code} <br />
                {teacherString} <br />
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
      <Container fluid>
        <Row>
          <div>
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
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RoutineTable;