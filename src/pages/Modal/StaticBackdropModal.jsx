import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Example = (props) => {
  const { title, description, buttonName, buttonVariant } = props;

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant={buttonVariant} onClick={props.onAccept}>{buttonName}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
