import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StaticBackdropModal from "../Modal/StaticBackdropModal";
import TeacherPriorityUpdater from "./ser1_components/TeacherPriorityUpdater";
import UpdateSlotsPriority from "./UpdateSlotsPriority";

const UpdateTeacherSlotsPriority = () => {
  const {year, semester} = useParams();
  const [priorityData, setPriorityData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [teachersName, setTeachersName] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formattedTeacherList, setFormattedTeacherList] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [timeslotsLength, setTimeslotsLenth] = useState(0);
  const [serialWiseSlots, setSerialWiseSlots] = useState(null);
  const [selectedTeacherList, setSelectedTeacherList] = useState([]);
  const [teacherCodeToTeacher, setTeacherCodeToTeacher] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/priority/slots/data/${year}/${semester}`);
        const data = await response.json();
        if (data.success) {
          // console.log(data.data);
          setTeacherList(data.data[0].teachers);
          setSerialWiseSlots(data.data[0].slots);
          setPriorityData(data.data[0]);
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await fetch("http://localhost:5000/teachers");
        const data = await response.json();
        if (data.success) {
          // console.log(data.data);
          setTeachers(data.data);

          teacherCodeToTeacherMapping(data.data);

          const formattedOptions = data.data.map(teacher => 
            `${teacher.firstName} ${teacher.lastName}-${teacher.teacherCode}`);
          setTeachersName(formattedOptions);

        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(year, semester);

    const fetchTimeslot = async () => {
      try {
        const response = await fetch("http://localhost:5000/timeSlot");
        if (!response.ok) {
          throw new Error("Failed to fetch timeslots");
        }
        const data = await response.json();
        // console.log(data.data[0].timeSlot);
        setTimeslots(data.data[0].timeSlot);

        let count = 0;
        for(const timeslot of data.data[0].timeSlot) {
          if(!timeslot.isLunchHour) count++;
        }
        setTimeslotsLenth(count);

        // console.log(count);
      } catch (error) {
        console.error("Error fetching timeslots:", error);
      }
    };

    fetchTimeslot();
  }, []);

  const builtTeachersCodeList = () => {
    return formattedTeacherList.map(teacher => (teacher.split('-')[1]));
  }

  const [loading, setLoading] = useState(false);

  const updateMethod = async () => {
    try {
      // Display an alert to confirm before proceeding
      const shouldGenerate = window.confirm(
        "Are you sure you want to update the Teacher Priority List?"
      );

      if (!shouldGenerate) {
        // If the user clicks "Cancel" in the alert, do nothing
        return;
      }

      setLoading(true);
      const updatedData = {
        ...priorityData,
        teachers: builtTeachersCodeList(),
        slots: serialWiseSlots
      };

      const response = await fetch(
        `http://localhost:5000/priority/slots/update/${year}/${semester}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newData: updatedData
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const d = await response.json();
      // console.log(d);
      if (d.success) {
        const data = d.data;
        // console.log(data);
        setUpdateError("");
        setUpdateSuccess('Teacher Priority successfully updated!');
      } else {
        setUpdateError(d.error);
        setUpdateSuccess('');
      }
      // setErrorMessage("");
    } catch (error) {
      // setErrorMessage(error.message);
      console.error("Error creating exam routine:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
      if (!year || !semester || teacherList.length === 0) {
          setUpdateError('Please ensure year, semester, and at least one teacher is selected.');
      } else {
          updateMethod();
          setUpdateError('');
      }
  };


  // const handleUpdateSlots = async (event) => {
  //   event.preventDefault();

  //   handleStaticModalShow();
  // };

  const [readyToSave, setReadyToSave] = useState(false);
  const [staticShow, setStaticShow] = useState(false);

  const handleStaticModalClose = () => {
    setStaticShow(false);
    setReadyToSave(false);
  }
  // const handleStaticModalShow = () => setStaticShow(true);
  const handleReadyToDelete = () => {
    setReadyToSave(true);
    setStaticShow(false);
  }

  useEffect(() => {
    const updateMethod = async() => {
      // to save it at pending service
      try {
        setLoading(true);

        const updatedData = {
          year: year, 
          semester: semester,
          yearSemester: year?.toString() + semester?.toString(),
          teachers: builtTeachersCodeList(),
          slots: serialWiseSlots
        };

        // Make a POST request to your endpoint
        const response = await fetch(`http://localhost:5000/priority/slots/update/${year}/${semester}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newData: updatedData
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }

        const d = await response.json();
        // console.log("response: ", d);
        if (!d.success) {
          setUpdateError(d.error);
          setUpdateSuccess("");
        } else {
          setUpdateError("");
          setUpdateSuccess("Data updated successfully!");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    if(readyToSave) {
      updateMethod();
    }
  }, [readyToSave]);

  const teacherCodeToTeacherMapping = (teachers) => {
    // console.log("teachers: ", teachers);

    let teacherMapping = {};
    teachers.forEach(teacher => {
      teacherMapping[teacher.teacherCode] = teacher;
    });

    // console.log("Mapping: ", teacherMapping);

    setTeacherCodeToTeacher(teacherMapping);
  }
  
  const [slotsPriorityError, setSlotsPriorityError] = useState("");

  const handleClickToOpenSlotsPriority = () => {
    if(teacherList.length === 0) {
      setSlotsPriorityError("Please add at least one teacher first!");
      return;
    }

    setSlotsPriorityError("");

    const newSelectedTeachers = [];

    formattedTeacherList.forEach(teacherCode => {
      newSelectedTeachers.push(teacherCodeToTeacher[teacherCode.split('-')[1]]);
    });

    setSelectedTeacherList(newSelectedTeachers);
  }

  useEffect(() => {
    if(teacherList && teacherList.length > 0 && teacherCodeToTeacher) {
      const newSelectedTeachers = [];

      teacherList.forEach(teacherCode => {
        newSelectedTeachers.push(teacherCodeToTeacher[teacherCode]);
      });

      setSelectedTeacherList(newSelectedTeachers);
    }
  }, [teacherList, teacherCodeToTeacher])

  // useEffect(() => {
  //   console.log("list: ", formattedTeacherList);

  //   if(formattedTeacherList && formattedTeacherList.length > 0 && teacherCodeToTeacher) {
  //     handleClickToOpenSlotsPriority();
  //   }
  // }, [formattedTeacherList, teacherCodeToTeacher])

  return (
      <>
        <StaticBackdropModal
          show={staticShow}
          onHide={handleStaticModalClose}
          onAccept={handleReadyToDelete}
          title={`Update Slots Priority`}
          description={`Are you sure, you want to update this data set?`}
          buttonName={"Update"}
          buttonVariant={'primary'}
        />

        <h2 className="text-center"> Update Teacher Slots Priority </h2>

        <hr />

        <div className="container my-3">
          <div className="row">
            <div className="col-6 d-flex justify-content-end">
                <h5>Year: {year}</h5>
            </div>
            <div className="col-6 d-flex justify-content-start">
                <h5>Semester: {semester}</h5>
            </div>
          </div>
        </div>

        <TeacherPriorityUpdater
          teachers={teachers}
          teacherList={teacherList}
          teachersName={teachersName}
          setTeachersName={setTeachersName}
          formattedTeacherList={formattedTeacherList}
          setFormattedTeacherList={setFormattedTeacherList}
          serialWiseSlots={serialWiseSlots}
          setSerialWiseSlots={setSerialWiseSlots}
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

        <UpdateSlotsPriority
          timeslots={timeslots}
          timeslotsLength={timeslotsLength}
          teachers={selectedTeacherList}
          serialWiseSlots={serialWiseSlots}
          setSerialWiseSlots={setSerialWiseSlots}
        />

        {updateError && <div className="alert alert-danger text-center mx-2"> { updateError } </div>}
        {updateSuccess && <div className="alert alert-success text-center mx-2"> { updateSuccess } </div>}
        
        {
          loading ? (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="text-center mb-3 d-flex justify-content-around">
              <button
                  className="btn btn-success text-white w-25"
                  onClick={handleUpdate}
              >
                  Update
              </button>
            </div>
          )
        }
      </>
  )
}

export default UpdateTeacherSlotsPriority;