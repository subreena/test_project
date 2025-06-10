import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import GeneralDropdown from "../../assets/components/GeneralDropdown";

const UpdateSlotsPriority = ({ timeslots, timeslotsLength, teachers, serialWiseSlots, setSerialWiseSlots }) => {

  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const [teacherSlots, setTeacherSlots] = useState({});
  const [teachersList, setTeachersList] = useState([]);
  const [priorityCountMatrix, setPriorityCountMatrix] = useState(null);

  // useEffect(() => {
  //   console.log(teachers);
  // }, [teachers]);

  const updateTeacherSlots = (teachers) => {
    // Format the data
    const formattedSlots = {};

    // console.log(serialWiseSlots);

    teachers.forEach((teacher) => {
      formattedSlots[teacher.teacherCode] = Array(days.length).fill().map(() => Array(timeslotsLength).fill(0));
    });

    for(const teacherCode in serialWiseSlots) {
      serialWiseSlots[teacherCode].forEach(({day, timeslot}) => {
        // console.log(teacherCode, day, timeslot);

        formattedSlots[teacherCode][day][timeslot] = 1;
      });
    }

    // console.log(formattedSlots);

    // Update state
    setTeacherSlots(formattedSlots);
  }

  const fetchTeachers = async () => {
    updateTeacherSlots(teachers);

    const formattedTeachers = [];

    teachers.forEach((teacher) => {
      formattedTeachers.push({
        value: teacher.teacherCode,
        label: `${teacher.firstName} ${teacher.lastName}`
      })
    })

    setTeachersList(formattedTeachers);
  };

  const updatePriorityCountMatrix = () => {
    const countMatrix = Array(days.length).fill().map(() => Array(timeslotsLength).fill(0));
    
    for(const teacherCode in serialWiseSlots) {
      serialWiseSlots[teacherCode].forEach(({day, timeslot}) => {
        countMatrix[day][timeslot]++;
      });
    }

    setPriorityCountMatrix(countMatrix);
  }

  useEffect(() => {
    if (timeslotsLength > 0 && serialWiseSlots && teachers?.length > 0) {
      updatePriorityCountMatrix();
      fetchTeachers();
    }
  }, [timeslots, serialWiseSlots, teachers]);

  useEffect(() => {
    if(timeslotsLength && timeslotsLength > 0) toModifiedRoutine();
  }, [timeslots, selectedTeacher, teacherSlots]);

  const toModifiedRoutine = () => {
    // var onlyFirstTime = true;
    var routineModified = [];
    let onlyFirstTime = Array(timeslots?.length).fill(true);

    for (let day = 0; day < days.length; day++) {
      var row = [];
      row.push(
        <td>
          <p>
            <strong>{days[day]}</strong>
          </p>
        </td>
      );

      for (let timeSlot = 0; timeSlot < timeslotsLength; timeSlot++) {
        if (timeslots[timeSlot].isLunchHour && onlyFirstTime[timeSlot]) {
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
          onlyFirstTime[timeSlot] = false;
        }

        row.push(
          <td
            key={`block-${day}-${timeSlot}`}
            style={{ textAlign: "center" }}
          >
            <button
             onClick={() => handleToggle(day, timeSlot)}
             style={{ fontWeight: "bold" }}
             className={`btn text-white px-4 ${
              teacherSlots[selectedTeacher]?.[day]?.[timeSlot] ? "bg-green" : "bg-orange"
              }`}>
                {priorityCountMatrix?.[day]?.[timeSlot] ? priorityCountMatrix[day][timeSlot] : "0"}
            </button>
          </td>
        );
      }
      routineModified.push(row);
    }

    setModifiedRoutine(routineModified);
  };
  
  const teacherErrorMessage = "Please select a Teacher first!";

  const [teacherError, setTeacherError] = useState("");
  const handleToggle = (day, timeSlot) => {
    if(!selectedTeacher) {
      setTeacherError(teacherErrorMessage);
    }

    // console.log("day: ", day, "timeslot: ", timeSlot);

    if (selectedTeacher && day >= 0 && timeSlot >= 0) {
      setPriorityCountMatrix((prevMatrix) => {
        // Clone the previous state to avoid mutation
        const newMatrix = prevMatrix.map((row) => [...row]);
      
        if (teacherSlots[selectedTeacher][day][timeSlot]) {
          newMatrix[day][timeSlot]--;

          // to handle slots serial
          const updatedSlots = { ...serialWiseSlots };

          if (updatedSlots[selectedTeacher]) {
            updatedSlots[selectedTeacher] = updatedSlots[selectedTeacher].filter(
              (slot) => !(slot.day === day && slot.timeslot === timeSlot)
            );
          }

          setSerialWiseSlots(updatedSlots);
        } else {
          newMatrix[day][timeSlot]++;

          // to handle slots serial
          const updatedSlotsSerial = {...serialWiseSlots};

          if (!updatedSlotsSerial[selectedTeacher]) {
            updatedSlotsSerial[selectedTeacher] = [];
          }

          // Check if slot already exists
          const alreadyExists = updatedSlotsSerial[selectedTeacher].some(
            (slot) => slot.day === day && slot.timeslot === timeSlot
          );

          if (!alreadyExists) {
            updatedSlotsSerial[selectedTeacher].push({ day, timeslot: timeSlot });
            setSerialWiseSlots(updatedSlotsSerial);
          }
        }

        // console.log(newMatrix);
      
        return newMatrix; // Update the state properly
      });

      setTeacherSlots((prevSlots) => {
        // Deep clone the object to avoid mutability issues
        const updatedSlots = JSON.parse(JSON.stringify(prevSlots));
  
        // Ensure the nested structure exists
        if (!updatedSlots[selectedTeacher]) updatedSlots[selectedTeacher] = {};
        if (!updatedSlots[selectedTeacher][day]) updatedSlots[selectedTeacher][day] = {};
  
        // Toggle the value
        updatedSlots[selectedTeacher][day][timeSlot] = !updatedSlots[selectedTeacher][day][timeSlot];
  
        // console.log(updatedSlots[selectedTeacher][day][timeSlot]); // Debugging output
  
        return updatedSlots; // Return the updated state
      });
    }
  };
  

  const handleSelectChange = (value) => {
    setSelectedTeacher(value);
    if(value === "") {
      setTeacherError(teacherErrorMessage);
    }
    else {
      setTeacherError("");
    }
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
      {teacherError && <div className="alert alert-danger text-center mt-1 mb-2 mx-3">
        {teacherError}
      </div>}

      <Container fluid>
        <Row>
          <div>
            <div className="scrollbar scrollbar-primary mx-auto">
              <h6 className="text-primary text-center mt-4"> Select slots based on the teacher you selected first! </h6>
              <table className="routine-table">
                <thead>
                  <tr>
                    <td className="routine-header-tr">Day</td>
                    {
                      timeslots?.map((t, index) => (
                        <td key={index} className="routine-header-tr">{`${t.start}-${t.end}`}</td>
                      ))
                    }
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
  )
}

export default UpdateSlotsPriority;