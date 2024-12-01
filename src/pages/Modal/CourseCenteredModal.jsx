import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

const CenteredModal = (props) => {
  const [error, setError] = useState(null);
  const { course } = props;

  console.log(course);

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credit, setCredit] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setCourseName(course?.name);
    setCourseCode(course?.code);
    setCredit(course?.credit);
    setYear(course?.year);
    setTerm(course?.term);
    setType(course?.type);
  }, [course]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseData = {
      name: courseName,
      code: courseCode,
      credit: credit,
      year: year,
      term: term,
      type: type,
    };

    console.log(courseData);

    // Make an update request (replace with your API endpoint)
    // try {
    //   const response = await fetch('https://your-api-endpoint/courses/update', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(courseData),
    //   });
    //   if (response.ok) {
    //     console.log('Course updated successfully');
    //   } else {
    //     console.error('Failed to update course');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update the {course?.code} course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="courseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="courseCode">
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="credit">
            <Form.Label>Credit</Form.Label>
            <Form.Control
              type="number"
              value={credit}
              onChange={(e) => setCredit(Number(e.target.value))}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="term">
                <Form.Label>Term</Form.Label>
                <Form.Select
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="theory">Theory</option>
              <option value="computer lab">Computer Lab</option>
              <option value="electrical lab">Electrical Lab</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Update Course
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CenteredModal;
