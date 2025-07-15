import React, { useState, useEffect } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import "../EditCourses/EditCourses.css";
import { Link } from "react-scroll";
import CustomDropdown from "../ser3/CustomDropdown";
import ExternalTeacherCenteredModal from "../Modal/ExternalTeacherCenteredModal";
import StaticBackdropModal from "../../pages/Modal/StaticBackdropModal";

const ExternalTeacherDashboard = () => {
  const [error, setError] = useState("");
  const [externalTeachers, setExternalTeachers] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [deleted, setDeleted] = useState(0);

  // Fetch externalTeachers from the API
  useEffect(() => {
    fetchExternalTeachers();
  }, []);

  const fetchExternalTeachers = async () => {
    fetch("https://teachercopilot.vercel.app/teachers")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setError("");
          console.log(data.data);
          setExternalTeachers(data.data);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Internal Server Error");
      });
  };

  const [externalTeacherDetails, setExternalTeacherDetails] = useState(null);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [modalAddExternalTeacher, setModalAddExternalTeacher] = useState(false);

  const handleEdit = (externalTeacher) => {
    setModalEditShow(true);
    setExternalTeacherDetails(externalTeacher);
  };

  const handleUpdate = () => {
    // Refresh externalTeacher list logic here
    fetchExternalTeachers();
  };

  const handleAddExternalTeacher = () => {
    setModalAddExternalTeacher(true);
  };

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [filteredExternalTeachers, setFilteredExternalTeachers] = useState([]);

  const handleSearch = () => {
    const filtered = externalTeachers.filter((externalTeacher) => {
      return (
        (externalTeacher.department !== "ICE, NSTU") &&
        (selectedTeacher ? externalTeacher.firstName + " " + externalTeacher.lastName == selectedTeacher : true)
      );
    });

    setFilteredExternalTeachers(filtered);

    if(teachersName.length === 0)
      setTeachersName(builtTeachersNameArray(filtered));
  };

  useEffect(() => {
    handleSearch();
  }, [selectedTeacher, externalTeachers])

  const [teachersName, setTeachersName] = useState([]);

  const builtTeachersNameArray = teachers => {
    return teachers.map(teacher => teacher.firstName + ' ' + teacher.lastName);
  }
  
  const handleSelectChange = (value) => {
    setSelectedTeacher(value);
  };

  const toShowCourses = (courses) => {
    return courses.map(course => course.value).join(", ");
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
          `https://teachercopilot.vercel.app/teachers/deleteExternalTeacher/${id}`,
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
          fetchExternalTeachers();
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error("Error creating manage externalTeacher:", error);
      } finally {
        setDeleteLoading(null);
      }
    }
    
    if(readyToDelete) {
      callDeleteMethod();
      setReadyToDelete(false);
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

      <ExternalTeacherCenteredModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        mode="edit"
        externalTeacher={externalTeacherDetails}
        onUpdate={handleUpdate}
      />

      <ExternalTeacherCenteredModal
        show={modalAddExternalTeacher}
        onHide={() => setModalAddExternalTeacher(false)}
        mode="add"
        onUpdate={handleUpdate}
      />

      <div>
        <div className="d-flex justify-content-center">
          <h2 style={{ marginLeft: "120px" }}>External Teacher Dashboard</h2>
          <strong>
            <Link
              style={{ cursor: "pointer" }}
              onClick={handleAddExternalTeacher}
              className="p-2"
            >
              Add Teacher
            </Link>
          </strong>
        </div>
        <hr />

        <CustomDropdown
          coursesName={teachersName}
          selectedCourse={selectedTeacher}
          handleSelectChange={handleSelectChange}
          title="Teacher"
        />

        <br />
        <div className="mb-3 text-center">
          {filteredExternalTeachers ? (
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
                    <p>Teacher Code</p>
                  </th>
                  <th>
                    <p>Courses</p>
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
                {filteredExternalTeachers.map((externalTeacher, id) => (
                  <tr style={{ border: "none" }} key={id}>
                    <td style={{ border: "none" }}> {id + 1} </td>
                    <td style={{ border: "none" }}> {externalTeacher.firstName + " " + externalTeacher.lastName} </td>
                    <td style={{ border: "none" }}> {externalTeacher.teacherCode} </td>
                    <td style={{ border: "none" }}> {toShowCourses(externalTeacher.courses)} </td>
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
                          onClick={() => handleDelete(externalTeacher._id, id, `${externalTeacher.firstName} ${externalTeacher.lastName}`)}
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
                        onClick={() => handleEdit(externalTeacher)}
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

export default ExternalTeacherDashboard;
