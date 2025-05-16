import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import CourseCenteredModal from "../Modal/CourseCenteredModal";
// import "./EditCourses.css";
import { Link } from "react-scroll";
import StaticBackdropModal from "../Modal/StaticBackdropModal";
import ClassroomCenteredModal from "../Modal/ClassroomCenteredModal";

const EditClassroom = () => {
  const [error, setError] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleted, setDeleted] = useState(0);

  // Fetch classrooms from the API
  useEffect(() => {
    fetchClassrooms();
  }, []);

    const organizeClassroom = (unformattedClassroom) => {
        const result = [];

        // Handle theory classrooms
        if (Array.isArray(unformattedClassroom.theory)) {
            unformattedClassroom.theory.forEach(no => {
                result.push({ no: no, type: "theory" });
            });
        }

        // Handle lab classrooms
        if (unformattedClassroom.lab && typeof unformattedClassroom.lab === 'object') {
            Object.entries(unformattedClassroom.lab).forEach(([labType, rooms]) => {
                rooms.forEach(no => {
                    result.push({ no: no, type: `${labType} lab` });
                });
            });
        }

        console.log(result);

        return result;
    };


  const fetchClassrooms = async () => {
    fetch("http://localhost:5000/room")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setError("");
          console.log(data.data);

          setClassrooms(organizeClassroom(data.data[0]));
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Internal Server Error");
      });
  };

  const [modalAddCourse, setModalAddCourse] = useState(false);

  const handleUpdate = () => {
    // Refresh classroom list logic here
    fetchClassrooms();
  };

  const handleAddCourse = () => {
    setModalAddCourse(true);
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

  const handleDelete = async (classNoToDelete, index) => {
    setId(classNoToDelete);
    setSelectedFullName(classNoToDelete);
    setDeleteLoading(index);
    handleStaticModalShow();
  };

  useEffect(() => {
    const callDeleteMethod = async() => {
      try {
        const response = await fetch(
          `http://localhost:5000/room/delete/${id}`,
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
          fetchClassrooms();
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error("Error creating manage classroom:", error);
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

      <ClassroomCenteredModal
        show={modalAddCourse}
        onHide={() => setModalAddCourse(false)}
        onUpdate={handleUpdate}
      />

      <div>
        <div className="d-flex justify-content-center">
          <h2 style={{ marginLeft: "120px" }}>Classroom Dashboard</h2>
          <strong>
            <Link
              style={{ cursor: "pointer" }}
              onClick={handleAddCourse}
              className="p-2"
            >
              Add Classroom
            </Link>
          </strong>
        </div>

        <hr />
        
        <div className="mb-3 text-center">
          {classrooms ? (
            <Table striped responsive className="table-responsive">
              <thead className="thead-sticky">
                <tr>
                  <th>
                    <p>#</p>
                  </th>
                  <th>
                    <p>Room Number</p>
                  </th>
                  <th>
                    <p>Type</p>
                  </th>
                  <th>
                    <p>Remove</p>
                  </th>
                </tr>
              </thead>
              <tbody className="table-scroll">
                {classrooms.map((classroom, id) => (
                  <tr style={{ border: "none" }} key={id}>
                    <td style={{ border: "none" }}> {id + 1} </td>
                    <td style={{ border: "none" }}> {classroom.no} </td>
                    <td style={{ border: "none", textTransform: "uppercase" }}> {classroom.type} </td>
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
                          onClick={() => handleDelete(classroom.no, id)}
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

export default EditClassroom;
