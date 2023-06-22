import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_AUTH } from "../../consts";
import { setUser } from "./authSlice";

export const register = createAsyncThunk(
  "@auth/register",
  async ({ formData, navigate }) => {
    try {
      const res = await axios.post(`${API_AUTH}users/`, formData);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const activation = createAsyncThunk(
  "@auth/activation",
  async (formData) => {
    try {
      const res = await axios.post(`${API_AUTH}users/activation/`, formData);
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "@auth/login",
  async ({ formData, navigate, username }) => {
    try {
      const token = await axios.post(`${API_AUTH}jwt/create/`, formData);
      localStorage.setItem("token", JSON.stringify(token.data));
      localStorage.setItem("username", JSON.stringify(username));
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "@auth/checkAuth",
  async (_, { dispatch }) => {
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      let res = await axios.post(`${API_AUTH}jwt/refresh/`, {
        refresh: token.refresh,
      });
      console.log(token);
      localStorage.setItem(
        "token",
        JSON.stringify({ refresh: token.refresh, access: res.data.access })
      );
      let user = localStorage.getItem("username");
      dispatch(setUser(user));
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "@auth/logout",
  async (navigate, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(setUser(""));
    navigate("/");
  }
);
