import { useRef, useState } from "react";
import { CourseDisUtils } from "./CourseDisUtils";
import Download from "../../assets/components/Download";
import Select from "react-select";
const CourseDisContent = () => {
  const pdfRef = useRef();
  const [totalBatch, setTotalBatch] = useState(0);

  const {
    teacher,
    view,
    formData,
    setFormData,
    handleInputChange,
    handleYearChange,
    filteredCourses,
    handleView2,
    handleSubmit,
    handleTeacherDetailsChange,
  } = CourseDisUtils();

  const handleSessionDetailsArray = (e, i) => {
    const { value, name } = e.target;
    const routineArray = [...formData.sessions];
    routineArray[i] = {
      ...routineArray[i],
      [name]: value,
    };
    setFormData({ ...formData, sessions: routineArray });
  };

  const handlebatchRow = (e) => {
    setTotalBatch(parseInt(e.target.value));
    formData.totalBatch = e.target.value;
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
              onChange={(e) => handleSessionDetailsArray(e, i)}
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
              onChange={(e) => handleSessionDetailsArray(e, i)}
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
              onChange={(e) => handleSessionDetailsArray(e, i)}
              required
              min="1"
              max="2"
            />
          </td>
          <td>
            <label htmlFor={`totalStudents`} className="form-label">
              Total Students
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              name={`totalStudents`}
              id={`totalStudent-${i}`}
              onChange={(e) => handleSessionDetailsArray(e, i)}
              required
            />
          </td>
          <td>
            <label htmlFor={`startDate`} className="form-label">
              Class Start Date
            </label>
            <input
              type="date"
              className="form-control"
              name={`startDate`}
              id={`start-date-${i}`}
              onChange={(e) => handleSessionDetailsArray(e, i)}
              required
            />
          </td>
        </tr>
      );
    }
    return row;
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="d-flex justify-content-around mt-3 mb-3">
                {/* exam year */}
                <div className="row">
                  <div className="col-auto ">
                    <label htmlFor="examYear" className="form-label">
                      Exam Year:{" "}
                    </label>
                  </div>
                  <div className="col-auto">
                    <input
                      type="number"
                      id="yearInput"
                      name="examYear"
                      onChange={handleYearChange}
                      placeholder="e.g., 2022"
                      min="1900"
                      max="2500"
                      className="form-control"
                    />
                    <p
                      className={
                        formData.examYear
                          ? "text-success text-sm"
                          : "text-danger text-sm"
                      }
                    >
                      Selected Year: {formData.examYear || "No year selected"}
                    </p>
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

                {/* semester selection */}
                <div className="row">
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
              </div>

              <table className="mt-3 mb-3 table table-striped">
                <tbody>{generateRow()}</tbody>
              </table>

              {/* course Table */}
              <div className="mt-5 mb-5 scrollbar scrollbar-primary ">
                <table className="table">
                  <thead>
                    <tr className="table-success">
                      <td className="table-success">
                        <button
                          className="btn btn-success w-100"
                          onClick={handleView2}
                          type="button"
                        >
                          Show Courses
                        </button>
                      </td>
                    </tr>
                  </thead>
                </table>
                <div className={view ? "d-block" : "d-none"} ref={pdfRef}>
                  <table className="table table-striped">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Title</th>
                        <th scope="col">Teacher Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course, index) => (
                        <tr key={index}>
                          <td>
                            {/* Use the correct index (courseIndex) for updating formData.courseDetails */}
                            {formData.courseDetails.map((c, formDataIndex) => {
                              if (formDataIndex === index) {
                                c.courseCode = course.code;
                              }
                              return null; // You need to return something in the map function
                            })}
                            {course.code}
                          </td>

                          <td name="courseTitle">{course.name}</td>
                          <td>
                            <div className="row">
                              <div
                                className="col-auto"
                                style={{ width: "50%" }}
                              >
                                <Select
                                  name="teacherName1"
                                  options={[
                                    { value: "", label: "No Teacher" }, // Include the "No Teacher" option
                                    ...teacher.map((t) => ({
                                      value: t.teacherCode,
                                      label: `${t.firstName} ${t.lastName}`,
                                    })),
                                  ]}
                                  onChange={(selectedOption) =>
                                    handleTeacherDetailsChange(
                                      selectedOption,
                                      index,
                                      "teacher1"
                                    )
                                  }
                                  defaultValue={{
                                    value: "",
                                    label: "No Teacher",
                                  }}
                                />
                              </div>
                              <div
                                className="col-auto"
                                style={{ width: "50%" }}
                              >
                                <Select
                                  name="teacher2"
                                  options={[
                                    { value: "", label: "No Teacher" }, // Include the "No Teacher" option
                                    ...teacher.map((t) => ({
                                      value: t.teacherCode,
                                      label: `${t.firstName} ${t.lastName}`,
                                    })),
                                  ]}
                                  onChange={(selectedOption) =>
                                    handleTeacherDetailsChange(
                                      selectedOption,
                                      index,
                                      "teacher2"
                                    )
                                  }
                                  defaultValue={{
                                    value: "",
                                    label: "No Teacher",
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="col-6">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                  >
                    Publish
                  </button>
                </div>
              </div>
              <div>
                <Download
                  pdfRef={pdfRef}
                  fileName={"Course-Distribution.pdf"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDisContent;
