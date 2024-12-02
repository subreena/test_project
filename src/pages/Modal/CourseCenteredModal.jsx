import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

const CenteredModal = (props) => {
  const { course, mode, onHide, onUpdate } = props;

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [credit, setCredit] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [type, setType] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "edit" && course) {
      setCourseName(course.name || "");
      setCourseCode(course.code || "");
      setCredit(course.credit || "");
      setYear(course.year || "");
      setTerm(course.term || "");
      setType(course.type || "");
    } else {
      // Reset fields for adding a new course
      setCourseName("");
      setCourseCode("");
      setCredit("");
      setYear("1");
      setTerm("1");
      setType("theory");
    }
  }, [course, mode]);

  console.log(course);

  const handleEdit = async (updatedCourseData) => {
    try {
      const response = await fetch(`http://localhost:5000/courseDetails/update/${course._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourseData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Display error from backend
        setError(result.error || "An error occurred");
      } else {
        onUpdate(); // Call parent update function
        onHide();   // Close the modal
      }
    } catch (err) {
      console.error("Error updating course:", err);
      setError("Internal Server Error");
    }
  }

  const handleAdd = async (courseData) => {
    try {
      const response = await fetch("http://localhost:5000/courseDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        // Display error from backend
        setError(result.error || "An error occurred");
      } else {
        onUpdate(); // Call parent update function
        onHide();   // Close the modal
      }
    } catch (err) {
      console.error("Error adding course:", err);
      setError("Internal Server Error");
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseData = {
      name: courseName,
      code: courseCode,
      credit,
      year,
      term,
      type,
    };

    if(courseName === "") {
      setError("Course name field is empty!");
    } else if(courseCode === "") {
      setError("Course code field is empty!");
    } else if(credit === "") {
      setError("Credit field is empty!");
    } else {
      // no field error
      if(mode === "edit") {
        handleEdit(courseData);
      } else {
        handleAdd(courseData);
      }
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {mode === "edit" ? `Update ${course?.code}` : "Add New Course"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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

          <Modal.Footer>
            <p className="text-danger text-bold">{error}</p>
            <Button variant="success" type="submit">
              {mode === "edit" ? "Update Course" : "Add Course"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CenteredModal;
