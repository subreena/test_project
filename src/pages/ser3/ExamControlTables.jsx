import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Button, ListGroup } from "react-bootstrap";
import { scroller } from "react-scroll";

const ExamControlTables = (props) => {
  const { modifiedTheoryProps, yearTermsProps, isExamCommittee } = props;
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);

  useEffect(() => {
    setModifiedTheory(modifiedTheoryProps);
    setYearTerms(yearTermsProps);

    console.log(modifiedTheoryProps, yearTermsProps);
  }, [modifiedTheoryProps, yearTermsProps]);

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
          top: "63px",
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
            top: "100px",
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

      <section style={{ margin: "0 8px" }}>
        {modifiedTheory.map((yearTermWiseTheory, index1) => (
          <div key={index1} className="bg-style" name={`section${index1}`}>
            <div>
              <h4 className="text-center exam-header text-small2">
                {`${
                  index1 + 1
                }. Y-${
                  yearTerms?.[index1][0]
                }, T-${yearTerms?.[index1][1]} Final Examination`}
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
                        <caption className="text-small1">{`${index2 + 1}. ${courses?.[0].course.code}: ${
                          courses?.[0].course.name
                        }`}</caption>
                        <thead>
                          <tr>
                            <th scope="col"> # </th>
                            <th scope="col"> Name </th>
                            <th scope="col"> Designation </th>
                            <th scope="col"> Address </th>
                            { isExamCommittee && <th scope="col"> Remark </th> }
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((teacher, index3) => (
                            <tr key={`row-${index1}-${index2}-${index3}`}>
                              <td scope="row"> {index3 + 1} </td>
                              <td> {teacher?.teacher.name} </td>
                              <td> {teacher?.teacher.designation} </td>
                              <td> {teacher?.teacher.department} </td>
                              { isExamCommittee && <td> {teacher?.teacher.remark} </td> }
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
