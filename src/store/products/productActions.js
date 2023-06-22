import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PRODUCTS } from "../../consts";

function getAuth() {
  const token = JSON.parse(localStorage.getItem("token"));
  const Authorization = `Bearer ${token.access}`;
  const config = {
    headers: {
      Authorization,
    },
  };
  return config;
}

export const getProducts = createAsyncThunk(
  "@products/getProducts",
  async () => {
    try {
      const config = getAuth();
      const res = await axios(`${API_PRODUCTS}product/`, config);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "@products/getCategories",
  async () => {
    try {
      const config = getAuth();
      const res = await axios(`${API_PRODUCTS}category/`, config);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "@products/addProduct",
  async ({ formData, navigate }, { dispatch }) => {
    try {
      const config = getAuth();
      await axios.post(`${API_PRODUCTS}product/`, formData, config);
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "@products/getOneProduct",
  async (slug) => {
    try {
      const config = getAuth();
      const res = await axios(`${API_PRODUCTS}product/${slug}/`, config);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  "@products/editProduct",
  async ({ slug, formData, navigate }, { dispatch }) => {
    try {
      const config = getAuth();
      await axios.patch(`${API_PRODUCTS}product/${slug}/`, formData, config);
      dispatch(getProducts());
      navigate("/products");
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "@products/deleteProduct",
  async ({ slug, navigate }, { dispatch }) => {
    try {
      const config = getAuth();
      await axios.delete(`${API_PRODUCTS}product/${slug}/`, config);
      dispatch(getProducts());
      navigate("/products");
    } catch (error) {
      console.log(error.response.data);
    }
  }
);
