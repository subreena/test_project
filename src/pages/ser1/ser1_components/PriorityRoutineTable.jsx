import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/ser1-style.css";
import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Row } from "react-bootstrap";
import GeneralDropdown from "../../../assets/components/GeneralDropdown";

const PriorityRoutineTable = () => {
  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const [timeslots, setTimeslots] = useState([]);
  const [teacherSlots, setTeacherSlots] = useState({});
  const [teachersList, setTeachersList] = useState([]);
  

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:5000/teachers");
        const data = await response.json();
  
        if (data.success) {
          // Format the data
          const formattedSlots = {};
  
          data.data.forEach((teacher) => {
            formattedSlots[teacher.teacherCode] = Array(days.length).fill().map(() => Array(timeslots.length).fill(false));
          });

          // Update state
          setTeacherSlots(formattedSlots);

          const formattedTeachers = [];

          data.data.forEach((teacher) => {
            formattedTeachers.push({
              value: teacher.teacherCode,
              label: `${teacher.firstName} ${teacher.lastName}`
            })
          })

          setTeachersList(formattedTeachers);
        } else {
          console.error("Failed to fetch teachers:", data.error);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    const fetchTimeslot = async () => {
      try {
        const response = await fetch("http://localhost:5000/timeSlot");
        if (!response.ok) {
          throw new Error("Failed to fetch timeslots");
        }
        const data = await response.json();
        setTimeslots(data.data[0].timeSlot);

        fetchTeachers();
      } catch (error) {
        console.error("Error fetching timeslots:", error);
      }
    };

    fetchTimeslot();
  }, []);

  useEffect(() => {
    if(timeslots.length !== 0) toModifiedRoutine();
  }, [timeslots, selectedTeacher, teacherSlots]);

  const toModifiedRoutine = () => {
    var onlyFirstTime = true;
    var routineModified = [];

    for (let day = 0; day < days.length; day++) {
      var row = [];
      row.push(
        <td>
          <p>
            <strong>{days[day]}</strong>
          </p>
        </td>
      );

      for (let timeSlot = 0; timeSlot < timeslots.length; timeSlot++) {
        if (onlyFirstTime && timeSlot === 5) {
          row.push(
            <td
              key={`lunch-${day}-${timeSlot}`}
              rowSpan="200"
              className="vertical"
            >
              <strong>
                <p
                  style={{
                    transform: "rotate(-90deg)",
                    marginBlockStart: "0em",
                    marginBlockEnd: "0em",
                  }}
                >
                  {" "}
                  Lunch Break{" "}
                </p>
              </strong>
            </td>
          );
          onlyFirstTime = false;
        }

        row.push(
          <td
            key={`block-${day}-${timeSlot}`}
            style={{ textAlign: "center" }}
          >
            <button
             onClick={() => handleToggle(day, timeSlot)}
             className={`btn ${
              teacherSlots[selectedTeacher]?.[day]?.[timeSlot] ? "bg-green" : "bg-orange"
              }`}>
                &nbsp;
            </button>
          </td>
        );
      }
      routineModified.push(row);
    }

    setModifiedRoutine(routineModified);
  };
  
  const handleToggle = (day, timeSlot) => {
    if (selectedTeacher && day >= 0 && timeSlot >= 0) {
      setTeacherSlots((prevSlots) => {
        // Deep clone the object to avoid mutability issues
        const updatedSlots = JSON.parse(JSON.stringify(prevSlots));
  
        // Ensure the nested structure exists
        if (!updatedSlots[selectedTeacher]) updatedSlots[selectedTeacher] = {};
        if (!updatedSlots[selectedTeacher][day]) updatedSlots[selectedTeacher][day] = {};
  
        // Toggle the value
        updatedSlots[selectedTeacher][day][timeSlot] = !updatedSlots[selectedTeacher][day][timeSlot];
  
        console.log(updatedSlots[selectedTeacher][day][timeSlot]); // Debugging output
  
        return updatedSlots; // Return the updated state
      });
    }
  };
  
  

  const handleSelectChange = (value) => {
    setSelectedTeacher(value);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <GeneralDropdown 
          lists = {teachersList}
          selectedItem={selectedTeacher}
          handleSelectChange={handleSelectChange}
          title="Teacher"
        />
      </div>
      <Container fluid>
        <Row>
          <div>
            <div className="scrollbar scrollbar-primary mx-auto">
              <table className="routine-table">
                <thead>
                  <tr>
                    <td className="routine-header-tr">Day</td>
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

export default PriorityRoutineTable;
