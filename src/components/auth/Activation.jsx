import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { activation } from "../../store/auth/authActions";

const Activation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  let formData = new FormData();

  for (let [key, value] of searchParams.entries()) {
    formData.append(key, value);
  }

  useEffect(() => {
    dispatch(activation(formData));
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Activation</h3>
      <Button variant="outlined" onClick={() => navigate("/login")}>
        Login
      </Button>
    </div>
  );
};

export default Activation;
