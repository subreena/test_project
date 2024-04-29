import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const courseApi =
    "https://ice-web-nine.vercel.app/courseDetails";
  const teacherApi =
    "https://ice-web-nine.vercel.app/teachers";


  const [year, setYear] = useState("1");
  const [term, setTerm] = useState("1");
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teacherError, setTeacherError] = useState('');
  const [courseError, setCourseError] = useState('');

  useEffect(() => {
    fetch(teacherApi)
      .then((response) => response.json())
      .then((d) => {
        if(d.success) {
          const data = d.data;
          setTeachers(data);
          setLoading(false);
          setTeacherError('');
        } else {
          setLoading(false);
          setTeacherError(d.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(courseApi)
      .then((res) => res.json())
      .then((d) => {
        if(d.success) {
          setCourses(d.data);
          setLoading(false);
          setCourseError('');
        } else {
          setCourseError(d.error);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  },[]);

  if (loading) {
    return <div>Loading</div>;
  }

  const formSubmit = () => {
    let CRF = document.getElementById("create-routine-form");
    const formData = new formData(CRF);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <Container>
        <form id="create-routine-form">
          <div className="row">
            <div className="col-12">
              <select name="teacher-choice" id="" className="form-select">
                <option value="-1">Select Teacher: </option>
                {teachers.map((t, index) => (
                  <option key={index} value={t.teacherCode}>
                    {t.firstName} {t.lastName} ({t.teacherCode})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-6">
              <select
                id="year"
                name="year-choice"
                className="form-select"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option>Select Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="col-6">
              <select
                id="term"
                name="semester-choice"
                className="form-select"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              >
                <option>Select Term</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-12">
              <select name="course-choice"  className="form-select">
                <option value="-1">Select Course</option>
               {
                courses.map((c,index) => (
                  <option value={c.code} key={index}>
                    {c.name} - ({c.code})
                  </option>
                ))
               }
              </select>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-success"
                style={{
                  width: "100%",
                  padding: "5px",
                }}
                onSubmit={formSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="row mt-1">
          <div className="col-12">
            <Link to="/Routine">
              <button
                className="btn btn-success"
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                Show Routine
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <Link to="/teacherDetails">
              <button
                className="btn btn-success"
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                Check Out Teacher Details
              </button>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/courseDetails">
              <button
                className="btn btn-success"
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                Check Out Course Details
              </button>
            </Link>
          </div>
        </div>

      </Container>
    </div>
  );
};

export default TeacherDashboard;
