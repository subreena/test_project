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
      <table>
      <thead>
    <tr>
      <th>Day</th>
      <th>Term,Year</th>
      <th>9:00-9:45</th>
      <th>9:50-10:35</th>
      <th>10:40-11:25</th>
      <th>11:30-12:15PM</th>
      <th>12:15-1:00PM</th>
      <th>1:00-2:00PM</th>
      <th>2:00-2:50PM</th>
      <th>2:55-3:45PM</th>
    </tr>
  </thead>
  
 <tbody>
 {random.map((l1, i1) => (
    <tr key={i1}>
      {l1.map((l2, i2) => (
        <td key={i2}>
          {l2.map((l3, i3) => (
            <td key={i3}>
              {l3.map((l4, i4) => (
                <tr key={i4}>
                  {l4.isAllocated && (
                    <>
                      <td>
                      {l4.year} {l4.term}
                      </td>
                      <br />
                      {l4.teacher && l4.teacher.teacherCode && (
                        <>Teacher Code: {l4.teacher.teacherCode}</>
                      )}
                      <br />
                      {l4.course && l4.course.code && l4.course.name && (
                        <>
                          {l4.course.code}</>
                      )}
                      <br />
                      Room: {l4.room}
                    </>
                  )}
                </tr>
              ))}
            </td>
          ))}
        </td>
      ))}
    </tr>
  ))}
 </tbody>
</table>
          
        
      </Container>
    </div>
  );
};

export default CreateRoutine;
