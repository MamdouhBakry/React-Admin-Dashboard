import React, { useEffect, useState } from "react";
import PieChart from "chart.js";
import Layout from "../../components/Layout/index,";
import "./style.css";

export default function Home() {
  return (
    <>
      <Layout sidebar>
        <p class="lead d-none d-sm-block">All products and users statistics</p>

        <div
          class="alert alert-warning fade collapse"
          role="alert"
          id="myAlert"
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close</span>
          </button>
          <strong>Data and Records</strong> Learn more about employee
        </div>
        <div class="row mb-3">
          <div style={{ textAlign: "center" }} class="col-xl-3 col-sm-6 py-2">
            <div class="card bg-success text-white h-100">
              <div
                class="card-body bg-success"
                style={{ backgroundColor: "#57b960" }}
              >
                <div class="rotate">
                  <i class="fa fa-user fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Users</h6>
                <h1 class="display-4">134</h1>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }} class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-danger h-100">
              <div class="card-body bg-danger">
                <div class="rotate">
                  <i class="fas fa-shopping-basket"></i>
                </div>
                <h6 class="text-uppercase">Products</h6>
                <h1 class="display-4">87</h1>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }} class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-info h-100">
              <div class="card-body bg-info">
                <div class="rotate">
                  <i class="fas fa-shopping-basket"></i>
                </div>
                <h6 class="text-uppercase">Orders</h6>
                <h1 class="display-4">125</h1>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center" }} class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-warning h-100">
              <div class="card-body">
                <div class="rotate">
                  <i class="far fa-money-bill-alt"></i>
                </div>
                <h6 class="text-uppercase">Total Amount</h6>
                <h1 class="display-4">15550</h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
