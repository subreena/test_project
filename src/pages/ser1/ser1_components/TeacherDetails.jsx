import { useEffect, useState } from "react";

const TeacherDetails = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teacherError, setTeacherError] = useState('');

  useEffect(() => {
    fetch("https://ice-web-nine.vercel.app/teachers")
      .then((response) => response.json())
      .then((d) => {
        if(d.success) {
          const data = d.data;
          const sortedData = data.sort((a, b) => b._id.localeCompare(a._id));
          // Set the sorted data as the state
          setTeachers(sortedData);
          setLoading(false);
          setTeacherError('');
        } else {
          setTeacherError(d.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <h1 className="text-center mb-4">Teacher Information</h1>
          <div className="container-fluid">
            <div className="row mb-3">
              {teachers.map((teacher) => (
                <div className="col-lg-3 col-sm-6 col-6" key={teacher.id}>
                  <div className="card p-1 m-1" style={{ minHeight: "250px" }}>
                    <div className="card-body">
                      <p className="card-text">
                        <strong>Name:</strong> {teacher.firstName}{" "}
                        {teacher.lastName}
                      </p>

                      <p className="card-text">
                        {" "}
                        <strong>Email:</strong> {teacher.email}
                      </p>

                      <p className="card-text">
                        <strong>Course:</strong>
                        {Array.isArray(teacher.courses) &&
                          teacher.courses != null &&
                          teacher.courses.map((c, i) => (
                            <ul key={i}>
                              <li>
                                {c.value} {c.label}
                              </li>
                            </ul>
                          ))}
                        {Array.isArray(teacher.courses) &&
                          teacher.courses != null &&
                          teacher.courses.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherDetails;
