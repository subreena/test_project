import { useEffect, useRef, useState } from "react";
import Download from "../../assets/components/Download";
import { Table } from "react-bootstrap";

const LabRoutine = () => {
    const pdfRef = useRef();
    const [totalBatch, setTotalBatch] = useState(0);
    const [viewRoutine, setViewRoutine] = useState(false);
    const [routine, setRoutine] = useState({
      examYear: "",
      totalBatch: 0,
      gapBetweenExams: 0,
      semester: "",
      sessions: [
        { session: "", totalStudents: "", startDate: "", year: 0, term: 0 },
      ],
      unavailableDates: [],
      theoryExamRoutine: [{ courseCode: "", date: "" }],
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [inputDate, setInputDate] = useState(""); // State to store current input date
    const [dates, setDates] = useState([]); // State to store array of dates
    const [dateNone, setDateNone] = useState("None");
  

      // Function to handle input date change
  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };

  const handleDelete = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1); // Remove the date at the given index
    setDates(updatedDates);
    setRoutine({
      ...routine,
      ["unavailableDates"]: dates,
    });

    if (updatedDates.length === 0) {
      setDateNone("None");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleRoutineView = () => {
    setViewRoutine(!viewRoutine);
  };
  const handleRoutineArray = (e, i) => {
    const { value, name } = e.target;
    const routineArray = [...routine.sessions];
    routineArray[i] = {
      ...routineArray[i],
      [name]: value,
    };
    setRoutine({ ...routine, sessions: routineArray });
  };
  const handleInputChange = (e) => {
    const { value, name, id } = e.target;
    const newValue =
      e.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;

    console.log(newValue);

    setRoutine({
      ...routine,
      [name]: newValue,
    });
  };

  const handlebatchRow = (e) => {
    setTotalBatch(parseInt(e.target.value));
    routine.totalBatch = e.target.value;
  };

  const generateRow = () => {
    let row = [];
    for (let i = 0; i < totalBatch; i++) {
      row.push(
        <tr key={i}>
          <td>
            <label htmlFor={`session`} className="form-label">
              Session
            </label>
            <input
              type="text"
              name={`session`}
              id={`session-${i}`}
              className="form-control "
              required
              onChange={(e) => handleRoutineArray(e, i)}
            />
          </td>
          <td>
            <label htmlFor={`year`} className="form-label">
              Year
            </label>
            <input
              type="number"
              className="form-control"
              name={`year`}
              id={`year-${i}`}
              onChange={(e) => handleRoutineArray(e, i)}
              required
              min="1"
              max="4"
            />
          </td>
          <td>
            <label htmlFor={`term`} className="form-label">
              Term
            </label>
            <input
              type="number"
              className="form-control"
              name={`term`}
              id={`term-${i}`}
              onChange={(e) => handleRoutineArray(e, i)}
              required
              min="1"
              max="2"
            />
          </td>
          <td>
            <label htmlFor={`totalStudents`} className="form-label">
              Total Student
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              name={`totalStudents`}
              id={`totalStudent-${i}`}
              onChange={(e) => handleRoutineArray(e, i)}
              required
            />
          </td>
          <td>
            <label htmlFor={`startDate`} className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              name={`startDate`}
              id={`start-date-${i}`}
              onChange={(e) => handleRoutineArray(e, i)}
              required
            />
          </td>
        </tr>
      );
    }
    return row;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(routine);
    handleRoutineView();

    try {
      const response = await fetch(`https://ice-web-nine.vercel.app/theoryExamRoutine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routine),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log(data);

      if(data.success) {
        setRoutine(data);
        setErrorMessage("");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    }
  };

  const handleAddDate = (e) => {
    e.preventDefault();
    if (inputDate !== "") {
      setDates([...dates, inputDate]); // Adding new date to the dates array
      setInputDate(""); // Resetting input date
      setDateNone("");
    }
  };

  useEffect(() => {
    setRoutine({
      ...routine,
      ["unavailableDates"]: dates,
    });
    console.log(dates);
  }, [dates]);

    return (
        <>
         <div className="container mb-5">
        <div>
          <h2 className="text-center fs-1">Lab Exam Routine</h2>
        </div>
        <hr />
        <div className="mt-3 ">
          <form action="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="col-auto">
                  <div className="mb-3">
                    <label htmlFor="examYear" className="form-label">
                      Exam Year
                    </label>
                    <input
                      type="number"
                      name="examYear"
                      min="1900"
                      className="form-control w-75"
                      required
                      onChange={handleInputChange}
                    />
                  </div>

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
              </div>
              <div className="col-6">
                <div className="row mb-3">
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
                      onChange={handleInputChange}
                    />
                    <label className="btn btn-outline-primary" htmlFor="even">
                      Even
                    </label>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-auto">
                    <label htmlFor="gapBetweenExams" className="form-label">
                      Gap for Exam
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      name="gapBetweenExams"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="row mb-3">
                    <div className="col-auto">
                      <label htmlFor="date" className="form-label">
                        Unavailable Dates
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="date"
                        value={inputDate}
                        onChange={handleDateChange}
                        className="form-control"
                      />
                    </div>
                    <button
                      onClick={handleAddDate}
                      className="btn btn-outline-primary col-auto"
                    >
                      Add Date
                    </button>
                  </div>
                  <h6>Unavailable Dates Entered: {dateNone}</h6>
                  <ul>
                    {dates.map((date, index) => (
                      <li key={index}>
                        {formatDate(date)}{" "}
                        <button
                          className="btn btn-danger"
                          style={{ margin: "2px", padding: "3px 10px" }}
                          onClick={() => handleDelete(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <table className="mt-3 mb-3 table table-striped">
              <tbody>{generateRow()}</tbody>
            </table>
            <div className="text-center mt-3">
              <button
                className="btn btn-success bg-success bg-gradient w-50"
                type="submit"
              >
                Submit generate Routine
              </button>
            </div>
          </form>
          <div
            className={viewRoutine ? "w-75 d-block" : "d-none"}
            style={{ margin: "20px auto" }}
          >
            <div className="card" ref={pdfRef}>
              <div className="card-body">
                <p className="lead text-center">Theory Exam Routine</p>
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>#</th>
                      <th>Date</th>
                      <th>Course Code</th>
                    </tr>
                  </thead>
                 
                </Table>
              </div>
            </div>
            <div className="text-center mt-2 mb-2 d-flex justify-content-around">
              <button className="btn btn-secondary bg-secondary bg-gradient">
                Manual Edit
              </button>

              <button className="btn btn-primary bg-primary bg-gradient ">
                Submit for Approve
              </button>

              <button className="btn btn-danger bg-danger bg-gradient">
                Publish
              </button>
            </div>
            <Download pdfRef={pdfRef} fileName={"Theory-Exam-Routine.pdf"} />
          </div>
        </div>
      </div>
        </>
    );
};

export default LabRoutine;