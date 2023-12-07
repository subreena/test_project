import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Course = () => {
  const courseApi =
    "https://ice-web-nine.vercel.app/courseDetails";
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(courseApi)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <h1 className="text-center m-5">Course Details</h1>

      <Container fluid>
      <div className="row">
        
            {courses.map((c) => (
                <div className="col-4" key={c.id}>
                 <Card style={{ width: "100%", height:"250px", padding: "10px", margin: "20px 10px" }}>
                <Card.Header> <strong>Course Name: </strong> {c.name}</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item> <strong>Course Code: </strong> {c.code}</ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Year: </strong> {c.year} <strong>Term: </strong> {c.term}
                  </ListGroup.Item>
                  <ListGroup.Item> <strong>Credit: </strong> {c.credit}</ListGroup.Item>
                  <ListGroup.Item> <strong>Type:</strong> {c.type}</ListGroup.Item>
                </ListGroup>
              </Card>
              
        </div>
            ))}
         
      </div>
      </Container>
    </div>
  );
};

export default Course;
