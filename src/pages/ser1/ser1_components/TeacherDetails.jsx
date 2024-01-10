import { useEffect, useState } from "react";


const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/teachers")
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data);
       
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={{
        minHeight: '80vh',
        marginTop: '50px',
      }}>
        <h1 className="text-center m-5">Teacher Information</h1>
        <div className="container">
          <div className="row">
            {teachers.map((teacher) => (
              <div
                className="col-4"
                style={{
                  padding: "10px",
                border: "1px solid black",
                  borderRadius: "10px",
                }}
                key={teacher.id}
              >
                <strong>Name:</strong> {teacher.firstName} {teacher.lastName}
                <br />
                <strong>Email:</strong> {teacher.email}
                <br />
                <strong>Course: </strong>
               {teacher.courses.join(' ,')}
              </div>
            ))}
          </div>
        </div>


      </div>
    </>
  );
};

export default TeacherDetails;