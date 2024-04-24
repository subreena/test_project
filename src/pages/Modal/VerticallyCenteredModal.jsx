import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const VerticallyCenteredModal = (props) => {
  const [error, setError] = useState(null);
  const { id, serviceName } = props;

  console.log(props);

  const getServiceName = () => {
    let apiName = "";
    if(serviceName === "Theory Class Routine") {
      apiName = "classRoutine";
    } else if(serviceName === "Theory Duty Roaster") {
      apiName = "theoryDutyRoaster";
    } else if(serviceName === "Theory Exam Committee") {
      apiName = "theoryExamCommittee";
    } else if(serviceName === "Lab Exam Committee") {
      apiName = "labExamCommittee";
    } else if(serviceName === "Theory Exam Routine") {
      apiName = "theoryExamRoutine";
    } else if(serviceName === "Course Distribution"){
      apiName = "courseDistribution";
    } else {
      console.error("There is an error in your selected service!");
    }
    return apiName;
  }

  const handleDefault = () => {
    fetch(`https://ice-web-nine.vercel.app/serviceId/update/${getServiceName()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok!');
      }
      return response.json();
    })
    .then(data => {
      if(data.success) {
        console.log(data);
      } else {
        setError(data.error);
      }
    })
    .catch(error => {
      setError('There was a problem with your fetch operation');
      console.log(error);
    });

    props.onHide();
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {serviceName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Do you like to make it <b>default current {serviceName}</b>? <br />
          By doing so, this {serviceName} will be shown by default!
        </p>
      </Modal.Body>
      <Modal.Footer>
        { serviceName !== "Course Distribution" && <Button variant="success" onClick={handleDefault}>Make it Default</Button> }
      </Modal.Footer>
    </Modal>
  );
}

export default VerticallyCenteredModal;