import "bootstrap/dist/css/bootstrap.css";
import "../../../assets/stylesheets/ser1-style.css";
import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import GeneralDropdown from "../../../assets/components/GeneralDropdown";
import StaticBackdropModal from "../../Modal/StaticBackdropModal";

const PriorityRoutineTable = () => {
  const [modifiedRoutine, setModifiedRoutine] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const [timeslots, setTimeslots] = useState([]);
  const [teacherSlots, setTeacherSlots] = useState({});
  const [teachersList, setTeachersList] = useState([]);
  const [priorityCountMatrix, setPriorityCountMatrix] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTimeslot = async () => {
      try {
        const response = await fetch("http://localhost:5000/timeSlot");
        if (!response.ok) {
          throw new Error("Failed to fetch timeslots");
        }
        const data = await response.json();
        console.log(data.data[0].timeSlot);
        setTimeslots(data.data[0].timeSlot);
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
        // Format the data
        const formattedSlots = {};

        data.data.forEach((teacher) => {
          formattedSlots[teacher.teacherCode] = Array(days.length).fill().map(() => Array(timeslots.length).fill(0));
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

  const createPriorityCountMatrix = async () => {
    const countMatrix = Array(days.length).fill().map(() => Array(timeslots.length-1).fill(0));
    setPriorityCountMatrix(countMatrix);
  }

  useEffect(() => {
    if (timeslots.length > 0) {
      createPriorityCountMatrix();
      fetchTeachers();
    }
  }, [timeslots]);

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

      for (let timeSlot = 0; timeSlot < timeslots.length-1; timeSlot++) {
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
  
        console.log(updatedSlots[selectedTeacher][day][timeSlot]); // Debugging output
  
        return updatedSlots; // Return the updated state
      });
    }
  };
  
  useEffect(() => {
    console.log(serialWiseSlots);
  }, [serialWiseSlots])
  

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
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);

  const handleSaveSlots = async (event) => {
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
    const saveMethod = async() => {
      // to save it at pending service
      try {
        setIsLoading(true);
        // Make a POST request to your endpoint
        const response = await fetch("http://localhost:5000/priority/slots", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year: year, 
            semester: semester,
            yearSemester: year?.toString() + semester?.toString(),
            slots: serialWiseSlots
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const d = await response.json();
        console.log("response: ", d);
        if (!d.success) {
          setSubmitError(d.error);
          setSubmitSuccess("");
        } else {
          setSubmitError("");
          setSubmitSuccess("Data saved successfully!")
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if(readyToSave) {
      saveMethod();
    }
  }, [readyToSave])

  const handleInputChange = (event) => {
    const {name, value, id} = event.target;

    console.log(name, value, id);

    const newValue =
    event.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;

    console.log(newValue);

    setSemester(newValue);
  }

  const handleYearChange = (event) => {
    const inputValue = event.target.value;

    if (!isNaN(inputValue) && inputValue >= 1000 && inputValue <= 9999) {
      setYear(inputValue);
    }
  };

  return (
    <>
      <hr />

      <div className="d-flex justify-content-center mt-2 mb-4">
        <form action="">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-5">
                {/* exam year */}
                <div className="row">
                  <div className="col-auto ">
                    <label htmlFor="year" className="form-label">
                      Exam Year:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="number"
                      id="yearInput"
                      name="year"
                      onChange={handleYearChange}
                      placeholder="e.g., 2022"
                      min="2004"
                      required
                      max="9999"
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
              <div className="col-5">
                {/* semester selection */}
                <div className="row d-flex justify-content-end">
                  <div className="col-auto">
                    <label htmlFor="semester">Semester Selection: </label>
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

      <StaticBackdropModal
        show={staticShow}
        onHide={handleStaticModalClose}
        onAccept={handleReadyToDelete}
        title={`Save Slots Priority`}
        description={`Are you sure, you want to save this data set?`}
        buttonName={"Save"}
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
                        onClick={handleSaveSlots}
                    >
                        Save
                    </button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default PriorityRoutineTable;
