import { Container, Row, Col } from "react-bootstrap";
import TeacherDashboard from "../teacherDashboard";
import { useEffect, useState } from "react";

const CreateRoutine = () => {
  const randomRoutineApi =
    "https://ice-9duauifmg-sajib-baruas-projects.vercel.app/generateRandomRoutine";

  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(randomRoutineApi)
      .then((res) => res.json())
      .then((data) => {
        setRandom(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "80vh" }}>
      <Container fluid>
        <Row>
          <Col md={7}>
            <div className="row">
              {random.map((l1, i1) => (
                <div key={i1} className="col-4">
                  {l1.map((l2, i2) => (
                    <div key={i2} style={{width: '100%'}}>
                      {l2.map((l3, i3) => (
                        <div key={i3} style={{width: '100%'}}>
                          {l3.map((l4, i4) => (
                            <div key={i4} style={{width: '100%'}}>
                              <td>
                                Is Allocated: {l4.isAllocated ? "Yes" : "No"} <br />
                                 {
                                    l4.teacher && l4.teacher.teacherCode && (
                                        <>
                                        Teacher Code: {
                                            l4.teacher.teacherCode
                                        }
                                        </>
                                    )
                                 }
                                 <br />
                                 {
                                    l4.course && l4.course.code && l4.course.name && (
                                        <>
                                        {l4.course.code} - {l4.course.name}</>
                                    )
                                 }
                                Room: {l4.room}
                              </td>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Col>
          <Col md={5}>
            <TeacherDashboard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateRoutine;
