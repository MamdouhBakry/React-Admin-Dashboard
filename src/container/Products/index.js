import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Layout from "../../components/Layout/index,";
import Input from "../../components/UI/Input/index";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.action";
import Modal from "../../components/UI/Modal/index";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
export default function Products() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  //console.log(productPictures);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    //console.log(name, quantity, price, description, productPictures);
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    console.log(form);
    dispatch(addProduct(form));
    setShow(false);
  };

  const renderAddProductModel = () => {
    return (
      <Modal
        modalTitle={"Add New Product "}
        show={show}
        handleClose={handleClose}
      >
        <Input
          label="Name"
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder="Product Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder="Product Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder="Product Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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
        {productPictures.length > 0
          ? productPictures.map((pic, index) => {
              return <div key={index}>{JSON.stringify(pic.name)}</div>;
            })
          : null}
        <input
          type="file"
          name="productPictures"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((prd, index) => {
                return (
                  <tr
                    onClick={() => showProductDetailsModal(prd)}
                    key={prd._id}
                  >
                    <td>{index + 1}</td>
                    <td>{prd.name}</td>
                    <td>{prd.price}</td>
                    <td>{prd.quantity}</td>
                    <td>prd.category.name</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };
  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetailModal(true);
    setProductDetails(product);
  };
  const renderProductDetailsModel = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size={"lg"}
      >
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label>Product Pictures</label>
            <div className="d-flex">
              {productDetails.productPictures.map((picture, index) => {
                return (
                  <div className="productImgContainer" key={index}>
                    <img src={generatePublicUrl(picture.img)} alt="" />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Layout sidebar />
          <Col md={10} style={{ marginLeft: "auto", marginTop: "4rem" }}>
            <Row>
              <Col md={12}>
                <div className="d-flex justify-content-between">
                  <h3>Products</h3>
                  <button className="btn btn-primary" onClick={handleShow}>
                    add
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>{renderProducts()}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {renderAddProductModel()}
      {renderProductDetailsModel()}
    </>
  );
}
