import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import CourseCenteredModal from "../Modal/CourseCenteredModal";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import "./EditCourses.css";
import { Link } from "react-scroll";
import StaticBackdropModal from "../Modal/StaticBackdropModal";

const EditCourses = () => {
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleted, setDeleted] = useState(0);

  // Fetch courses from the API
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [courses])

  const fetchCourses = async () => {
    fetch("http://localhost:5000/courseDetails")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setError("");
          console.log(data.data);
          setCourses(data.data);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Internal Server Error");
      });
  };

  const [courseDetails, setCourseDetails] = useState(null);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalAddCourse, setModalAddCourse] = useState(false);

  const handleEdit = (course) => {
    setModalEditShow(true);
    setCourseDetails(course);
  };

  const handleUpdate = () => {
    // Refresh course list logic here
    fetchCourses();
  };

  const handleAddCourse = () => {
    setModalAddCourse(true);
  };

  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const handleSearch = () => {
    console.log("search");

    const filtered = courses.filter((course) => {
      return (
        (year ? course.year === Number(year) : true) &&
        (term ? course.term === Number(term) : true)
      );
    });
    setFilteredCourses(filtered);
  };

  const [readyToDelete, setReadyToDelete] = useState(false);
  const [staticShow, setStaticShow] = useState(false);

  const handleStaticModalClose = () => {
    setStaticShow(false);
    setReadyToDelete(false);
    setDeleteLoading(false);
  }
  const handleStaticModalShow = () => setStaticShow(true);
  const handleReadyToDelete = () => {
    setReadyToDelete(true);
    setStaticShow(false);
  }

  const [id, setId] = useState(null);

  const handleDelete = async (id, index, fullName) => {
    setId(id);
    setSelectedFullName(fullName);
    setDeleteLoading(index);
    handleStaticModalShow();
  };

  useEffect(() => {
    const callDeleteMethod = async() => {
      try {
        const response = await fetch(
          `http://localhost:5000/courseDetails/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          // Handle non-successful response here
          console.log("Response is not OK:", response);
        }
  
        const data = await response.json();
  
        if (data.success) {
          setError("");
          setDeleted(deleted ^ 1);
          fetchCourses();
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error("Error creating manage course:", error);
      } finally {
        setDeleteLoading(null);
      }
    }

    if(readyToDelete) {
      callDeleteMethod();
    } else {
      setDeleteLoading(null);
    }
  }, [readyToDelete])

  const [selectedFullName, setSelectedFullName] = useState("");

  return (
    <Container>
      <StaticBackdropModal
        show={staticShow}
        onHide={handleStaticModalClose}
        onAccept={handleReadyToDelete}
        title={`Remove External Teacher: ${selectedFullName}`}
        description={
          <>
            Are you sure you want to remove <b>{selectedFullName}</b> from the external teacher dashboard? 
            By doing so, <b>{selectedFullName}</b>'s data set will be permanently erased!
          </>
        }
        buttonName={"Remove"}
        buttonVariant={'danger'}
      />
      <CourseCenteredModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        mode="edit"
        course={courseDetails}
        onUpdate={handleUpdate}
      />

      <CourseCenteredModal
        show={modalAddCourse}
        onHide={() => setModalAddCourse(false)}
        mode="add"
        onUpdate={handleUpdate}
      />

      <div>
        <div className="d-flex justify-content-center">
          <h2 style={{ marginLeft: "120px" }}>Course Dashboard</h2>
          <strong>
            <Link
              style={{ cursor: "pointer" }}
              onClick={handleAddCourse}
              className="p-2"
            >
              Add Course
            </Link>
          </strong>
        </div>
        <hr />

        <Form className="mx-5">
          <Row className="mb-3 mx-5 align-items-center">
            <Col>
              <Form.Group controlId="year">
                <b>
                  <Form.Label>Year</Form.Label>
                </b>
                <Form.Select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  <option value="">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="term">
                <b>
                  <Form.Label>Term</Form.Label>
                </b>
                <Form.Select
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                >
                  <option value="">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex justify-content-end mt-4">
              <Button className="exclusive-button" onClick={handleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <br />
        <div className="mb-3 text-center">
          {filteredCourses ? (
            <Table striped responsive className="table-responsive">
              <thead className="thead-sticky">
                <tr>
                  <th>
                    <p>#</p>
                  </th>
                  <th>
                    <p>Name</p>
                  </th>
                  <th>
                    <p>Code</p>
                  </th>
                  <th>
                    <p>Year</p>
                  </th>
                  <th>
                    <p>Term</p>
                  </th>
                  <th>
                    <p>Credit</p>
                  </th>
                  <th>
                    <p>Remove</p>
                  </th>
                  <th>
                    <p>Edit</p>
                  </th>
                </tr>
              </thead>
              <tbody className="table-scroll">
                {filteredCourses.map((course, id) => (
                  <tr style={{ border: "none" }} key={id}>
                    <td style={{ border: "none" }}> {id + 1} </td>
                    <td style={{ border: "none" }}> {course.name} </td>
                    <td style={{ border: "none" }}> {course.code} </td>
                    <td style={{ border: "none" }}> {course.year} </td>
                    <td style={{ border: "none" }}> {course.term} </td>
                    <td style={{ border: "none" }}> {course.credit} </td>
                    <td style={{ border: "none" }}>
                      {deleteLoading === id ? (
                        <Spinner
                          animation="border"
                          role="status"
                          variant="danger"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(course._id, id, course.name)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-x-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                          </svg>
                        </button>
                      )}
                    </td>
                    <td style={{ border: "none" }}>
                      <button
                        className="btn btn-info"
                        onClick={() => handleEdit(course)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default EditCourses;
