import { useEffect, useState } from "react";
import CustomDropdown from "../../ser3/CustomDropdown";

const TeacherPriority = () => {

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teachersName, setTeachersName] = useState([]);
    const [teacherList, setTeacherList] = useState([]);

    const handleSelectChange = (value) => {
        setSelectedTeacher(value);
    };

    // Fetch teachers from API when component mounts
    useEffect(() => {
        fetch("http://localhost:5000/teachers")
            .then(response => response.json())
            .then(data => {
                const formattedOptions = data.data.map(teacher => 
                    `${teacher.firstName} ${teacher.lastName}-${teacher.teacherCode}`
                );
                setTeachersName(formattedOptions);

                console.log(formattedOptions);
            })
            .catch(error => console.error("Error fetching teachers:", error));
    }, []); // Runs only once when the component mounts

    // Handle adding a new teacher
    const addTeacher = () => {
        console.log(selectedTeacher);
        if (selectedTeacher) {
            setTeacherList([...teacherList, selectedTeacher]);
        }

        const newTeachersName = teachersName.filter(teacher => teacher !== selectedTeacher);
        setSelectedTeacher("");
        setTeachersName(newTeachersName);
        setSubmitError("");
    };

    // Handle removing a teacher
    const removeTeacher = (index) => {
        setTeachersName([...teachersName, teacherList[index]]);

        setTeacherList(teacherList.filter((_, i) => i !== index));
    };

    const [year, setYear] = useState(null);
    const [semester, setSemester] = useState(null);

    const handleYearChange = (event) => {
        const inputValue = event.target.value;
    
        if (!isNaN(inputValue) && inputValue >= 1000 && inputValue <= 9999) {
          setYear(inputValue);
          setSubmitError("");
        } else {
            setYear(null);
        }
      };

      const handleInputChange = (event) => {
        const { name, value, id } = event.target;
    
        console.log(name, value, id);
    
        const newValue =
          event.target.type === "radio" ? (id === "odd" ? "1" : "2") : value;
    
        console.log(newValue);
    
        setSemester(newValue);
        setSubmitError("");
      };

      const builtTeachersCodeList = () => {
        return teacherList.map(teacher => (teacher.split('-')[1]));
      }

      const [submitError, setSubmitError] = useState("");
      const [submitSuccess, setSubmitSuccess] = useState("");

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

  return (
    <>
        <h2 className="text-center">Teacher Priority Dashboard</h2>
        <hr />

        <div className="container">
            <div className="row">
                <div className="col-6 d-flex justify-content-center">
                    {/* exam year */}
                    <div>
                        <label htmlFor="year" className="form-label">
                        Year:{" "}
                        </label>
                    </div>
                    <div>
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
                        style={{width: "250px"}}
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
                <div className="col-6 d-flex justify-content-center">
                    {/* semester selection */}
                    <div>
                        <label htmlFor="semester">Semester:{" "}</label>
                    </div>
                    <div>
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

        <div className="d-flex justify-content-center">
            <div className="container d-flex justify-content-center m-3">
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-center">Teacher Name-Code</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherList.map((teacher, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{teacher}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => removeTeacher(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-x-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* Add new teacher row */}
                        <tr>
                            <td>~</td>
                            <td>
                                <CustomDropdown
                                    coursesName={teachersName}
                                    selectedCourse={selectedTeacher}
                                    handleSelectChange={handleSelectChange}
                                    title="Teacher"
                                />
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => addTeacher()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
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

        <div className="text-center mb-3 d-flex justify-content-around ">
            <button
                className="btn btn-primary text-white bg-primary bg-gradient w-25"
                onClick={handleSubmit}
            >
                {" "}
                Publish
            </button>
        </div>
    </>
  );
};

export default TeacherPriority;