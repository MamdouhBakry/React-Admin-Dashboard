import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout/index,";
import Modal from "../../components/UI/Modal/index";
import Input from "../../components/UI/Input/index";
import { useSelector } from "react-redux";
import linearCategories from "../../helpers/linearCategories";

export default function NewPage() {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const category = useSelector((state) => state.category);

  useEffect(() => {
    console.log("category", category);
    setCategories(linearCategories(category.categories));
  }, [category]);

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };
  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category._id == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPageForm = (e) => {
    const form = new FormData();
    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    setCreateModal(false);
  };
  const renderCreatePageModal = () => {
    return (
      <Modal
        modalTitle={"Add New Page"}
        show={createModal}
        handleClose={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control mb-2"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">Slect Category</option>
                {categories.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Description"}
              />
            </Col>
          </Row>
          <Row>
            {banners.length > 0
              ? banners.map((banner, index) => {
                  return (
                    <Row key={index}>
                      <Col>{banner.name}</Col>
                    </Row>
                  );
                })
              : null}
            <Col>
              <Input type="file" Name="banners" onChange={handleBannerImages} />
            </Col>
          </Row>
          <Row>
            {products.length > 0
              ? products.map((product, index) => {
                  return (
                    <Row key={index}>
                      <Col>{product.name}</Col>
                    </Row>
                  );
                })
              : null}
            <Col>
              <Input
                type="file"
                Name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Layout />
          <Col md={10} style={{ marginLeft: "auto", marginTop: "4rem" }}>
            {renderCreatePageModal()}
            <button
              className="btn btn-primary"
              onClick={() => setCreateModal(true)}
            >
              Create Page
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
