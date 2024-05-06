import { useEffect, useRef, useState } from "react";
import { CourseDisUtils } from "./CourseDisUtils";
import Download from "../../assets/components/Download";
import Select from "react-select";
import { useParams } from "react-router-dom";
const CourseDisContent = () => {
  const pdfRef = useRef();
  let { id, state } = useParams();

  let uri = `https://ice-web-nine.vercel.app/courseDistribution/data/${id}/coursedistributions`;
  if(state === 'permanent') uri = `https://ice-web-nine.vercel.app/CourseDistributionManagement/data/${id}`;

  const { teacher, courseData } = CourseDisUtils();

  const [courseDistributionError, setCourseDistributionError] = useState("");
  const [teacherCodeToName, setTeacherCodeToName] = useState({});
  const [courseCodeToName, setCourseCodeToName] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [defaults, setDefaults] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleView2 = (event) => {
    event.preventDefault();
    setFormData({...formData, courseDetails: filterCourseData()});
  };

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const filterCourseData = () => {
    // console.log(formData);
    let filteredCourses = [];
    if(formData.sessions) {
      courseData.forEach(course => {
        // if (course.type === "theory") {
          formData.sessions.forEach(session => {
            if (course.year == session.year && course.term == session.term) {
              // Push only if the course is not already in filteredCourses
              if (!filteredCourses.some(filteredCourse => filteredCourse === course)) {
                filteredCourses.push(course);
              }
            }
          });
        // }
      });

      // mapping course code
      let courseCodeToTeacherCode = {};
      if(formData.courseDetails) {
        formData.courseDetails.forEach(course => {
          courseCodeToTeacherCode[course.courseCode] = course.teacherCode;
        })
      }

      console.log(courseCodeToTeacherCode);

      // Create new courseDetails objects for each filtered course
      const newCourseDetailsArray = filteredCourses.map((course) => ({
        courseCode: course.code,
        teacherCode: courseCodeToTeacherCode?.[course.code] || ['', '']
      }));

      console.log(newCourseDetailsArray);

      return newCourseDetailsArray;
    } else {
      return courseData;
    }
  };

  const handleUpdate = async (event) => {
    try {
      // Display an alert to confirm before proceeding
      const shouldGenerate = window.confirm(
        "Are you sure you want to update the course distribution?"
      );

      if (!shouldGenerate) {
        // If the user clicks "Cancel" in the alert, do nothing
        return;
      }

      setLoading(true);
      event.preventDefault();
      console.log(formData);

      const response = await fetch(
        `https://ice-web-nine.vercel.app/courseDistribution/update/${id}/coursedistributions`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      console.log(d);
      if (d.success) {
        const data = d.data;
        console.log(data);
        setCourseDistributionError("");
      } else {
        setCourseDistributionError(d.error);
      }
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    } finally {
      setLoading(false);
      setDefaults(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const newTeacherCodeToName = { "": "No Teacher" };
    teacher.forEach((t) => {
      newTeacherCodeToName[t.teacherCode] = `${t.firstName} ${t.lastName}`;
      // console.log(t.teacherCode, newTeacherCodeToName[t.teacherCode]);
    });

    const newCourseCodeToName = {};
    courseData.forEach((c) => {
      newCourseCodeToName[c.code] = c.name;
      //   console.log(c.code, newCourseCodeToName[c.code]);
    });

    setTeacherCodeToName(newTeacherCodeToName);
    setCourseCodeToName(newCourseCodeToName);
    setIsLoading(false);
  }, [teacher, courseData]);

  useEffect(() => {
    fetch(
      uri
    )
      .then((response) => response.json())
      .then((d) => {
        console.log(d);
        if (d.success) {
          const data = d.data;
          console.log(data);
          setFormData(data);
          setCourseDistributionError("");
        } else {
          setCourseDistributionError(d.error);
        }
      })
      .catch((error) => console.error(error));
  }, [isLoading]);

  const handleTeacherDetailsChange = (event, index, teacherNumber) => {
    console.log(formData?.courseDetails);
    console.log(index);
    const { value } = event;
    const updatedCourseDetails = [...formData.courseDetails];
    // Ensure teacherCode is initialized as an array
    if (!updatedCourseDetails[index].teacherCode) {
      updatedCourseDetails[index].teacherCode = ["", ""];
    }
    // Map 'teacher1' to index 0, 'teacher2' to index 1
    const arrayIndex = teacherNumber === "teacher1" ? 0 : 1;
    updatedCourseDetails[index].teacherCode[arrayIndex] = value;
    setFormData({
      ...formData,
      courseDetails: updatedCourseDetails,
    });
  };

  const handleInputChange = (event, index) => {
    const { name, value, id } = event.target;

    const newValue =
      event.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;

    const updatedCourseDetails = [...formData.courseDetails];
    updatedCourseDetails[index] = {
      ...updatedCourseDetails[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      courseDetails: updatedCourseDetails,
      [name]: newValue,
    });
  };

  const handleYearChange = (event) => {
    const inputValue = event.target.value;
    const parsedYear = parseInt(inputValue, 10);
    if (!isNaN(parsedYear) && parsedYear >= 2004 && parsedYear <= 2100) {
      setFormData({
        ...formData,
        examYear: parsedYear,
      });
    } else {
      // Handle invalid input (optional)
      setFormData({
        ...formData,
        examYear: "",
      });
    }
  };

  const handlebatchRow = (e) => {
    setFormData({ ...formData, totalBatch: e.target.value});
    // formData.totalBatch = e.target.value;
  };

  const handleSessionDetailsArray = (e, i) => {
    const { value, name } = e.target;
    const routineArray = [...formData.sessions];
    routineArray[i] = {
      ...routineArray[i],
      [name]: value,
    };
    setFormData({ ...formData, sessions: routineArray });
  };

  const [rows, setRows] = useState(null);
  useEffect(() => {
    const generateRow = () => {
      let row = [];

      for (let i = 0; i < parseInt(formData?.totalBatch, 10); i++) {
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
                defaultValue={formData?.sessions[i]?.session}
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
                defaultValue={formData?.sessions[i]?.year}
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
                defaultValue={formData?.sessions[i]?.term}
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
                defaultValue={formData?.sessions[i]?.totalStudents}
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
                defaultValue={
                  formData?.sessions[i]?.startDate
                    ? formData?.sessions[i]?.startDate.slice(0, 10)
                    : ""
                }
              />
            </td>
          </tr>
        );
      }
      setRows(row);
    };

    generateRow();
  }, [formData]);

  return (
    <div>
      <div>
        <h2 className="fs-2 text-center mb-3">Course Distribution</h2>
      </div>
      <hr />
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
                      defaultValue={formData?.examYear}
                    />
                    <p
                      className={
                        formData?.examYear
                          ? "text-success text-sm"
                          : "text-danger text-sm"
                      }
                    >
                      Selected Year: {formData?.examYear || "No year selected"}
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
                      defaultValue={formData?.totalBatch}
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
                      checked={formData?.semester === "1"}
                    />
                    <label
                      className={`btn btn-outline-primary ${
                        formData?.semester === "1" ? "active" : ""
                      }`}
                      htmlFor="odd"
                    >
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
                      checked={formData?.semester === "2"}
                    />
                    <label
                      className={`btn btn-outline-primary ${
                        formData?.semester === "2" ? "active" : ""
                      }`}
                      htmlFor="even"
                    >
                      Even
                    </label>
                  </div>
                </div>
              </div>

              <table className="mt-3 mb-3 table table-striped">
                <tbody>{rows}</tbody>
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
                <div ref={pdfRef}>
                  <table className="table table-striped">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">Course Code</th>
                        <th scope="col">Course Title</th>
                        <th scope="col">Teacher Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData?.courseDetails?.map((course, index) => (
                        <tr key={index}>
                          <td>
                            {/* // Use the correct index (courseIndex) for updating formData?.courseDetails
                            {formData?.courseDetails.map((c, formDataIndex) => {
                              if (formDataIndex === index) {
                                c.courseCode = course.code;
                              }
                              return null; // You need to return something in the map function
                            })} */}
                            {course.courseCode}
                          </td>

                          <td name="courseTitle">
                            {courseCodeToName[course.courseCode]}
                          </td>
                          <td>
                            <div className="row">
                              <div
                                className="col-auto"
                                style={{ width: "50%" }}
                              >
                                {!isLoading && (
                                  <Select
                                    key={
                                      teacherCodeToName &&
                                      course?.teacherCode &&
                                      teacherCodeToName[course.teacherCode[0]]
                                        ? teacherCodeToName[
                                            course.teacherCode[0]
                                          ]
                                        : "default-key"
                                    }
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
                                    defaultValue={
                                      teacherCodeToName &&
                                      course?.teacherCode &&
                                      teacherCodeToName[course.teacherCode[0]]
                                        ? {
                                            value: course?.teacherCode[0],
                                            label: teacherCodeToName[course?.teacherCode[0]] || "Loading...",
                                          }
                                        : {
                                          value: "",
                                          label: "No Teacher"
                                        }
                                    }
                                  />
                                )}
                              </div>
                              <div
                                className="col-auto"
                                style={{ width: "50%" }}
                              >
                                {!isLoading && (
                                  <Select
                                    key={
                                      teacherCodeToName &&
                                      course?.teacherCode &&
                                      teacherCodeToName[course?.teacherCode[0]]
                                        ? teacherCodeToName[
                                            course?.teacherCode[0]
                                          ]
                                        : "default-key"
                                    }
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
                                    defaultValue={
                                      teacherCodeToName &&
                                      course?.teacherCode &&
                                      teacherCodeToName[course.teacherCode[1]]
                                        ? {
                                            value: course.teacherCode[1],
                                            label:
                                              teacherCodeToName[
                                                course.teacherCode[1]
                                              ] || "Loading...",
                                          }
                                        : {
                                          value: "",
                                          label: "No Teacher"
                                        }
                                    }
                                  />
                                )}
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
                    onClick={handleUpdate}
                  >
                    Update
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
