import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const VerticallyCenteredModal = (props) => {
  const [error, setError] = useState(null);

  console.log(props);

  const handleDefault = () => {
    fetch(`http://localhost:5000/serviceId/update/classRoutine`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // Add any additional headers if required
      },
      body: JSON.stringify({ id: props.id }) // Convert request data to JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
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
          {props.serviceName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Do you like to make it <b>default current</b> {props.serviceName}? <br />
          By doing so, this {props.serviceName} will be shown by default!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleDefault}>Make it Default</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerticallyCenteredModal;