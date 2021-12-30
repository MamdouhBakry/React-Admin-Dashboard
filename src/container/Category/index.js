import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  addCategory,
  updateCategories,
} from "../../actions/category.action";
import Header from "../../components/Header";
import Layout from "../../components/Layout/index,";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal/index";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

export default function Category() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCtegoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleCategoryImage = (e) => {
    setCtegoryImage(e.target.files[0]);
  };
  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
  const renderAddCategoryModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
      >
        <Input
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Slect Category</option>
          {createCategoryList(category.categories).map((category) => {
            return (
              <option value={category.value} key={category.value}>
                {category.name}
              </option>
            );
          })}
        </select>
        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>
    );
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  const renderUpdateCategoriesModal = () => {
    return (
      <Modal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
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
                    {createCategoryList(category.categories).map((category) => {
                      return (
                        <option value={category.value} key={category.value}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
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
                    {createCategoryList(category.categories).map((category) => {
                      return (
                        <option value={category.value} key={category.value}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
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
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Layout />
          <Col md={10} style={{ marginLeft: "auto", marginTop: "4rem" }}>
            <Row>
              <Col md={12}>
                <div className="d-flex justify-content-between">
                  <h3>Category</h3>
                  <button className="btn btn-primary" onClick={handleShow}>
                    add
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {/* <ul>{renderCategories(category.categories)}</ul> */}
                <CheckboxTree
                  nodes={renderCategories(category.categories)}
                  checked={checked}
                  expanded={expanded}
                  onCheck={(checked) => setChecked(checked)}
                  onExpand={(expanded) => setExpanded(expanded)}
                  icons={{
                    check: <IoIosCheckbox />,
                    uncheck: <IoIosCheckboxOutline />,
                    halfCheck: <IoIosCheckboxOutline />,
                    expandClose: <IoIosArrowForward />,
                    expandOpen: <IoIosArrowDown />,
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <button className="btn btn-warning me-5 px-3">Delete</button>
                <button
                  onClick={() => updateCategory()}
                  className="btn btn-success me-5 px-4"
                >
                  Edit
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {/* Add Category */}
      {renderAddCategoryModal()}
      {/* Edit Categories */}
      {renderUpdateCategoriesModal()}
    </>
  );
}
