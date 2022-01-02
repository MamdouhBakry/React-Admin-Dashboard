import React from "react";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { Col, Row } from "react-bootstrap";
const UpdateCategoriesModal = (props) => {
  const {
    show,
    size,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
    onSubmit,
  } = props;

  console.log({ expandedArray, checkedArray });
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      size={size}
      onSubmit={onSubmit}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control mb-2"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
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
              <Col>
                <select
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                  className="form-control"
                >
                  <option>Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}

      <h6>The Checked Categories</h6>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control mb-2"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
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
              <Col>
                <select
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                  className="form-control"
                >
                  <option>Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          );
        })}

      {/* <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        /> */}
    </Modal>
  );
};
export default UpdateCategoriesModal;
