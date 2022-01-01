import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
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
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import UpdateCategoriesModal from "./components/UpdateCategoriesModat";
import AddCategoryModal from "./components/AddCategoryModal";

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
  const [deleteCategoyModal, setDeleteCategoryModal] = useState(false);

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
        type: category.type,
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
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
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

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };
  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray));
    }
    setDeleteCategoryModal(false);
  };
  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        show={deleteCategoyModal}
        handleClose={() => setDeleteCategoryModal(false)}
        modalTitle={"Confirm"}
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
  const categoryList = createCategoryList(category.categories);
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
                  <div className="actionBtnContainer">
                    <span>Actions :</span>
                    <button className="btn btn-primary" onClick={handleShow}>
                      <IoIosAdd />
                      add
                    </button>
                    <button
                      onClick={() => deleteCategory()}
                      className="btn btn-warning "
                    >
                      <IoIosTrash /> Delete
                    </button>
                    <button
                      onClick={() => updateCategory()}
                      className="btn btn-success "
                    >
                      <IoIosCloudUpload /> Edit
                    </button>
                  </div>
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
          </Col>
        </Row>
      </Container>
      {/* Add Category */}
      <AddCategoryModal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        handleCategoryImage={handleCategoryImage}
        categoryList={categoryList}
      />
      {/* Edit Categories */}
      <UpdateCategoriesModal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={"Update Categories"}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
        categoryList={categoryList}
      />
      {/* Delete Category */}
      {renderDeleteCategoryModal()}
    </>
  );
}
