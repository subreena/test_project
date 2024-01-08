import "bootstrap/dist/css/bootstrap.css";
import "../../assets/stylesheets/ser1-style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoutineTable from "./ser1_components/RoutineTable";

const Routine = () => {
  const [routine, setRoutine] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);

  useEffect(() => {
    const routineData = JSON.parse(localStorage.getItem('routine'));
    const yearTermsData = JSON.parse(localStorage.getItem("yearTerms"));
    setRoutine(routineData);
    setYearTerms(yearTermsData);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5005/routine")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYearTerms(data[0].yearTerm);
        setRoutine(data[0].overall);

        localStorage.setItem('routine', JSON.stringify(data[0].overall));
        localStorage.setItem('yearTerms', JSON.stringify(data[0].yearTerm));
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
    console.log(teacher.isInRoutineCommittee);
    if (teacher?.isInRoutineCommittee) {
      setRoutineCommitteeErrorMessage("");
      navigate("/create-routine", { state: { routine, yearTerms } });
    } else {
      setRoutineCommitteeErrorMessage(
        "Sorry! You are not a member of routine committtee yet!"
      );
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          <button
            className="btn btn-success"
            style={{
              padding: "7px",
              width: "32vw",
              marginRight: "15px",
            }}
            onClick={() => {navigate('teacher-wise-routine', { state: { routine, yearTerms } })}}
          >
            Teacher-Wise Routine
          </button>
        </div>
        <div>
          <button
            className="btn btn-success"
            style={{
              padding: "7px",
              width: "32vw",
              marginRight: "15px",
            }}
            onClick={toCreateRoutine}
          >
            Re-order Routine
          </button>

          <p className="mx-3 text-danger">{routineCommitteeErrorMessage}</p>
        </div>
      </div>
      
      <RoutineTable routineProps={routine} yearTermProps={yearTerms}/>
    </>
  );
};

export default Routine;
