import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { useLocation} from "react-router-dom";

const ExamControlTeacherWise = () => {
  const [teacherCourses, setTeacherCourses] = useState(null);
  const [teachersName, setTeachersName] = useState([]);
  const [teacherWiseCourses, setTeacherWiseCourses] = useState([]);
  const location = useLocation();

  const getObjectKeysAsArray = (obj) => {
    return Object.keys(obj).map((key) => key);
  };

  useEffect(() => {
    const { teacherCourses: locationTeacherCourses } = location.state || {};

    console.log(locationTeacherCourses);

    setTeacherCourses(locationTeacherCourses);
    setTeachersName(getObjectKeysAsArray(locationTeacherCourses));
    setTeacherWiseCourses(Object.values(locationTeacherCourses));

    console.log(Object.values(locationTeacherCourses));
  }, []);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    console.log(filteredCourses);
  }, [filteredCourses]);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedTeacher(selectedOption);
    const filterCourses = selectedOption ? teacherCourses[selectedOption] : [];
    setFilteredCourses(filterCourses);

    console.log(filterCourses, teacherCourses[selectedOption]);
  };

  return (
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
              <option value="">All Teacher...</option>
              {teachersName.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      
      {selectedTeacher && <Row className="d-flex justify-content-center mb-5">
        <Col md={6}>
            <p>
              Search result for <b>{selectedTeacher}</b>:
            </p>
            <Table striped border hover style={{ border: "1px solid grey" }}>
              <caption className="text-center">{selectedTeacher}</caption>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index2) => (
                  <tr key={index2}>
                    <td>{`${course.courseCode}: ${course.courseName}`}</td>
                    <td>{course.remark}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </Col>
      </Row>}

      {!selectedTeacher && <section>
        <h4 className="text-center exam-header">
          Courses of all corresponding teachers
        </h4>
        <Row xs={1} sm={2} md={2} lg={2} xl={2} xxl={3}>
          {teacherWiseCourses.map((courses, index1) => (
            <Col key={index1}>
              <Table striped border hover style={{ border: "1px solid grey" }} className="text-small">
                <caption className="text-center text-small2">
                  {teachersName[index1]}
                </caption>
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index2) => (
                    <tr key={index2}>
                      <td>{`${course.courseCode}: ${course.courseName}`}</td>
                      <td>{course.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          ))}
        </Row>
      </section>}
    </Container>
  );
};

export default ExamControlTeacherWise;
