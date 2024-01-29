import { useRef, useState } from "react";
import { CourseDisUtils } from "./CourseDisUtils";
import Download from "../../assets/components/Download";
const CourseDisContent = () => {
  const pdfRef = useRef();
  const [sel, setSel] = useState({
    type: "",
    index: 0,
  });

  const handleSel = (e) => {
    setSel({
      ...sel,
      type: e.target.value,
      index: e.target.index,
    });
  };
  const {
    teacher,
    view,
    formData,
    handleInputChange,
    handleYearChange,
    filterCourseData,
    handleView2,
    handleSubmit,
    handleTeacherDetailsChange,
  } = CourseDisUtils();

  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <form>
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
              </div>
              <br />
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

              {/* course Table */}
              <div className="mt-5 mb-5">
                <table className="table">
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
                </table>
                <div className={view ? "d-block" : "d-none"} ref={pdfRef}>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Title</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Course Type</th>
                        <th scope="col">Teacher Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterCourseData().map((course, index) => (
                        <tr key={course.id}>
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
                          <td name="credit">{course.credit}</td>

                          <td>
                            <select
                              name="courseType"
                              id={index}
                              className="form-select"
                              onChange={(e) => {
                                handleSel(e);
                              }}
                            >
                              <option defaultValue={null}>Shared/Full</option>
                              <option value="full">Full</option>
                              <option value="shared">Shared</option>
                            </select>
                          </td>
                          <td>
                            <div className="row">
                              <div className="col-auto">
                                <select
                                  name="teacherName1"
                                  className="form-select"
                                  id={index}
                                  onChange={(e) =>
                                    handleTeacherDetailsChange(
                                      e,
                                      index,
                                      "teacher1"
                                    )
                                  }
                                >
                                  <option defaultValue={null}>
                                    Select Teacher
                                  </option>
                                  {teacher.map((t, index) => (
                                    <option key={index} value={t.teacherCode}>
                                      {t.firstName} {t.lastName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div
                                className={
                                  sel.type === "shared"
                                    ? "col-auto d-block"
                                    : "col-auto d-none"
                                }
                              >
                                <select
                                  name="teacher2"
                                  className="form-select"
                                  id={index}
                                  onChange={(e) =>
                                    handleTeacherDetailsChange(
                                      e,
                                      index,
                                      "teacher2"
                                    )
                                  }
                                >
                                  <option defaultValue={null}>
                                    Select Teacher
                                  </option>
                                  {teacher.map((t, index) => (
                                    <option key={index} value={t.teacherCode}>
                                      {t.firstName} {t.lastName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Publish
                </button>
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
