import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct, getCategories } from "../../store/products/productActions";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    let formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("category", product.category);
    formData.append("image", product.image);

    dispatch(addProduct({ formData, navigate }));
  };

  return (
    <Box sx={{ width: "40vw", m: "auto" }}>
      <Typography>ADD product page</Typography>
      <TextField
        sx={{ m: 1 }}
        id="standart-basic"
        label="Title"
        variant="outlined"
        fullWidth
        name="title"
        value={product.title}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1 }}
        id="standart-basic"
        label="Description"
        variant="outlined"
        fullWidth
        name="description"
        value={product.description}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1 }}
        id="standart-basic"
        label="Price"
        variant="outlined"
        fullWidth
        name="price"
        value={product.price}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 1 }}
        id="standart-basic"
        label="Quantity"
        variant="outlined"
        fullWidth
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
      />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          label="category"
          value={product.category}
          onChange={handleChange}
        >
          {categories.map((item) => (
            <MenuItem key={item.slug} value={item.slug}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField type="file" name="image" onChange={handleChange} />
      <Button
        sx={{ m: 1 }}
        variant="outlined"
        fullWidth
        size="large"
        onClick={handleSave}
      >
        ADD PRODUCT
      </Button>
    </Box>
  );
};

export default AddProduct;
