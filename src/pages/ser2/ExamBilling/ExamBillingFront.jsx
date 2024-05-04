import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExamBillingFront = () => {
    const nextPage = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    examYear: 2021,
    totalBatch: 0,
    TheoryBillDetails: [
      {
        courseCode: "",
        courseTitle: "",
        session: "",
        exmHour: 0,
        totalStudents: 0,
        CT: 0,
        studentCT: 0,
        totalCT: 0,
        qSetter: null,
      },
    ],
    labBillDetails: [{ courseCode: "", session: "", labDuty: null }],
  });

  const handleAddTheoryRow = () => {
    // Create a new row object with default values
    const newRow = {
      courseCode: "",
      courseTitle: "",
      session: "",
      exmHour: 0,
      totalStudents: 0,
      CT: 0,
      studentCT: 0,
      totalCT: 0,
      qSetter: null,
    };

    // Update the state to include the new row
    setFormData((prevState) => ({
      ...prevState,
      TheoryBillDetails: [...prevState.TheoryBillDetails, newRow],
    }));
  };

  const handleAddLabRow = () => {
    const newLab = {
      courseCode: "",
      courseTitle: "",
      session: "",
      labDuty: null,
    };
    setFormData((prevState) => ({
      ...prevState, 
      labBillDetails: [...prevState.labBillDetails, newLab],
    }));
  };
  

  const handleInputChange = (e, rowIndex) => {
    const { value, name } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      TheoryBillDetails: prevState.TheoryBillDetails.map((item, index) => {
        if (index === rowIndex) {
          return {
            ...item,
            [name]: value === "true" ? true : value === "false" ? false : null,
          };
        } 
        return item;
      }),
      labBillDetails: prevState.labBillDetails.map((item, index) => {
        if (index === rowIndex) {
          return {
            ...item,
            [name]: value === "true" ? true : value === "false" ? false : null,
          };
        }
        return item;
      }), // Closing bracket was missing here
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    nextPage('/exambilling', {formData});
  };

  return (
    <div className="container">
      <div className="card p-1">
        <h2 className="text-center mt-4">Exam Bill Prepare</h2>
        <hr />
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="name" className="form-label">
                      Teacher name
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="examYear" className="form-label">
                      Exam Year
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="number"
                      name="exammYear"
                      id="examYear"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <table className="table table-stripped mt-4 no-wrap text-small ">
              <caption>Theory Bill Details</caption>
              {/* Table header */}
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Session</th>
                  <th>Exam Hour</th>
                  <th>Total Students</th>
                  <th>Class Test</th>
                  <th>No. of Students Attending Class Test</th>
                  <th>Total Class Test</th>
                  <th>Question Setter</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody>
                {formData.TheoryBillDetails.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="courseCode"
                        value={row.courseCode}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="courseTitle"
                        value={row.courseTitle}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="session"
                        value={row.session}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="exmHour"
                        value={row.exmHour}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="totalStudents"
                        value={row.totalStudents}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="CT"
                        value={row.CT}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="studentCT"
                        value={row.studentCT}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="totalCT"
                        value={row.totalCT}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        name="qSetter"
                        value={
                          row.qSetter === true
                            ? "true"
                            : row.qSetter === false
                            ? "false"
                            : ""
                        }
                        onChange={(e) => handleInputChange(e, index)}
                      >
                        <option value="">Yes/No</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add New button */}
            <div className="text-center mt-3">
              <button
                className="btn btn-success bg-success bg-gradient w-50"
                type="button"
                onClick={handleAddTheoryRow}
              >
                Add New
              </button>
            </div>

            <table className="table table-stripped mt-4 no-wrap text-small">
              <caption>Lab Bill Details</caption>
              {/* Table header */}
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Session</th>
                  <th>Lab Duty</th>
                </tr>
              </thead>
              <tbody>
                {formData.labBillDetails.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="courseCode"
                        value={row.courseCode}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="courseTitle"
                        value={row.courseTitle}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="session"
                        value={row.session}
                        className="form-control"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>

                    <td>
                      <select
                        className="form-select"
                        name="labDuty"
                        value={
                          row.labDuty === true
                            ? "true"
                            : row.labDuty === false
                            ? "false"
                            : ""
                        }
                        onChange={(e) => handleInputChange(e, index)}
                      >
                        <option value="">Yes/No</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Add New button */}
            <div className="text-center mt-3">
              <button
                className="btn btn-success bg-success bg-gradient w-50"
                type="button"
                onClick={handleAddLabRow}
              >
                Add New
              </button>
            </div>

            {/* Submit button */}
            <div className="text-center mt-3">
              <button
                className="btn btn-success bg-success bg-gradient w-50"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExamBillingFront;
