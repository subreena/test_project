import { useEffect, useState } from "react";
import TeacherPriority from "./ser1_components/TeacherPriority";
import SlotsPriority from "./SlotsPriority";
import StaticBackdropModal from "../Modal/StaticBackdropModal";
import { Spinner } from "react-bootstrap";

const TeacherSlotsPriority = () => {
    const [teachers, setTeachers] = useState([]);
    const [year, setYear] = useState(null);
    const [semester, setSemester] = useState(null);
    const [readyToSave, setReadyToSave] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [teacherList, setTeacherList] = useState([]);
    const [serialWiseSlots, setSerialWiseSlots] = useState(null);
    const [isOpenSlotsPriority, setIsOpenSlotsPriority] = useState(0);
    const [selectedTeacherList, setSelectedTeacherList] = useState([]);
    const [teacherCodeToTeacher, setTeacherCodeToTeacher] = useState({});

    useEffect(() => {
      console.log("opne: ", isOpenSlotsPriority)
    })

    const teacherCodeToTeacherMapping = (teachers) => {
      // console.log("teachers: ", teachers);

      let teacherMapping = {};
      teachers.forEach(teacher => {
        teacherMapping[teacher.teacherCode] = teacher;
      });

      // console.log("Mapping: ", teacherMapping);

      setTeacherCodeToTeacher(teacherMapping);
    }

    // Fetch teachers from API when component mounts
    useEffect(() => {
        fetch("http://localhost:5000/teachers")
            .then(response => response.json())
            .then(data => {
                // console.log(data.data);
                setTeachers(data.data);
                teacherCodeToTeacherMapping(data.data);
            })
            .catch(error => console.error("Error fetching teachers:", error));
    }, []); // Runs only once when the component mounts

    const handleInputChange = (event) => {
      const {name, value, id} = event.target;
  
      console.log(name, value, id);
  
      const newValue =
      event.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;
  
      console.log(newValue);
  
      setSemester(newValue);
    }
  
    const handleYearChange = (event) => {
      const inputValue = event.target.value;
  
      if (!isNaN(inputValue) && inputValue >= 1000 && inputValue <= 9999) {
        setYear(inputValue);
      }
    };

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleSaveSlots = async (event) => {
    event.preventDefault();

    handleStaticModalShow();
  };

  const [staticShow, setStaticShow] = useState(false);

  const handleStaticModalClose = () => {
    setStaticShow(false);
    setReadyToSave(false);
  }
  const handleStaticModalShow = () => setStaticShow(true);
  const handleReadyToDelete = () => {
    setReadyToSave(true);
    setStaticShow(false);
  }

  const builtTeachersCodeList = () => {
    return teacherList.map(teacher => (teacher.split('-')[1]));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // to save it at pending service
    try {
        // Make a POST request to your endpoint
        const response = await fetch("http://localhost:5000/priority/teacher", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            year, 
            semester,
            yearSemester: year?.toString() + semester?.toString(),
            teachers: builtTeachersCodeList()
        }),
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
        }

        const d = await response.json();
        console.log("response: ", d);
        if (!d.success) {
        setSubmitError(d.error);
        setSubmitSuccess("");
        } else {
        setSubmitError("");
        setSubmitSuccess("Data saved successfully!")
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };

  const saveMethod = async() => {
    // to save it at pending service
    try {
      setIsLoading(true);
      // Make a POST request to your endpoint
      const response = await fetch("http://localhost:5000/priority/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: year, 
          semester: semester,
          yearSemester: year?.toString() + semester?.toString(),
          slots: serialWiseSlots
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      console.log("response: ", d);
      if (!d.success) {
        setSubmitError(d.error);
        setSubmitSuccess("");
      } else {
        setSubmitError("");
        setSubmitSuccess("Data saved successfully!")
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(readyToSave) {
      saveMethod();
    }
  }, [readyToSave]);

  const [slotsPriorityError, setSlotsPriorityError] = useState("");

  const handleClickToOpenSlotsPriority = () => {
    if(teacherList.length === 0) {
      setSlotsPriorityError("Please select at least one teacher first!");
      return;
    }

    setSlotsPriorityError("");
    setIsOpenSlotsPriority(prev => prev + 1);

    const newSelectedTeachers = [];

    teacherList.forEach(teacherCode => {
      newSelectedTeachers.push(teacherCodeToTeacher[teacherCode.split('-')[1]]);
    })

    setSelectedTeacherList(newSelectedTeachers);
  }

    return (
      <>
        <StaticBackdropModal
          show={staticShow}
          onHide={handleStaticModalClose}
          onAccept={handleReadyToDelete}
          title={`Save Slots Priority`}
          description={`Are you sure, you want to save these data set?`}
          buttonName={"Save"}
          buttonVariant={'primary'}
        />

        <h1 className="text-center mb-5">Create Teacher Slots Priority</h1>

        <div className="d-flex justify-content-center mt-2 mb-4">
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
                          year
                            ? "text-success text-sm"
                            : "text-danger text-sm"
                        }
                      >
                        Selected Year: {year || "No year selected"}
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
            </div>
          </form>
        </div>

        <hr />

        <TeacherPriority
            teachers={teachers}
            teacherList={teacherList}
            setTeacherList={setTeacherList}
        />

        {
          slotsPriorityError && 
            <div className="alert alert-danger text-center mx-2">
                {slotsPriorityError}
            </div>
        }

        <div className=" my-3 d-flex justify-content-center">
          <div>
            <div className="row">
              <div className="col-6">
                <button
                    className="btn btn-secondary"
                    style={{
                    padding: "7px",
                    width: "32vw",
                    marginLeft: "15px",
                    color:"white",
                    }}
                    onClick={handleClickToOpenSlotsPriority}
                >
                    Click to Load Teacher-wise Slots Priority
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {
          (isOpenSlotsPriority !== 0) && 
          <>
            <SlotsPriority
              teachers={selectedTeacherList}
              serialWiseSlots={serialWiseSlots}
              setSerialWiseSlots={setSerialWiseSlots}
            />

            {submitError && 
                  <div className="alert alert-danger text-center mx-2">
                      {submitError}
                  </div>
            }

            {submitSuccess && 
                  <div className="alert alert-success text-center mx-2">
                      {submitSuccess}
                  </div>
            }

            <div className=" my-3 d-flex justify-content-center">
              <div>
                <div className="row">
                  <div className="col-6">
                    {
                      isLoading ? (
                        <Spinner animation="border" role="status" variant="success">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <button
                            className="btn btn-success"
                            style={{
                            padding: "7px",
                            width: "32vw",
                            marginLeft: "15px",
                            }}
                            onClick={handleSaveSlots}
                        >
                            Save
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </>
    )
}

export default TeacherSlotsPriority;