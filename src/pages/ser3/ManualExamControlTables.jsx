import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Button, ListGroup } from "react-bootstrap";
import { scroller } from "react-scroll";

const ManualExamControlTables = (props) => {
  const { modifiedTheoryProps, yearTermsProps, isExamCommittee, setDutyData } = props;
  const [modifiedTheory, setModifiedTheory] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);

  const handleInputChange = (e, index1, index2, index3, course) => {
    const { name, value } = e.target;

    setModifiedTheory((prevState) => {
      const newFormData = [...prevState];
      newFormData[index1][index2][index3] = { ...newFormData[index1][index2][index3], [name]: value };
      return newFormData;
    });

    setDutyData((prevState) => {
      const newDutyData = { ...prevState };
      const { year, term } = course;

      if (!newDutyData.theory) {
        newDutyData.theory = {};
      }
      if (!newDutyData.theory[year]) {
        newDutyData.theory[year] = {};
      }
      if (!newDutyData.theory[year][term]) {
        newDutyData.theory[year][term] = [];
      }

      newDutyData.theory[year][term][index2][index3].teacher[name] = value;
      return newDutyData;
    });
  };

  useEffect(() => {
    setModifiedTheory(modifiedTheoryProps);
    setYearTerms(yearTermsProps);
  }, [yearTermsProps]);

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
          {yearTerms && yearTerms.map((option, index) => (
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
        {modifiedTheory && modifiedTheory.map((yearTermWiseTheory, index1) => (
          <div key={index1} className="bg-style" name={`section${index1}`}>
            <div>
              <h4 className="text-center exam-header text-small2">
                {`${
                  index1 + 1
                }. Examination Committee and Question Moderators for Session: Y-${
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
                        <caption className="text-small1">{`${index2 + 1}. ${
                          courses?.[0].course.code
                        }: ${courses?.[0].course.name}`}</caption>
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
                              <td>
                                <input
                                  type="text"
                                  style={{ width: '250px' }}
                                  name="name"
                                  value={modifiedTheory[index1][index2][index3]?.name ?? teacher.teacher.name}
                                  onChange={(e) => handleInputChange(e, index1, index2, index3, courses[index2].course)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  style={{ width: '160px' }}
                                  name="designation"
                                  value={modifiedTheory[index1][index2][index3]?.designation ?? teacher.teacher.designation}
                                  onChange={(e) => handleInputChange(e, index1, index2, index3, courses[index2].course)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  style={{ width: '80px' }}
                                  name="department"
                                  value={modifiedTheory[index1][index2][index3]?.department ?? teacher.teacher.department}
                                  onChange={(e) => handleInputChange(e, index1, index2, index3, courses[index2].course)}
                                />
                              </td>
                              {isExamCommittee && <td>
                                <input
                                  type="text"
                                  style={{ width: '100px' }}
                                  name="remark"
                                  value={modifiedTheory[index1][index2][index3]?.remark ?? teacher.teacher.remark}
                                  onChange={(e) => handleInputChange(e, index1, index2, index3, courses[index2].course)}
                                />
                              </td>}
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

export default ManualExamControlTables;
