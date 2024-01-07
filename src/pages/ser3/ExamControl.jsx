import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Button, ListGroup } from 'react-bootstrap';
import { scroller } from 'react-scroll';
import { useNavigate } from "react-router-dom";

const ExamControl = () => {
  const [theory, setTheory] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(theory, modifiedTheory, yearTerms);
  }, [modifiedTheory]);

  useEffect(() => {
    fetch(
      "https://ice-web-nine.vercel.app/examCommittee"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTheory(data[0].theory);
        setTeacherCourses(data[0].teachers);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    toModifiedTheory();
  }, [theory]);

  const toModifiedTheory = () => {
    if (!(theory && theory.length > 0)) return;
    var theoryModified = [],
      yt = [];
    for (let year = 4; year > 0; year--) {
      for (let term = 2; term > 0; term--) {
        if (theory[year][term].length !== 0) {
          theoryModified.push(theory[year][term]);
          yt.push([year, term]);
        }
      }
    }
    setModifiedTheory(theoryModified);
    setYearTerms(yt);
  };

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 100,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70
    });
  };

  const [showYearTerms, setShowYearTerms] = useState(false);

  const [examCommitteeErrorMessage, setExamCommitteeErrorMessage] = useState("");
  const [teacher, setTeacher] = useState(null);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('teacher'));
    setTeacher(data);
  }, []);

  const toggleExamCommittee = () => {
    console.log(teacher.isInExamCommittee);
    if(teacher?.isInExamCommittee) {
      setExamCommitteeErrorMessage("");
      navigate('/create-exam-control', { state: { theory } });
    } else {
      setExamCommitteeErrorMessage("Sorry! You are not a member of exam committtee yet!");
    }
  }

  return (
    <div>
      <Button
        variant="info"
        style={{
          position: 'fixed',
          top: '72px',
          right: '2px',
          zIndex: '1000',
          opacity: showYearTerms ? '1' : '0.3',
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={() => setShowYearTerms(true)}
        onMouseLeave={() => setShowYearTerms(false)}
      >
        Year-Term Wise
      </Button>
      {showYearTerms && (
        <ListGroup
          style={{
            position: 'fixed',
            top: '110px',
            right: '2px',
            zIndex: '1000',
            width: '140px',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setShowYearTerms(true)}
          onMouseLeave={() => setShowYearTerms(false)}
        >
          {yearTerms.map((option, index) => (
            <ListGroup.Item key={index} onClick={() => scrollToSection(`section${index}`)}>
              {`Y-${option[0]}, T-${option[1]}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <section className="d-flex justify-content-center mb-4">
        <button
            onClick={() => navigate('/exam-control-teacher-wise', { state: { teacherCourses } })}
            className="btn btn-success"
            style={{
              padding: "7px",
              width: "450px",
              marginRight: "15px"
            }}
          >
            Teacher Wise Courses
        </button>
        <button
          onClick={toggleExamCommittee}
          className="btn btn-success"
          style={{
            padding: "7px",
            width: "450px",
            marginLeft: "15px"
          }}
        >
          Re-order exam committee(theory)
        </button>

        <p className="mx-3 text-danger">{examCommitteeErrorMessage}</p>
      </section>

      <section style={{margin: "0 15px"}}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          modifiedTheory.map((yearTermWiseTheory, index1) => (
            <div key={index1} className="bg-style" name={`section${index1}`}>
              <div>
                <h4 className="text-center exam-header">{`${
                  index1 + 1
                  }. Examination Committee and Question Moderators for Session: Y-${
                  yearTerms[index1][0]
                  }, T-${yearTerms[index1][1]} Final Examination`}
                </h4>
               <div className="row">
               {yearTermWiseTheory.map((courses, index2) => (
                  <div className="col-12 col-lg-6 col-md-6 col-xl-6" key={`table-${index1}-${index2}`}>
                    <div className="">
                      <table className="table table-striped table-hover" style={{height:"220px", border: "1px solid grey"}}>
                        <caption>{`${index2 + 1}. ${courses[0].course.code}: ${
                          courses[0].course.name
                        }`}</caption>
                        <thead>
                          <tr>
                            <th scope="col"> # </th>
                            <th scope="col"> Name </th>
                            <th scope="col"> Designation </th>
                            <th scope="col"> Address </th>
                            <th scope="col"> Remark </th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((teacher, index3) => (
                            <tr key={`row-${index1}-${index2}-${index3}`}>
                              <td scope="row"> {index3 + 1} </td>
                              <td> {teacher.teacher.name} </td>
                              <td> {teacher.teacher.designation} </td>
                              <td> {teacher.teacher.department} </td>
                              <td> {teacher.teacher.remark} </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
               </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ExamControl;
