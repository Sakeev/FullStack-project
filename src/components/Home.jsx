import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../store/auth/authActions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(checkAuth());
  }, []);

  return <div>Home</div>;
};

export default Home;
