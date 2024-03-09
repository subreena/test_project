import { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
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
        "http://localhost:5000/pendingService/deleteAll",
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
    fetch("http://localhost:5000/pendingService")
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
    if(name === "Theory Class Routine") {
      apiName = "classRoutineManagement";
    } else if(name === "Course Distribution") {
      apiName = "courseDistribution";
    } else if(name === "Theory Duty Roaster") {
      apiName = "";
    } else if(name === "Theory Exam Committee") {
      apiName = "";
    } else if(name === "Lab Exam Committee") {
      apiName = "";
    } else if(name === "Theory Exam Routine") {
      apiName = "";
    } else {
      console.error("There is an error in your selected service!");
    }

    return apiName;
  }

  const handlePost = async (service, index) => {
    setPostLoading(index);
    const id = service.id;
    console.log(service);

    setServiceName(service.serviceName);
    const apiString = getApiString(service.serviceName);
    console.log(apiString);

    try {
      const response = await fetch(
        `http://localhost:5000/${apiString}`,
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
        `http://localhost:5000/pendingService/deleteObject/${id}/PendingService`,
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

  const navigate = useNavigate();
  const getShowApi = (name) => {
    let apiName;
    if(name === "Theory Class Routine") {
      apiName = "temporary-routine";
    } else if(name === "Course Distribution") {
      apiName = "temporary-course-distribution";
    } else if(name === "Theory Duty Roaster") {
      apiName = "";
    } else if(name === "Theory Exam Committee") {
      apiName = "";
    } else if(name === "Lab Exam Committee") {
      apiName = "";
    } else if(name === "Theory Exam Routine") {
      apiName = "";
    } else {
      console.error("There is an error in your selected service!");
    }

    return apiName;
  }
  const handleShow = (service) => {
    const id = service.id;
    const showApi = getShowApi(service.serviceName);

    navigate(`/${showApi}/${id}`);
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
          <Table striped responsive borderless hover>
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
            {services ? (
              services.map((service, id) => (
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
                      <p
                        className="btn btn-success"
                        onClick={() => handlePost(service, id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-hand-thumbs-up"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>
                      </p>
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
                      <p
                        className="btn btn-danger"
                        onClick={() => handleDelete(service.id, id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </p>
                    )}
                  </td>
                  <td style={{ border: "none" }}>
                    <p
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
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default SuperAdmin;
