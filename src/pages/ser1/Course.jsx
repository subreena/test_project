import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Course = () => {
  const courseApi = "https://ice-web-nine.vercel.app/courseDetails";
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(courseApi)
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          setCourses(data);
          console.log(data);
          setLoading(false);
          setError('');
        } else {
          setError(data.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  

  return (
   <>
    {
      loading ?
      (<div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
      </div>)
      :
       <div
      style={{
        minHeight: "100vh",
      }}
    >
      <h1 className="text-center mb-3">Course Details</h1>

      <Container fluid>
      <div className="row">
        
            {courses.data.map((c) => (
                <div className="col-lg-4 col-sm-6" key={c.id}>
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
     
    }
   </>
  );
};

export default Course;
