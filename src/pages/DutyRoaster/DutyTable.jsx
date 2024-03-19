import React, { useEffect, useState } from 'react';

const DutyTable = (props) => {
    const { modifiedTheoryProps, yearTermsProps } = props;
    const [modifiedTheory, setModifiedTheory] = useState([]);
    const [yearTerms, setYearTerms] = useState([]);
  
    useEffect(() => {
      setModifiedTheory(modifiedTheoryProps);
      setYearTerms(yearTermsProps);
  
      console.log(modifiedTheoryProps, yearTermsProps);
    }, [modifiedTheoryProps, yearTermsProps]);
    
    return (
        <div>
            <section style={{ margin: "0 8px" }}>
                {modifiedTheory.map((yearTermWiseTheory, index1) => (
                    <div key={index1} className="card m-3 p-3" name={`section${index1}`}>
                        <p className="text-center exam-header text-small2">
                            {`${
                                index1 + 1
                            }. Theory Exam Duty Roster for: Y-${
                                yearTerms[index1][0]
                            }, T-${yearTerms[index1][1]} Final Examination`}
                        </p>
                        <div>
                            <table className="table table-striped table-hover text-small" style={{ border: "1px solid grey" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Sl. NO</th>
                                        <th scope="col">Course Name</th>
                                        <th scope="col">Teacher</th>
                                        <th scope="col">Designation, address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearTermWiseTheory.map((courses, index2) => (
                                        <React.Fragment key={`row-${index1}-${index2}`}>
                                            {courses.map((teacher, index3) => (
                                                <tr key={`row-${index1}-${index2}-${index3}`}>
                                                    {index3 === 0 && (
                                                        <td rowSpan={courses.length}>{index2 + 1}</td>
                                                    )}
                                                    {index3 === 0 && (
                                                        <td rowSpan={courses.length}>
                                                            {`${teacher.course.code}: ${teacher.course.name}`}
                                                        </td>
                                                    )}
                                                  
                                                    <td>{teacher.teacher.name}</td>
                                                    <td>{`${teacher.teacher.designation}, ${teacher.teacher.department}`}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default DutyTable;
