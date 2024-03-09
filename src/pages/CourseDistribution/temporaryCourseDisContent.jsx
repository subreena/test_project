import { useEffect, useRef, useState } from "react";
import { CourseDisUtils } from "./CourseDisUtils";
import Download from "../../assets/components/Download";
import Select from "react-select";
import { useParams } from "react-router-dom";
const CourseDisContent = () => {
  const pdfRef = useRef();
  let { id } = useParams();

  const { teacher, courseData, handleSubmit, handleTeacherDetailsChange } = CourseDisUtils();

  const [courseDistributionError, setCourseDistributionError] = useState("");

  const [formData, setFormData] = useState(null);
  useEffect(() => {
    fetch(
      `http://localhost:5000/courseDistribution/data/${id}/coursedistributions`
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
  }, []);

  const [teacherCodeToName, setTeacherCodeToName] = useState({});
  const [courseCodeToName, setCourseCodeToName] = useState({ "": "No Teacher" });

  useEffect(() => {
    const newTeacherCodeToName = {};
    teacher.forEach((t) => {
      newTeacherCodeToName[t.teacherCode] = `${t.firstName} ${t.lastName}`;
      console.log(t.teacherCode, newTeacherCodeToName[t.teacherCode]);
    });

    const newCourseCodeToName = { "": "No Teacher" };
    courseData.forEach((c) => {
      newCourseCodeToName[c.code] = c.name;
    //   console.log(c.code, newCourseCodeToName[c.code]);
    });

    setTeacherCodeToName(newTeacherCodeToName);
    setCourseCodeToName(newCourseCodeToName);
  }, [teacher, courseData]);

  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <form>
              {/* course Table */}
              <div className="mt-5 mb-5 scrollbar scrollbar-primary ">
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
                      {formData?.courseDetails.map((course, index) => (
                        <tr key={index}>
                          <td>
                            {/* // Use the correct index (courseIndex) for updating formData.courseDetails
                            {formData.courseDetails.map((c, formDataIndex) => {
                              if (formDataIndex === index) {
                                c.courseCode = course.code;
                              }
                              return null; // You need to return something in the map function
                            })} */}
                            {course.courseCode}
                          </td>

                          <td name="courseTitle">
                            {courseCodeToName[course?.courseCode]}
                          </td>
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
                                    value: course.teacherCode[0],
                                    label: course.teacherCode[0],
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
                                    value: course?.teacherCode[1],
                                    label:
                                      teacherCodeToName[course.teacherCode[1]],
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
