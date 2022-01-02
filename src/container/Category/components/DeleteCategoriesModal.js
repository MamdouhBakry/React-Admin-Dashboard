import React from "react";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Col, Row } from "react-bootstrap";
const DeleteCategoriesModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    deleteCategories,
  } = props;
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      buttons={[
        {
          label: "no",
          color: "primary",
          onClick: () => {
            alert("No");
          },
        },
        {
          label: "yes",
          color: "danger",
          onClick: deleteCategories,
        },
      ]}
    >
      <h5>Expanded</h5>
      {expandedArray.map((item, index) => {
        return <span key={index}>{item.name}</span>;
      })}
      <h5>Checked</h5>
      {checkedArray.map((item, index) => {
        return <span key={index}>{item.name}</span>;
      })}
    </Modal>
  );
};
export default DeleteCategoriesModal;
