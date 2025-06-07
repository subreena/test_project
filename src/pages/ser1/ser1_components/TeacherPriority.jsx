import { useEffect, useState } from "react";
import CustomDropdown from "../../ser3/CustomDropdown";

const TeacherPriority = ({ teachers, teacherList, setTeacherList }) => {

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teachersName, setTeachersName] = useState([]);

    const handleSelectChange = (value) => {
        setSelectedTeacher(value);
    };

    // Fetch teachers from API when component mounts
    useEffect(() => {
        const formattedOptions = teachers.map(teacher => 
            `${teacher.firstName} ${teacher.lastName}-${teacher.teacherCode}`
        );
        setTeachersName(formattedOptions);

        console.log(formattedOptions);
    }, [teachers]); // Runs only once when the component mounts

    // Handle adding a new teacher
    const addTeacher = () => {
        // console.log(selectedTeacher);
        if (selectedTeacher) {
            setTeacherList([...teacherList, selectedTeacher]);
        }

        const newTeachersName = teachersName.filter(teacher => teacher !== selectedTeacher);
        setSelectedTeacher("");
        setTeachersName(newTeachersName);
    };

    // Handle removing a teacher
    const removeTeacher = (index) => {
        setTeachersName([...teachersName, teacherList[index]]);

        setTeacherList(teacherList.filter((_, i) => i !== index));
    };

  return (
    <>
        <h2 className="text-center">Add Teacher Priority First</h2>

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
    </>
  );
};

export default TeacherPriority;