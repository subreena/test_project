import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/ser1-style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoutineTable from "./ser1_components/RoutineTable";
import CustomDropdown from "../ser3/CustomDropdown";

const Routine = () => {
  const [routine, setRoutine] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachersName, setTeachersName] = useState([]);

  useEffect(() => {
    const routineData = JSON.parse(localStorage.getItem('routine'));
    const yearTermsData = JSON.parse(localStorage.getItem("yearTerms"));
    setRoutine(routineData);
    setYearTerms(yearTermsData);
  }, []);

  useEffect(() => {
    fetch("https://ice-web-nine.vercel.app/routine")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYearTerms(data[0].yearTerm);
        setRoutine(data[0].overall);
        setTeachersName(data[0].routineTeachersName);

        localStorage.setItem('routine', JSON.stringify(data[0].overall));
        localStorage.setItem('yearTerms', JSON.stringify(data[0].yearTerm));
        localStorage.setItem('routineTeachersName', JSON.stringify(data[0].routineTeachersName));
      })
      .catch((error) => console.error(error));
  }, []);

  const [routineCommitteeErrorMessage, setRoutineCommitteeErrorMessage] = useState("");
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    setTeacher(data);
    console.log(data);
    console.log(yearTerms);
  }, []);

  const navigate = useNavigate();
  const toCreateRoutine = () => {
    if (teacher?.isInRoutineCommittee) {
      setRoutineCommitteeErrorMessage("");
      navigate("/create-routine", { state: { routine, yearTerms } });
    } else {
      setRoutineCommitteeErrorMessage(
        "Sorry! May be you are not logged in or not a member of the Routine Committtee yet!"
      );
    }
  };

  const handleSelectChange = (value) => {
    setSelectedTeacher(value);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          <button
            className="btn btn-success"
            style={{
              padding: "7px",
              width: "60vw",
              marginRight: "15px",
            }}
            onClick={toCreateRoutine}
          >
            Re-order Routine
          </button>

          <p className="mx-3 text-danger text-center">{routineCommitteeErrorMessage}</p>
        </div>
      </div>

      <CustomDropdown 
        coursesName={teachersName}
        selectedCourse={selectedTeacher}
        handleSelectChange={handleSelectChange}
        title="Teacher"
      />
      
      <RoutineTable routineProps={routine} yearTermProps={yearTerms} selectedTeacher={selectedTeacher} />
    </>
  );
};

export default Routine;
