import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import VerticallyCenteredModal from "../Modal/VerticallyCenteredModal";

const SuperAdmin = () => {
  const [deleted, setDeleted] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [postLoading, setPostLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleDeleteAll = async () => {
    try {
      const response = await fetch(
        "https://ice-web-nine.vercel.app/pendingService/deleteAll",
        {
          method: "DELETE", // Use the DELETE method since you are deleting all documents
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json(); // Parse the response JSON

      console.log(data); // Log the response from the server

      // Handle success or failure based on the response data
      if (data.success) {
        // Handle success, if needed
        setDeleted(deleted ^ 1);
      } else {
        // Handle failure, if needed
      }
    } catch (error) {
      console.error("Error occurred while deleting documents:", error);
      // Handle error, if needed
    }
  };

  const [error, setError] = useState("");
  const [services, setServices] = useState(null);

  useEffect(() => {
    fetch("https://ice-web-nine.vercel.app/pendingService")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setError("");
          data.result.reverse();
          setServices(data.result);
        } else {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Internal Server Error");
      });
  }, [deleted]);

  // useEffect(() => {
  //   console.log(services);
  // }, [services]);

  const getApiString = (name) => {
    let apiName;
    if (name === "Theory Class Routine") {
      apiName = "classRoutineManagement";
    } else if (name === "Course Distribution") {
      apiName = "CourseDistributionManagement";
    } else if (name === "Theory Duty Roaster") {
      apiName = "TheoryDutyRoasterManagement";
    } else if (name === "Theory Exam Committee") {
      apiName = "TheoryExamCommitteeManagement";
    } else if (name === "Lab Exam Committee") {
      apiName = "";
    } else if (name === "Theory Exam Routine") {
      apiName = "TheoryExamRoutineManagement";
    } else {
      console.error("There is an error in your selected service!");
    }

    return apiName;
  };

  const handlePost = async (service, index) => {
    setPostLoading(index);
    const id = service.id;
    console.log(service);

    setServiceName(service.serviceName);
    const apiString = getApiString(service.serviceName);
    console.log(apiString);

    try {
      const response = await fetch(
        `https://ice-web-nine.vercel.app/${apiString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        // Handle non-successful response here
        console.log("Response is not OK:", response);
      }

      const data = await response.json();

      if (data.success) {
        console.log("Data received:", data.data);
        setServiceId(data.data._id);
        setError("");
        setModalShow(true);

        handleDelete(service.id, index);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error creating manage service:", error);
    } finally {
      setPostLoading(null);
    }
  };

  const handleDelete = async (id, index) => {
    setDeleteLoading(index);
    try {
      const response = await fetch(
        `https://ice-web-nine.vercel.app/pendingService/deleteObject/${id}/PendingService`,
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
      console.error("Error creating manage service:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const getShowApi = (name) => {
    let apiName = "";
    if (name === "Theory Class Routine") {
      apiName = "routine/temporary";
    } else if (name === "Course Distribution") {
      apiName = "course-distribution/temporary";
    } else if (name === "Theory Duty Roaster") {
      apiName = "theory-duty-roaster/temporary";
    } else if (name === "Theory Exam Committee") {
      apiName = "exam-control/temporary";
    } else if (name === "Lab Exam Committee") {
      apiName = "";
    } else if (name === "Theory Exam Routine") {
      apiName = "theory-exam-routine/temporary";
    } else {
      console.error("There is an error in your selected service!");
    }

    return apiName;
  };

  const handleShow = (service) => {
    const id = service.id;
    const showApi = getShowApi(service.serviceName);

    const url = `/${showApi}/${id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Extract day, month, year, hours, minutes, and seconds
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Concatenate date and time components in the desired format
    const formattedDateTime = `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  };

  return (
    <Container>
      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        serviceName={serviceName}
        id={serviceId}
      />
      <div>
        <div>
          <h2 className="text-center">Pending Requests</h2>
          <hr />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={handleDeleteAll}>
            Delete All
          </button>
        </div>

        <br />
        <div className="m-auto text-center">
          {services ? (
            <Table striped responsive hover>
              <thead>
                <tr>
                  <th>
                    <p>#</p>
                  </th>
                  <th>
                    <p>Sending Time</p>
                  </th>
                  <th>
                    <p>Sender</p>
                  </th>
                  <th>
                    <p>Name</p>
                  </th>
                  <th>
                    <p className="text-success">Accept</p>
                  </th>
                  <th>
                    <p className="text-danger">Reject</p>
                  </th>
                  <th>
                    <p className="text-info">View</p>
                  </th>
                </tr>
              </thead>
              {services.map((service, id) => (
                <tr style={{ border: "none" }} key={id}>
                  <td style={{ border: "none" }}> {id + 1} </td>
                  <td style={{ border: "none" }}>
                    {" "}
                    {formatDateTime(service.createdAt)}{" "}
                  </td>
                  <td style={{ border: "none" }}> {service.senderName} </td>
                  <td style={{ border: "none" }}> {service.serviceName} </td>
                  <td style={{ border: "none" }}>
                    {postLoading === id ? (
                      <Spinner
                        animation="border"
                        role="status"
                        variant="success"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => handlePost(service, id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-check-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                          <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                        </svg>
                      </button>
                    )}
                  </td>
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
                        onClick={() => handleDelete(service.id, id)}
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
                      onClick={() => handleShow(service)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
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

export default SuperAdmin;
