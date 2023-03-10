import React from "react";

import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import { ServiceProvider } from "./Service";
import GlobalStyle from "./styles/global"
const ProductList = React.lazy(() => import("productlist/ProductList"));
const ProductDetails = React.lazy(() => import("productdetails/ProductDetails"));

const Shell = () => (
  <ServiceProvider>
    <BrowserRouter>
    <GlobalStyle/>
      <Header />
        <React.Suspense fallback={"Loading"}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route index path="/cart" element={<ProductDetails />} />
          </Routes>
        </React.Suspense>
        <ToastContainer autoClose={3000} />
    </BrowserRouter>
  </ServiceProvider>
);

export default Shell;
