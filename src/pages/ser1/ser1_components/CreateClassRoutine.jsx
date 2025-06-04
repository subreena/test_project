import { useEffect, useState } from "react";
import ManualRoutineTable from "./ManualRoutineTable";
import Download from "../../../assets/components/Download";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoaderStatus from "./LoaderStatus";

const CreateClassRoutine = () => {
    const [formData, setFormData] = useState({
        year: null,
        semester: null,
        courseDetails: null,
        slots: null,
        mode: "priority",
        timeslot: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [routine, setRoutine] = useState([]);
    const [yearTerms, setYearTerms] = useState([]);
    const [defaults, setDefaults] = useState(true);
    const [dataSetFound, setDataSetFound] = useState(false);

    const [senderName, setSenderName] = useState("");
    const [routineData, setRoutineData] = useState(null);
    const [teacherCodeToObj, setTeacherCodeToObj] = useState({});
    const [courseCodeToObj, setCourseCodeToObj] = useState({});
    const [courseData, setCourseData] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [isSearch, setIsSearch] = useState(true);
    const [selectedMode, setSelectedMode] = useState("priority");

    const handleInputChange = (event) => {
        const {name, value, id} = event.target;

        console.log(name, value, id);

        const newValue =
        event.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;

        console.log(newValue);

        setFormData({
        ...formData,
        [name]: newValue,
        });
    }

    let serviceId = null;
    const handleSubmitForApproval = async (event) => {
      event.preventDefault();
      console.log(formData);

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
  
        console.log(formData);
  
        const response = await fetch(
          "http://localhost:5000/generateRandomRoutine/data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: routineData,
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
          console.log(data);
          setError("");
          console.log(serviceId);
        } else {
          setError(d.error);
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
        const response = await fetch("http://localhost:5000/pendingService", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: serviceId,
            serviceName: "Theory Class Routine",
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
          setError(d.error);
        } else {
          setError("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    const handleYearChange = (event) => {
      const inputValue = event.target.value;
  
      if (!isNaN(inputValue) && inputValue >= 1000 && inputValue <= 9999) {
        console.log(inputValue);
        setFormData({
          ...formData,
          year: inputValue,
        });
      } else {
        // Handle invalid input (optional)
        setFormData({
          ...formData,
          year: "",
        });
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/courseDetails");
          const data = await response.json();
          if (data.success) {
            setCourseData(data.data);
            setError("");
          } else setError(data.error);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/teachers");
          const data = await response.json();
          if (data.success) {
            setTeacher(data.data);
            setError("");
          } else setError(data.error);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      setLoading(true);
      const newTeacherCodeToObj = {};
      if (teacher) {
        teacher.forEach((t) => {
          newTeacherCodeToObj[t.teacherCode] = t;
          // console.log(t.teacherCode, newTeacherCodeToObj[t.teacherCode]);
        });
      }
  
      setTeacherCodeToObj(newTeacherCodeToObj);
      setLoading(false);
    }, [teacher]);
  
    useEffect(() => {
      setLoading(true);
  
      const newCourseCodeToObj = {};
      if (courseData) {
        courseData.forEach((c) => {
          newCourseCodeToObj[c.code] = c;
          //   console.log(c.code, newCourseCodeToObj[c.code]);
        });
      }
      setCourseCodeToObj(newCourseCodeToObj);
      setLoading(false);
    }, [courseData]);
  
    const generateRoutine = async (e) => {
      try {
        // Display an alert to confirm before proceeding
        const shouldGenerate = window.confirm(
          "Are you sure you want to generate a random routine?"
        );
  
        if (!shouldGenerate) {
          // If the user clicks "Cancel" in the alert, do nothing
          return;
        }
  
        setLoading(true);
        e.preventDefault();
  
        console.log(formData);
  
        const response = await fetch(
          "http://localhost:5000/generateRandomRoutine",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              year: formData.year,
              semester: formData.semester,
              classStartDate: formData.startDate,
              routineDetails: formData.routineDetails,
            }),
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
  
        const d = await response.json();
        if (d.success) {
          const data = d.data;
          console.log(data);
          setRoutineData(data);
          setRoutine(data.overall);
          setYearTerms(data.yearTerm);
          setError("");
        } else {
          setError(d.error);
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
      const teacher = JSON.parse(localStorage.getItem("teacher"));
      const name = `${teacher.firstName} ${teacher.lastName}`;
      console.log(name);
      setSenderName(name);
    }, []);

    const [courseDistribution, setCourseDistribution] = useState(null);
    const [slotsPriority, setSlotsPriority] = useState(null);
    const [teacherPriority, setTeacherPriority] = useState(null);

    const LOADING = 1, SUCCESS = 2, ERROR = 3;
    const [courseDistributionLoader, setCourseDistributionLoader] = useState(0);
    const [slotsPriorityLoader, setSlotsPriorityLoader] = useState(0);
    const [teacherPriorityLoader, setTeacherPriorityLoader] = useState(0);
    const handleSearch = () => {
      console.log(formData);

      const fetchCourseDistribuition = () => {
        setCourseDistributionLoader(LOADING);
        fetch(
          `http://localhost:5000/CourseDistributionManagement/data/${formData.year}/${formData.semester}`
        )
          .then((response) => response.json())
          .then((d) => {
            console.log(d);
            if (d.success) {
              const data = d.data;
              console.log(data);
              const lastIndex = data.length - 1;
              setCourseDistribution(data[lastIndex]);
              setCourseDistributionLoader(SUCCESS);
            } else {
              setCourseDistributionLoader(ERROR);
            }
          })
          .catch((error) => console.error(error));
        }

      const fetchPrioritySlots = () => {
        setSlotsPriorityLoader(LOADING);
        fetch(
          `http://localhost:5000/priority/slots/data/${formData.year}/${formData.semester}`
        )
          .then((response) => response.json())
          .then((d) => {
            console.log(d);
            if (d.success) {
              const data = d.data;
              console.log(data);
              const lastIndex = data.length - 1;
              setSlotsPriority(data[lastIndex]);
              setSlotsPriorityLoader(SUCCESS);
            } else {
              setSlotsPriorityLoader(ERROR);
            }
          })
          .catch((error) => console.error(error));
        }

      const fetchTeacherPriority = () => {
        setTeacherPriorityLoader(LOADING);
        fetch(
          `http://localhost:5000/priority/teacher/data/${formData.year}/${formData.semester}`
        )
          .then((response) => response.json())
          .then((d) => {
            console.log(d);
            if (d.success) {
              const data = d.data;
              console.log(data);
              const lastIndex = data.length - 1;
              setTeacherPriority(data[lastIndex]);
              setTeacherPriorityLoader(SUCCESS);
            } else {
              setTeacherPriorityLoader(ERROR);
            }
          })
          .catch((error) => console.error(error));
        }

      if(!formData.year) {
        setError('Exam year field is empty!');
        return;
      } else if(formData.year.length !== 4) {
        setError("Exam year field must be exactly 4 digits long!");
        return;
      } else if(!formData.semester) {
        setError("Semester is not selected yet!");
        return;
      }

      if(selectedMode === 'priority') {
        fetchCourseDistribuition();
        fetchTeacherPriority();
        fetchPrioritySlots();
      } else if(selectedMode === 'random') {
        fetchCourseDistribuition();
      } else {
        // for manual edit
      }
    }

    const handleChange = (event) => {
      setSelectedMode(event.target.value);
      console.log('Selected:', event.target.value);
    };
    

  return (
    <>
      <div className="row">
        <div
          className="col-10 mb-2"
          style={{ borderRight: "3px solid #ccc", height: "500px" }}
        >
          <h3 className="text-center">Create Class Routine</h3>
          <hr />

          <div className="d-flex justify-content-center">
            <form action="">
              <div className="container">
                <div className="row d-flex justify-content-between">
                  <div className="col-5">
                    {/* exam year */}
                    <div className="row">
                      <div className="col-auto ">
                        <label htmlFor="year" className="form-label">
                          Exam Year:{" "}
                        </label>
                      </div>
                      <div className="col-auto">
                        <input
                          type="number"
                          id="yearInput"
                          name="year"
                          onChange={handleYearChange}
                          placeholder="e.g., 2022"
                          min="2004"
                          required
                          max="9999"
                          className="form-control"
                        />
                        <p
                          className={
                            formData.year
                              ? "text-success text-sm"
                              : "text-danger text-sm"
                          }
                        >
                          Selected Year: {formData.year || "No year selected"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    {/* semester selection */}
                    <div className="row d-flex justify-content-end">
                      <div className="col-auto">
                        <label htmlFor="semester">Semester Selection: </label>
                      </div>
                      <div className="col-auto">
                        <input
                          type="radio"
                          className="btn-check"
                          id="odd"
                          name="semester"
                          autoComplete="off"
                          required
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
                          required
                          onChange={handleInputChange}
                        />
                        <label className="btn btn-outline-primary" htmlFor="even">
                          Even
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-between">
                  <div className="col-5">
                    <div className="mb-3">
                      <label htmlFor="dropdownSelect" className="form-label">Select a Mode:</label>
                      <select 
                        id="dropdownSelect"
                        className="form-select"
                        value={selectedMode}
                        onChange={handleChange}
                      >
                        <option selected value="priority">Priority Based</option>
                        <option value="random">Random</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-5 d-flex justify-content-end">
                  {
                    isSearch && <div className="my-3 d-flex justify-content-end">
                      <div>
                        <div className="d-flex justify-content-end">
                          <Button className="exclusive-button" onClick={handleSearch}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-search"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                            Search
                          </Button>
                        </div>

                        { error !== '' && <div className="mt-3 alert alert-danger"> {error} </div>}
                      </div>
                    </div>
                  }
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          <LoaderStatus
            status={courseDistributionLoader}
            formData={formData}
            loadingMessage={`Searching Course Distribution of year: ${formData?.year} and semester: ${formData?.semester}`}
            successMessage="Course Distribution is found!"
            errorMessage="Course Distribution is not found!"
            successLink={{
              href: `/course-distribution/permanent/${courseDistribution?._id}`,
              label: "Show"
            }}
            errorLink={{
              href: "/coursedistribution",
              label: "Create"
            }}
          />

          <LoaderStatus
            status={slotsPriorityLoader}
            formData={formData}
            loadingMessage={`Searching Slots Priority of year: ${formData?.year} and semester: ${formData?.semester}`}
            successMessage="Slot Priority list is found!"
            errorMessage="Slots priority list not found!"
            successLink={null}
            errorLink={{
              href: "/slotsPriority",
              label: "Create"
            }}
          />

          <LoaderStatus
            status={teacherPriorityLoader}
            formData={formData}
            loadingMessage={`Searching Teacher Priority of year: ${formData?.year} and semester: ${formData?.semester}`}
            successMessage="Teacher priority list loaded!"
            errorMessage="Teacher priority list not found!"
            successLink={{
              href: `/update/priority/teacher/${formData?.year}/${formData?.semester}`,
              label: "Show"
            }}
            errorLink={{
              href: "/routine/teacherPriority",
              label: "Create"
            }}
          />


          {/* routine table  */}

          {
            dataSetFound && <div className="mt-3 d-flex justify-content-center">
              <div>
                <div className="row">
                  <div className="col-6">
                    <Link to="/routine">
                      <button
                        className="btn btn-success"
                        style={{
                          padding: "7px",
                          width: "32vw",
                          marginRight: "15px",
                        }}
                      >
                        Back To Final Routine
                      </button>
                    </Link>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-success"
                      style={{
                        padding: "7px",
                        width: "32vw",
                        marginLeft: "15px",
                      }}
                      onClick={generateRoutine}
                    >
                      Click to Re-order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }

          {
            defaults ? (
              <div></div>
            ) : 
            (
              loading ? (
                <div className="d-flex justify-content-center mt-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                (error === '') ? (
                  <div>
                    <div ref={pdfRef}>
                      <ManualRoutineTable
                        routineProps={routine}
                        yearTermProps={yearTerms}
                        courseCodeToObj={courseCodeToObj}
                        teacherCodeToObj={teacherCodeToObj}
                      />
                    </div>
                    <div className="mb-3 mt-3 d-flex justify-content-center">
                      <button
                        className="btn btn-primary"
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
                ) : (
                  <b><p className="text-danger text-center m-4">{error}</p></b>
                )
              )
            )
          }
        </div>
        <div className="col-2">
          <h5>Related Functions</h5>
          <hr />
        </div>
      </div>
    </>
  );
};

export default CreateClassRoutine;
