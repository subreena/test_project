import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import RoutineTable from "./RoutineTable";

const TeacherWiseRoutine = () => {
  const [teachersName, setTeachersName] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [yearTerms, setYearTerms] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const { routine: propsRoutine, yearTerms: propsYearTerms } = location.state || {};

    setRoutine(propsRoutine);
    setYearTerms(propsYearTerms);
  }, []);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedTeacher(selectedOption);
  };

  return (
    <>
      <Container fluid>
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Form.Group controlId="teacherSelect">
              <Form.Label>Select or Search Teacher</Form.Label>
              <Form.Control
                as="select"
                onChange={handleSelectChange}
                value={selectedTeacher || ""}
              >
                <option value={null}>All Teacher...</option>
                {teachersName.map((teacher, index) => (
                  <option key={index} value={teacher}>
                    {teacher}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Container>

      <RoutineTable routineProps={routine} yearTermProps={yearTerms}/>
    </>
  );
};

export default TeacherWiseRoutine;
