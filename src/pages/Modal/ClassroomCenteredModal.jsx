import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";

const ClassroomCenteredModal = (props) => {
  const { onHide, onUpdate } = props;

  const [classroomNo, setClassroomNo] = useState("");
  const [type, setType] = useState("theory");

  const [error, setError] = useState("");

  const handleAdd = async (classroomData) => {
    try {
      const response = await fetch("http://localhost:5000/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classroomData),
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
      console.error("Error adding classroom:", err);
      setError("Internal Server Error");
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const classroomData = {
      no: classroomNo,
      type
    };

    if(classroomNo === "") {
      setError("Classroom No field is empty!");
    } else {
      handleAdd(classroomData);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="classroomNo">
            <Form.Label>Classroom No</Form.Label>
            <Form.Control
              type="text"
              value={classroomNo}
              onChange={(e) => setClassroomNo(e.target.value)}
            />
          </Form.Group>

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
              Add Course
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClassroomCenteredModal;
