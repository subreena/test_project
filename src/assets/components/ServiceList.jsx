import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import "../../assets/stylesheets/exam-control.css";
import { Button, ListGroup, Spinner, Table } from "react-bootstrap";
import VerticallyCenteredModal from "../../pages/Modal/VerticallyCenteredModal";
import StaticBackdropModal from "../../pages/Modal/StaticBackdropModal";

const ServiceList = (props) => {
  const { serviceName, serviceData, onDelete } = props;
  const [defaultLoading, setDefaultLoading] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState("");
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


  const handleMakeItDefault = async (service, index) => {
    setDefaultLoading(index);
    setServiceId(service._id);
    setModalShow(true);
  };

  useEffect(() => {
    if(!modalShow) {
      setDefaultLoading(null);
    }
  }, [modalShow])

  const getShowApi = (name) => {
    let apiName = "";
    if (name === "Theory Class Routine") {
      apiName = "routine/permanent";
    } else if (name === "Course Distribution") {
      apiName = "course-distribution/permanent";
    } else if (name === "Theory Duty Roaster") {
      apiName = "theory-duty-roaster/permanent";
    } else if (name === "Theory Exam Committee") {
      apiName = "exam-control/permanent";
    } else if (name === "Lab Exam Committee") {
      apiName = "";
    } else if (name === "Theory Exam Routine") {
      apiName = "theory-exam-routine/permanent";
    } else {
      console.error("There is an error in your selected service!");
    }

    return apiName;
  };

  const handleShow = (service) => {
    console.log(service);
    let _id = service._id;
    const showApi = getShowApi(serviceName);

    const url = `/${showApi}/${_id}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month}, ${year}`;
    return formattedDate;
  };

  const getTime = (timestamp) => {
    const dateTime = new Date(timestamp);
    return dateTime.toLocaleTimeString();
  };

  const getApiString = (serviceName) => {
    let apiString = "";
    if(serviceName === "Course Distribution") {
      apiString = "CourseDistributionManagemen";
    } else if(serviceName === "Theory Class Routine") {
      apiString = "classRoutineManagement";
    } else if(serviceName === "Theory Exam Routine") {
      apiString = "TheoryExamRoutineManagement";
    } else if(serviceName === "Theory Duty Roaster") {
      apiString = "TheoryDutyRoasterManagement";
    } else if(serviceName === "Theory Exam Committee") {
      apiString = "TheoryExamCommitteeManagement";
    } else {
      console.error("There is an error in getApiString() method!!!");
    }

    return apiString;
  }

  const handleDelete = async (id, index) => {
    setServiceId(id);
    setDeleteLoading(index);
    handleStaticModalShow();
  };

  useEffect(() => {
    const callDeleteMethod = async () => {
      try {
        const response = await fetch(
          `https://ice-web-nine.vercel.app/${getApiString(serviceName)}/delete/${serviceId}`,
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
          // console.log("Data received");
          setError(data.message);
          onDelete();
        } else {
          setError(data.error);
        }
      } catch (error) {
        console.error("Error creating manage service:", error);
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

  return (
    <>
      <StaticBackdropModal
        show={staticShow}
        onHide={handleStaticModalClose}
        onAccept={handleReadyToDelete}
        title={`Delete ${serviceName}`}
        description={`Are you sure, you want to delete this data set? By doing so this data set will be permanently erased!`}
        buttonName={"Delete"}
        buttonVariant={'danger'}
      />
      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        serviceName={serviceName}
        id={serviceId}
      />

      <Table striped responsive hover>
        <thead>
          <tr>
            <th>
              <p>#</p>
            </th>
            <th>
              <p>Entry Date</p>
            </th>
            <th>
              <p>Entry Time</p>
            </th>
            <th>
              <p>Year</p>
            </th>
            <th>
              <p>Semester</p>
            </th>
            <th>
              <p className="text-success">Make Default</p>
            </th>
            {/* <th>
              <p className="text-danger">Delete</p>
            </th> */}
            <th>
              <p className="text-info">View</p>
            </th>
          </tr>
        </thead>
        {serviceData?.map((service, index) => (
          <tr style={{ border: "none" }} key={index}>
            <td style={{ border: "none" }}> {index + 1} </td>
            <td style={{ border: "none" }}>{getDate(service?.createdAt)}</td>
            <td style={{ border: "none" }}>{getTime(service?.createdAt)}</td>
            <td style={{ border: "none" }}>{service?.year}{service?.examYear}</td>
            <td style={{ border: "none" }}>{service?.semester}</td>
            <td style={{ border: "none" }}>
              {defaultLoading === index ? (
                <Spinner animation="border" role="status" variant="success">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <p
                  className="btn btn-success"
                  onClick={() => handleMakeItDefault(service, index)}
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
                </p>
              )}
            </td>
            {/* <td style={{ border: "none" }}>
              {deleteLoading === index ? (
                <Spinner animation="border" role="status" variant="danger">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <p
                  className="btn btn-danger"
                  onClick={() => handleDelete(service.id, index)}
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
                </p>
              )}
            </td> */}
            <td style={{ border: "none" }}>
              <p className="btn btn-info" onClick={() => handleShow(service)}>
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
        ))}
      </Table>
    </>
  );
};

export default ServiceList;
