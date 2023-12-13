import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Container, Row } from "react-bootstrap";

const ExamControl = () => {
  const [theory, setTheory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/examCommittee"
    )
      .then((response) => response.json())
      .then((data) => {
        setTheory(data[0].theory);
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

  const generateExamCommitteeTheory = () => {
    setLoading(true);

    fetch(
      "http://localhost:5000/generateExamCommittee"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const newRoutine = [];
        newRoutine.push({
          theory: data,
        });
        setTheory(newRoutine[0].theory);
      })
      .catch((error) => {
        console.error("Error fetching theory:", error);
        setLoading(false);
      });
  };

  return (
    <Container>
      <button
        onClick={generateExamCommitteeTheory}
        className="btn btn-success"
        style={{
          margin: "10px 0 40px 400px",
          padding: "10px",
          width: "450px",
        }}
      >
        Re-order exam committee(theory)
      </button>
      <Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          modifiedTheory.map((yearTermWiseTheory, index1) => (
            <div key={index1} className="col-12">
              <div>
                <h4 className="text-center exam-header">{`${
                  index1 + 1
                }. Examination Committee and Question Moderators for Session: Y-${
                  yearTerms[index1][0]
                }, T-${yearTerms[index1][1]} Final Examination`}</h4>
               <div className="row">
               {yearTermWiseTheory.map((courses, index2) => (
                  <div className="col-6 col-lg-6 col-sm-12" key={`table-${index1}-${index2}`}>
                    <div className="">
                      <table className="routine-table exam-table">
                        <caption>{`${index2 + 1}. ${courses[0].course.code}: ${
                          courses[0].course.name
                        }`}</caption>
                        <thead>
                          <tr>
                            <td className="routine-header-tr">Sl. No.</td>
                            <td className="routine-header-tr cell-size-of-exam-committee">
                              Name
                            </td>
                            <td className="routine-header-tr cell-size-of-exam-committee">
                              Designation
                            </td>
                            <td className="routine-header-tr cell-size-of-exam-committee">
                              Address
                            </td>
                            <td className="routine-header-tr cell-size-of-exam-committee">
                              Remark
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((teacher, index3) => (
                            <tr key={`row-${index1}-${index2}-${index3}`}>
                              <td>{index3 + 1}</td>
                              <td className="cell-size-of-exam-committee-name">
                                {teacher.teacher.name}
                              </td>
                              <td className="cell-size-of-exam-committee">
                                {teacher.teacher.designation}
                              </td>
                              <td className="cell-size-of-exam-committee">
                                {teacher.teacher.department}
                              </td>
                              <td className="cell-size-of-exam-committee">
                                {teacher.teacher.remark}
                              </td>
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
      </Row>
    </Container>
  );
};

export default ExamControl;

{
  /*  */
}
