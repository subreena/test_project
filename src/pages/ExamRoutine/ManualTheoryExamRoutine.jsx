const ManualTheoryExamRoutine = (props) => {
  const { routine, setRoutine } = props;

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
              value={routine?.sessions[i].session}
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
              value={routine?.sessions[i].year}
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
              value={routine?.sessions[i].term}
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
              value={routine?.sessions[i].totalStudents}
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
              value={routine?.sessions[i].startDate.slice(0, 10)}
              required
            />
          </td>
        </tr>
      );
    }
    return row;
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

    routine.sessions = routineArray;
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

    console.log(parseInt(e.target.value));
    routine.totalBatch = parseInt(e.target.value);
  };

  return (
    <>
      <form action="">
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
                  Total Batch &nbsp;&nbsp;
                </label>
                <input
                  type="number"
                  name="totalBatch"
                  min="0"
                  className="form-control w-75"
                  onChange={handlebatchRow}
                  value={routine?.totalBatch}
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
                  Min gap for Exam
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
              <h6>Unavailable Dates Entered(dd/mm/yyyy): {dateNone}</h6>
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
      </form>
    </>
  );
};

export default ManualTheoryExamRoutine;
