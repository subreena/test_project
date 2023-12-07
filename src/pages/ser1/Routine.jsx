import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/ser1-style.css"
import React, { useState, useEffect } from 'react';
import { Container, Row } from "react-bootstrap";


const Routine = () => {
  const [routine, setRoutine] = useState([]);
  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const overall = [[1, 2], [2, 2], [3, 2], [4, 2]];
  const [yearTerms, setYearTerms] = useState(overall);

  
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };
  
  useEffect(() => {
    fetch('https://ice-web-nine.vercel.app/routine')
      .then((response) => response.json())
      .then((data) => {
        setRoutine(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    toModifiedRoutine();
  }, [yearTerms, routine]);

  const toModifiedRoutine = () => {
    if (!(routine && routine.length > 0)) return;

    console.log(yearTerms);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    var onlyFirstTime = true;
    var routineModified = [];

    for (let day = 0; day < days.length; day++) {
      for (let yearTerm = 0; yearTerm < yearTerms.length; yearTerm++) {
        const year = yearTerms[yearTerm][0];
        const term = yearTerms[yearTerm][1];

        var row = [];
        if(yearTerm === 0) {
            row.push(
                <td rowSpan={yearTerms.length} className="vertical">
                  <strong>
                    <span >{days[day]}</span>
                  </strong>
                </td>
            );
        }
        row.push(
            <td>
              <span>Y-{year}, T-{term}</span>
            </td>
        )

        for (let timeSlot = 0; timeSlot < 7; timeSlot++) {
          if (onlyFirstTime && timeSlot === 5) {
            row.push(
              <td key={`lunch-${day}-${year}-${term}`} rowSpan="25" className="vertical">
                Lunch Break
              </td>
            );
            onlyFirstTime = false;
          }

          const block = routine[0].overall[day][year][term][timeSlot];

          if (block.isAllocated) {
            row.push(
              <td key={`block-${day}-${year}-${term}-${timeSlot}`}>
                {block.course.code} <br/>
                {block.teacher.teacherCode} <br/>
                {block.room} <br/>
                {block.course.type}
              </td>
            );
          } else {
            row.push(
              <td key={`empty-${day}-${year}-${term}-${timeSlot}`}> </td>
            );
          }
        }
        routineModified.push(row);
      }
    }

    setModifiedRoutine(routineModified);
  };

  const changeYearTerm = (year, term) => {
    if(year === 0) setYearTerms(overall);
    else {
      setYearTerms([[year, term]]);
    }


  }

  return (
    <>
        
        <Container fluid>
          <Row>
            <div className="col-9">
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
            {
            modifiedRoutine.map((item, index) => (
                <React.Fragment key={index}>
                    <tr> {item} </tr>
                </React.Fragment>
            ))}
            </thead>
        </table>
            </div>
            <div className="col-3">
            <div className="m-5">
              <div className="">
              
              <button
              className="btn btn-primary"
                  style={{
                    margin: "10px",
                    padding: "10px",
                    width: "100%",
                  }}
              onClick={() => changeYearTerm(0, 0)}>
                Overall</button>
              </div>
              <div className="">
              <button
              className="btn btn-primary"
                  style={{
                    margin: "10px",
                    padding: "10px",
                    width: "100%",
                  }}
                  onClick={toggleMenu}
              >
                Semester-Wise Routine</button>
              </div>

             <div className="showbtn"
             style={{
              display:showMenu? "block":"none",
             }}>
             <Row>
              <div className="col-6">
                <button 
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="1-1"
            onClick={() => changeYearTerm(1, 1)}>Y-1, T-1</button>
                </div>
                <div className="col-6">
                <button
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="1-2"
            onClick={() => changeYearTerm(1, 2)}>Y-1, T-2</button>
                </div>
                <div className="col-6">
                <button
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="2-1"
             onClick={() => changeYearTerm(2, 1)}>Y-2, T-1</button>
                </div>
                <div className="col-6">
                <button 
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="2-2"
            onClick={() => changeYearTerm(2, 2)}>Y-2, T-2</button>
                </div>
                <div className="col-6">
                <button 
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="3-1"
            onClick={() => changeYearTerm(3, 1)}>Y-3, T-1</button>
                </div>
                <div className="col-6">
                <button
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="3-2"
            onClick={() => changeYearTerm(3, 2)}>Y-3, T-2</button>
                </div>
                <div className="col-6">
                <button 
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="4-1"
            onClick={() => changeYearTerm(4, 1)}>Y-4, T-1</button>
                </div>
                <div className="col-6">
                <button 
            className="btn btn-success"
            style={{
              margin: "10px",
              padding: "10px",
              width: "100%",
            }}
            name="4-2"
            onClick={() => changeYearTerm(4, 2)}>Y-4, T-2</button>
                </div>
              </Row>
             </div>
            
            
            
            
          
            
           
            
            
        </div>
            </div>
          </Row>
        </Container>
    </>
  );
};

export default Routine;