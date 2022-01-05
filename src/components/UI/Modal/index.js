import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

export default function NewModal(props) {
  return (
    <>
      <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          {props.buttons ? (
            props.buttons.map((btn, index) => {
              return (
                <Button key={index} variant={btn.color} onClick={btn.onClick}>
                  {btn.label}
                </Button>
              );
            })
          ) : (
            <Button
              variant="primary"
              className="btn-sm"
              onClick={props.onSubmit}
              style={{ backgroundColor: "#333" }}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
