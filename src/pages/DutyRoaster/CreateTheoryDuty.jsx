import { useEffect, useRef, useState } from "react";
import Download from "../../assets/components/Download";
import { Link } from "react-router-dom";
import ManualExamControlTables from "../ser3/ManualExamControlTables";

const TheoryDuty = () => {
  const [theory, setTheory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaults, setDefaults] = useState(true);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [dutyData, setDutyData] = useState({
    examYear: "",
    semester: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const getObjectKeysAsArray = (obj) => {
    return Object.keys(obj).map((key) => key);
  };

  // useEffect(() => {
  //   const theoryData = JSON.parse(localStorage.getItem("theory"));
  //   const teacherCoursesData = JSON.parse(
  //     localStorage.getItem("teacherCourses")
  //   );
  //   setTheory(theoryData);
  //   setTeacherCourses(teacherCoursesData);
  // }, []);

  // useEffect(() => {
  //   const toModifiedTheory = () => {
  //     if (!(theory && theory.length > 0)) return;

  //     let theoryModified = [];
  //     let yt = [];
  //     let allCourseInfo = {};

  //     for (let year = 4; year > 0; year--) {
  //       for (let term = 2; term > 0; term--) {
  //         if (theory[year][term].length !== 0) {
  //           let modifiedCourses = theory[year][term].map((course) => {
  //             let teachers = course.slice(0, 3);
  //             return teachers;
  //           });

  //           theoryModified.push(modifiedCourses);
  //           yt.push([year, term]);

  //           // Create course-wise teachers array
  //           modifiedCourses.forEach((course) => {
  //             const courseName = `${course[0].course.code}: ${course[0].course.name}`;
  //             allCourseInfo[courseName] = course;
  //           });
  //         }
  //       }
  //     }

  //     setCourseTeachers(allCourseInfo);
  //     setCoursesName(getObjectKeysAsArray(allCourseInfo));
  //     setModifiedTheory(theoryModified);
  //     setYearTerms(yt);
  //   };

  //   toModifiedTheory();
  // }, [theory]);

  useEffect(() => {
    const toModifiedTheory = () => {
      if (!(theory && theory.length > 0)) return;
      var theoryModified = [],
        yt = [];
      for (let year = 4; year > 0; year--) {
        for (let term = 2; term > 0; term--) {
          if (theory[year][term].length !== 0) {
            theoryModified.push(theory[year][term]);
            yt.push([year, term]);
          }
        }
      }
      setModifiedTheory(theoryModified);
      setYearTerms(yt);
    };
    toModifiedTheory();
  }, [theory]);

  const pdfRef = useRef();

  const handleInputChange = (e) => {
    const { value, name, id } = e.target;
    const newData =
      e.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;
    setDutyData({
      ...dutyData,
      [name]: newData,
    });
    console.log("Duty");
    console.log(dutyData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(dutyData);

    try {
      const response = await fetch(
        `https://ice-web-nine.vercel.app/generateTheoryDutyRoaster`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dutyData),
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
        setDutyData(data);
        setTheory(data.theory);
        setErrorMessage("");
      } else {
        setErrorMessage(d.error);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    } finally {
      setLoading(false);
      setDefaults(false);
    }
  };

  useEffect(() => {
    console.log(dutyData);
  }, [dutyData]);

  useEffect(() => {
    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const name = `${teacher.firstName} ${teacher.lastName}`;
    console.log(name);
    setSenderName(name);
  }, []);

  let serviceId = null;
  const handleSubmitForApproval = async (event) => {
    try {
      // Display an alert to confirm before proceeding
      const shouldGenerate = window.confirm(
        "Are you sure you want to submit the routine?"
      );

      if (!shouldGenerate) {
        // If the user clicks "Cancel" in the alert, do nothing
        return;
      }

      setLoading(true);
      event.preventDefault();

      const response = await fetch(
        "https://ice-web-nine.vercel.app/generateTheoryDutyRoaster/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: dutyData,
          }),
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
        serviceId = data._id;
        setErrorMessage("");
        console.log(serviceId);
      } else {
        setErrorMessage(d.error);
      }
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    } finally {
      setLoading(false);
      setDefaults(false);
    }

    // to save it at pending service
    try {
      // Make a POST request to your endpoint
      const response = await fetch("https://ice-web-nine.vercel.app/pendingService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: serviceId,
          serviceName: "Theory Duty Roaster",
          senderName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      console.log("pending: ", d);
      if (!d.success) {
        setErrorMessage(d.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <h2 className="text-center"> Create Theory Exam Duty Roaster </h2>
        </div>
        <hr />
        <div className="mt-3 mb-3">
          <div>
            <form action="" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-auto">
                      <label htmlFor="examYear" className="form-label">
                        Exam Year
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        name="examYear"
                        className="form-control"
                        placeholder="e.g: 2023"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row mb-3">
                    <div className="col-auto">
                      <label htmlFor="semester">Semester</label>
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
              </div>
              <div className="text-center mt-3">
                <div className="row">
                  <div className="col-6">
                    <Link to="/alldocuments">
                      <button
                        className="btn btn-success bg-success bg-gradient w-75 h-100"
                        type="button"
                      >
                      All Documents
                      </button>
                    </Link>{" "}
                  </div>{" "}
                  <div className="col-6">
                    <button
                      className="btn btn-success bg-success bg-gradient w-75 h-100"
                      type="submit"
                    >
                      Submit to generate Duty Roaster
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {defaults ? (
        <div></div>
      ) : loading ? (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div ref={pdfRef}>
            <ManualExamControlTables
              modifiedTheoryProps={modifiedTheory}
              yearTermsProps={yearTerms}
              isExamCommittee={false}
              setDutyData={setDutyData}
            />
          </div>
          <div className="text-center d-flex justify-content-center mt-3">
            <button
              className="btn btn-primary bg-primary bg-gradient h-100"
              type="submit"
              onClick={handleSubmitForApproval}
            >
              Submit for Approval
            </button>
          </div>
          <div>
            <Download pdfRef={pdfRef} fileName={"Proposed-Routine.pdf"} />
          </div>
        </div>
      )}
    </>
  );
};

export default TheoryDuty;
