import { CourseDisUtils } from './CourseDisUtils';
const CourseDisContent = () => {
    const {      
        teacher,
        view,
        formData,
        handleInputChange,
        handleYearChange,
        filterCourseData,
        handleView,
        handleSubmit,
      } = CourseDisUtils();
    return (
        <div>
       <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
                  max="2100"
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
                      onClick={handleView}
                    >
                      Show Courses
                    </button>
                  </td>
                </tr>
              </table>
              <div className={view ? "d-block" : "d-none"}>
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
                    <>
                      {filterCourseData().map((course) => (
                        <tr key={course.id}>
                          <td name="courseCode">{course.code}</td>
                          <td name="courseTitle">{course.name}</td>
                          <td name="credit">{course.credit}</td>
                          <td>
                            <select
                              name="courseType"
                              id="courseType"
                              className="form-select"
                              onChange={handleInputChange}
                            >
                              <option defaultValue={null}>
                                Shared/Full
                              </option>
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
                                  id="teacherName1"
                                  onChange={handleInputChange}
                                >
                                  <option defaultValue={null}>
                                    Select Teacher
                                  </option>
                                  {teacher.map((t, index) => (
                                    <option key={index} value={`${t.firstName} + ${t.lastName}`}>
                                      {t.firstName} {t.lastName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className={formData.courseType === "shared"? "col-auto d-block": "col-auto d-none"}>
                                <select
                                  name="teacherName2"
                                  className="form-select"
                                  id="teacherName2"
                                  onChange={handleInputChange}
                                >
                                  <option defaultValue={null}>
                                    Select Teacher
                                  </option>
                                  {teacher.map((t, index) => (
                                    <option key={index} >
                                      {t.firstName} {t.lastName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                           
                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
              </div>
            </div>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
        </div>
    );
};

export default CourseDisContent;