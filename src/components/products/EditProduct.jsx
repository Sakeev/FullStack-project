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
import { useNavigate, useParams } from "react-router-dom";
import {
  editProduct,
  getCategories,
  getOneProduct,
} from "../../store/products/productActions";

const EditProduct = () => {
  const { oneProduct, categories } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(oneProduct);

  const { slug } = useParams();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOneProduct(slug));
  }, []);

  useEffect(() => {
    setProduct(oneProduct);
  }, [oneProduct]);

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

  function handleSave() {
    let formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("image", product.image);
    dispatch(editProduct({ slug, formData, navigate }));
  }

  if (!product) return <></>;
  return (
    <Box sx={{ width: "40vw", m: "auto" }}>
      <Typography>EDIT product</Typography>
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
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          label="category"
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          {categories?.map((item, index) => (
            <MenuItem key={index} value={item.slug}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="file"
        name="image"
        // files={API + product?.images[0]?.image}
        onChange={handleChange}
      />
      <Button
        sx={{ m: 1 }}
        variant="outlined"
        fullWidth
        size="large"
        onClick={handleSave}
      >
        Edit PRODUCT
      </Button>
    </Box>
  );
};

export default EditProduct;
