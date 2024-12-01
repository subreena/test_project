import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import CourseCenteredModal from "../Modal/CourseCenteredModal";

const EditCourses = () => {
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch courses from the API
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    fetch("http://localhost:5000/courseDetails")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setError("");
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

  const handleDelete = async (id, index) => {
    setDeleteLoading(index);
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
        console.log("Data received:", data.data);
        setError("");
        setDeleted(deleted ^ 1);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error creating manage course:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleAdd = async() => {

  };

  const [modalEditShow, setModalEditShow] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);

  const handleEdit = async(course) => {
    setModalEditShow(true);
    setCourseDetails(course);
  };

  return (
    <Container>
      <CourseCenteredModal
      show={modalEditShow}
      onHide={() => setModalEditShow(false)}
      course={courseDetails}
      />
      <div>
        <div>
          <h2 className="text-center">Edit Courses</h2>
          <hr />
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-success" onClick={handleAdd}>
            Add Course
          </button>
        </div>

        <br />
        <div className="m-auto text-center">
          {courses ? (
            <Table striped responsive hover>
              <thead>
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
                    <p className="text-danger">Remove</p>
                  </th>
                  <th>
                    <p className="text-info">Edit</p>
                  </th>
                </tr>
              </thead>
              {courses.map((course, id) => (
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
                        onClick={() => handleDelete(course.id, id)}
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
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
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
