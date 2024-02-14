import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";


const SuperAdmin = () => {
    const [superAdmin, setSuperAdmin] = useState(false);
    const [routineView, setRoutineView] = useState(false);
    const [examView, setExamView] = useState(false);
    const [committee, setCommittee] = useState([]);  
    const [year, setYear] = useState("1");
    const [term, setTerm] = useState("1");
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    
      const handleRoutineView = () => {
        setRoutineView(!routineView);
      }
    
      const handleSuperAdminView = () => {
        setSuperAdmin(!superAdmin);
      }
    
      const handleExamView = () => {
    setExamView(!examView);
      }
    
      const [notice, setNoticeView] = useState(false);

      const handleNotice = () => {
        setNoticeView(!notice);
      }
    
  const courseApi =
    "http://localhost:5000/courseDetails";
  const teacherApi =
    "http://localhost:5000/teachers";


 

  useEffect(() => {
    fetch(teacherApi)
      .then((response) => response.json())
      .then((data) => {
        setTeachers(data.data);
        setLoading(false);
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
        setCourses(d.data);
        setLoading(false);
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
       

        <div className="card p-5">
            <h2 className="text-center mb-3">Admin Panel</h2>
            <hr />
          <div className="card">
            <div className="card-body">
           <div className="row">
           <div className="col-6">
                <button className="btn btn-success w-100" onClick={handleSuperAdminView}>Click to Update Course Distribution</button>
                <div className={superAdmin ? "d-block" : "d-none"}>
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
        </div>
            </div>
            <div className="col-6">
                <button className="btn btn-danger w-100" onClick={handleNotice}>Notices</button>
                <div className={notice ? "d-block" : "d-none"}>
            <div className="text-center">
            <p>No Approval Needed For now</p>
           <p>Routine : Approved</p>
           <p>Exam Comittee: Approved</p>
            </div>

        </div>
            </div>
           </div>
        
       
            </div>
          </div>
        
      
        <div className="row">
            <div className="col-12">
              <div className="card m-2">
                <div className="">
                  <div className="card-body">
                    <div className="row">
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
                        <button className="btn btn-primary w-100 mt-1 mb-3" onClick={handleRoutineView}>
                    See Routine Committee
                    </button>
                    <div className={routineView ? "d-block" : "d-none"}>
                    <ol type="1">
                      {teachers
                        .filter(
                          (teacher) => teacher.isInRoutineCommittee === true
                        )
                        .map((teacher, index) => (
                          <li key={index}>
                            <p>
                              {teacher.firstName} {teacher.lastName}
                            </p>
                          </li>
                        ))}
                    </ol>
                    </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card m-2">
                <div className="">
                  <div className="card-body">
                <div className="row">
                <div className="col-6">
                  <button className="btn btn-info w-100 mt-1 mb-3" onClick={handleExamView}>
                    See Exam Committee Members
                    </button>
                    <div className={examView ? "d-block" : "d-none"}>
                    <ol type="1">
                      {committee
                        .filter((teacher) => teacher.isInExamCommittee === true)
                        .map((teacher, index) => (
                          <li key={index}>
                            <p>
                              {teacher.firstName} {teacher.lastName}
                            </p>
                          </li>
                        ))}
                    </ol>
                    </div>
                  </div>
                  <div className="col-6">
                  <div className="col-12">
            <Link to="/examcontrol">
              <button
                className="btn btn-success"
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                Show Exam Committee
              </button>
            </Link>
          </div>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
        <div className="card card m-2">
          <div className="card-body">
            <div className="row">
          <div className="col-4">
            <Link to="/teacherDetails">
              <button
                className="btn btn-warning"
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                Check Out Teacher Details
              </button>
            </Link>
          </div>
          <div className="col-4">
            <Link to="/courseDetails">
              <button
                className="btn btn-secondary"
                style={{
                  width: "100%",
                  padding: "5px",
                }}
              >
                Check Out Course Details
              </button>
            </Link>
          </div>
       
              
              <div className="col-4">
                {/* <p className="h5 card-text">
                  <Link to="/previousdocuments">
                    <button className="btn btn-success w-100">
                      Previous Documents
                    </button>
                  </Link>
                </p> */}
              </div>
            </div>
          </div>
        </div>
        </div>
          </div>
        </div>

      </Container>
    </div>
  );
};

export default SuperAdmin;
