import { useRef } from "react";
import { CourseDisUtils } from "./CourseDisUtils";
import Download from "../../assets/components/Download";
import Select from 'react-select';
const CourseDisContent = () => {
  const pdfRef = useRef();

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
                      {filterCourseData().map((course, index) => (
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
                              <div className="col-auto" style={{width: '50%'}}>
                                <Select
                                  name="teacherName1"
                                  options={[
                                    { value: '', label: 'No Teacher' }, // Include the "No Teacher" option
                                    ...teacher.map((t) => ({
                                      value: t.teacherCode,
                                      label: `${t.firstName} ${t.lastName}`
                                    }))
                                  ]}
                                  onChange={(selectedOption) =>
                                    handleTeacherDetailsChange(selectedOption, index, "teacher1")
                                  }
                                  defaultValue={ {value: '', label: 'No Teacher'} }
                                />
                              </div>
                              <div className="col-auto" style={{width: '50%'}}>
                                <Select
                                  name="teacher2"
                                  options={[
                                    { value: '', label: 'No Teacher' }, // Include the "No Teacher" option
                                    ...teacher.map((t) => ({
                                      value: t.teacherCode,
                                      label: `${t.firstName} ${t.lastName}`
                                    }))
                                  ]}
                                  onChange={(selectedOption) =>
                                    handleTeacherDetailsChange(selectedOption, index, "teacher2")
                                  }
                                  defaultValue={ {value: '', label: 'No Teacher'} }
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
