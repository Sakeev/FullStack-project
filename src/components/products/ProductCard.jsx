import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../consts";
import { deleteProduct } from "../../store/products/productActions";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 345, margin: "3%" }}>
      <CardMedia
        component="img"
        height="140"
        src={API + item.images[0]?.image}
        alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <CardActions>
          <Button
            size="small"
            onClick={() =>
              dispatch(deleteProduct({ slug: item.slug, navigate }))
            }
          >
            Delete
          </Button>
          <Link to={`/edit/${item.slug}`}>
            <Button size="small">Edit</Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
