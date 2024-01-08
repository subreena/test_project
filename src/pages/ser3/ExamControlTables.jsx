import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Button, ListGroup } from "react-bootstrap";
import { scroller } from "react-scroll";

const ExamControlTables = () => {
  const [theory, setTheory] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState(null);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);

  useEffect(() => {
    const theoryData = JSON.parse(localStorage.getItem("theory"));
    const teacherCoursesData = JSON.parse(
      localStorage.getItem("teacherCourses")
    );
    setTheory(theoryData);
    setTeacherCourses(teacherCoursesData);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5005/examCommittee")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTheory(data[0].theory);
        setTeacherCourses(data[0].teachers);

        localStorage.setItem("theory", JSON.stringify(data[0].theory));
        localStorage.setItem(
          "teacherCourses",
          JSON.stringify(data[0].teachers)
        );
      })
      .catch((error) => console.error(error));
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
      smooth: "easeInOutQuart",
      offset: -70,
    });
  };

  const [showYearTerms, setShowYearTerms] = useState(false);

  return (
    <>
      <Button
        variant="info"
        style={{
          position: "fixed",
          top: "65px",
          right: "2px",
          zIndex: "1000",
          opacity: showYearTerms ? "1" : "0.3",
          transition: "opacity 0.3s",
        }}
        onMouseEnter={() => setShowYearTerms(true)}
        onMouseLeave={() => setShowYearTerms(false)}
      >
        Year-Term Wise
      </Button>
      {showYearTerms && (
        <ListGroup
          style={{
            position: "fixed",
            top: "102px",
            right: "2px",
            zIndex: "1000",
            width: "140px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setShowYearTerms(true)}
          onMouseLeave={() => setShowYearTerms(false)}
        >
          {yearTerms.map((option, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => scrollToSection(`section${index}`)}
            >
              {`Y-${option[0]}, T-${option[1]}`}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <section style={{ margin: "0 15px" }}>
        {modifiedTheory.map((yearTermWiseTheory, index1) => (
          <div key={index1} className="bg-style" name={`section${index1}`}>
            <div>
              <h4 className="text-center exam-header text-small2">
                {`${
                  index1 + 1
                }. Examination Committee and Question Moderators for Session: Y-${
                  yearTerms[index1][0]
                }, T-${yearTerms[index1][1]} Final Examination`}
              </h4>
              <div className="row">
                {yearTermWiseTheory.map((courses, index2) => (
                  <div
                    className="col-12 col-lg-6 col-md-6 col-xl-6"
                    key={`table-${index1}-${index2}`}
                  >
                    <div className="">
                      <table
                        className="table table-striped table-hover text-small"
                        style={{
                          height: "220px",
                          padding: "0 5px",
                          border: "1px solid grey",
                        }}
                      >
                        <caption className="text-small2">{`${index2 + 1}. ${courses[0].course.code}: ${
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
        ))}
      </section>
    </>
  );
};

export default ExamControlTables;
