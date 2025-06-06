import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import GeneralDropdown from "../../assets/components/GeneralDropdown";
import StaticBackdropModal from "../Modal/StaticBackdropModal";
import { useParams } from "react-router-dom";

const UpdateSlotsPriority = () => {
  const {year, semester} = useParams();

  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const [timeslots, setTimeslots] = useState([]);
  const [timeslotsLength, setTimeslotsLenth] = useState(0);
  const [teacherSlots, setTeacherSlots] = useState({});
  const [teachersList, setTeachersList] = useState([]);
  const [priorityCountMatrix, setPriorityCountMatrix] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log(year, semester);

    const fetchTimeslot = async () => {
      try {
        const response = await fetch("http://localhost:5000/timeSlot");
        if (!response.ok) {
          throw new Error("Failed to fetch timeslots");
        }
        const data = await response.json();
        // console.log(data.data[0].timeSlot);
        setTimeslots(data.data[0].timeSlot);

        let count = 0;
        for(const timeslot of data.data[0].timeSlot) {
          if(!timeslot.isLunchHour) count++;
        }
        setTimeslotsLenth(count);

        // console.log(count);
      } catch (error) {
        console.error("Error fetching timeslots:", error);
      }
    };

    fetchTimeslot();
  }, []);

  const [serialWiseSlots, setSerialWiseSlots] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:5000/teachers");
      const data = await response.json();

      if (data.success) {
        updateTeacherSlots(data.data);

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

  const updatePriorityCountMatrix = () => {
    const countMatrix = Array(days.length).fill().map(() => Array(timeslotsLength).fill(0));
    
    for(const teacherCode in serialWiseSlots) {
      serialWiseSlots[teacherCode].forEach(({day, timeslot}) => {
        countMatrix[day][timeslot]++;
      });
    }

    setPriorityCountMatrix(countMatrix);
  }

  const updateTeacherSlots = (teachers) => {
    // Format the data
    const formattedSlots = {};

    teachers.forEach((teacher) => {
      formattedSlots[teacher.teacherCode] = Array(days.length).fill().map(() => Array(timeslotsLength).fill(0));
    });

    for(const teacherCode in serialWiseSlots) {
      serialWiseSlots[teacherCode].forEach(({day, timeslot}) => {
        formattedSlots[teacherCode][day][timeslot] = 1;
      });
    }

    // console.log(formattedSlots);

    // Update state
    setTeacherSlots(formattedSlots);
  }

  useEffect(() => {
    if (timeslotsLength > 0 && serialWiseSlots) {
      updatePriorityCountMatrix();
      fetchTeachers();
    }
  }, [timeslots, serialWiseSlots]);

  useEffect(() => {
    if(timeslotsLength !== 0) toModifiedRoutine();
  }, [timeslots, selectedTeacher, teacherSlots]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("slotsPriority"));
    setSerialWiseSlots(data);
  }, []);

  const toModifiedRoutine = () => {
    // var onlyFirstTime = true;
    var routineModified = [];
    let onlyFirstTime = Array(timeslots.length).fill(true);

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

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleUpdateSlots = async (event) => {
    event.preventDefault();

    handleStaticModalShow();
  };

  const [readyToSave, setReadyToSave] = useState(false);
  const [staticShow, setStaticShow] = useState(false);

  const handleStaticModalClose = () => {
    setStaticShow(false);
    setReadyToSave(false);
  }
  const handleStaticModalShow = () => setStaticShow(true);
  const handleReadyToDelete = () => {
    setReadyToSave(true);
    setStaticShow(false);
  }

  useEffect(() => {
    const updateMethod = async() => {
      // to save it at pending service
      try {
        setIsLoading(true);

        const updatedData = {
          year: year, 
          semester: semester,
          yearSemester: year?.toString() + semester?.toString(),
          slots: serialWiseSlots
        };

        // Make a POST request to your endpoint
        const response = await fetch(`http://localhost:5000/priority/slots/update/${year}/${semester}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newData: updatedData
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const d = await response.json();
        // // console.log("response: ", d);
        if (!d.success) {
          setSubmitError(d.error);
          setSubmitSuccess("");
        } else {
          setSubmitError("");
          setSubmitSuccess("Data updated successfully!");
          localStorage.setItem("slotsPriority", JSON.stringify(d.data.slots));
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if(readyToSave) {
      updateMethod();
    }
  }, [readyToSave])

  return (
      <>
        <h1 className="text-center">Update Slots Priority</h1>
        <StaticBackdropModal
        show={staticShow}
        onHide={handleStaticModalClose}
        onAccept={handleReadyToDelete}
        title={`Update Slots Priority`}
        description={`Are you sure, you want to update this data set?`}
        buttonName={"Update"}
        buttonVariant={'primary'}
      />

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
                      timeslots.map((t, index) => (
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

      {submitError && 
            <div className="alert alert-danger text-center mx-2">
                {submitError}
            </div>
        }

        {submitSuccess && 
            <div className="alert alert-success text-center mx-2">
                {submitSuccess}
            </div>
        }

      <div className=" my-3 d-flex justify-content-center">
        <div>
          <div className="row">
              <div className="col-6">
                {
                  isLoading ? (
                    <Spinner animation="border" role="status" variant="success">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <button
                        className="btn btn-success"
                        style={{
                        padding: "7px",
                        width: "32vw",
                        marginLeft: "15px",
                        }}
                        onClick={handleUpdateSlots}
                    >
                        Update
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default UpdateSlotsPriority;