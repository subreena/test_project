import { useRef, useState } from "react";
import Download from "../../assets/components/Download";

const TheoryRoutine = () => {
  const pdfRef = useRef();
  const [tBatch, setTBatch] = useState(0);
  const [viewRoutine, setViewRoutine] = useState(false);
  const [routine, setRoutine] = useState({
    exmYear: "",
    tBatch: 0,
    gap: 0,
    semester: 0,
    routineDetails: [{ session: "", totalStudent: "", startDate: "" }],
  });

 const handleRoutineView = () => {
  setViewRoutine(!viewRoutine);
 }
  const handleRoutineArray = (e, i) => {
    const { value, name } = e.target;
    const routineArray = [...routine.routineDetails];
    routineArray[i] = {
      ...routineArray[i],
      [name]: value,
    };
    setRoutine({...routine, routineDetails: routineArray });
  };
  const handleInputChange = (e) => {
    const { value, name, id } = e.target;
    const newValue = e.target.type === "radio" ? (id === "odd" ? 1 : 2) : value;

    setRoutine({
      ...routine,
      [name]: newValue,
    });
  };

  const handlebatchRow = (e) => {
    setTBatch(parseInt(e.target.value));
    routine.tBatch = e.target.value;
  };

  const generateRow = () => {
    let row = [];
    for (let i = 1; i <= tBatch; i++) {
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
            <label htmlFor={`totalStudent`} className="form-label">
              Total Student
            </label>
            <input
              type="number"
              min="0"
             
              className="form-control"
              name={`totalStudent`}
              id={`totalStudent-${i}`}
              onChange={(e) => handleRoutineArray(e, i)}
              required
            />
          </td>
          <td>
            <label htmlFor={`start-date`} className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              name={`start-date`}
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRoutineView();
    console.log(routine);
  };

  return (
    <>
      <div className="container mb-5">
        <div>
          <h2 className="text-center fs-1">Theory Exam Routine</h2>
        </div>
        <hr />
        <div className="mt-3 ">
          <form action="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="col-auto">
                  <div className="mb-3">
                    <label htmlFor="exmYear" className="form-label">
                      Exam Year
                    </label>
                    <input
                      type="number"
                      name="exmYear"
                      min="2023"
                     
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
                    <label htmlFor="gap" className="form-label">
                      Gap for Exam
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="number"
                      min="0"
                      
                      className="form-control"
                      name="gap"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
                Submit to generate Routine
              </button>
            </div>
          </form>
          <div className={viewRoutine? 'w-75 d-block' : 'd-none'} style={{margin: '20px auto'}}>
          <div className="card" ref={pdfRef}>
            <div className="card-body">
              <p className="lead text-center">
              Theory Exam Routine
              </p>
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

export default TheoryRoutine;
