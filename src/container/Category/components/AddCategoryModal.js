import React from "react";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Col, Row } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <Modal show={show} handleClose={handleClose} modalTitle={modalTitle}>
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            className="form-control mb-2"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Slect Category</option>
            {categoryList.map((category) => {
              return (
                <option value={category.value} key={category.value}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </Col>
      </Row>

      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
