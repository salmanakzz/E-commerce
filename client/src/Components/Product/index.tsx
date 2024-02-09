import { ReactElement, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import img from "../../assets/Iphone_15_Pro.jpg";
import { ProductType } from "../../utils/constants";
import { addToCart } from "../../services/addToCart";
import { Alert, Snackbar } from "@mui/material";

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps): ReactElement => {
  const [showToast, setShowToast] = useState(false);
  const [count, setCount] = useState(product.cartCount || 0);

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast(false);
  };

  const handleAddtoCart = async (countVal: number, productId?: string) => {
    if (productId) {
      setCount(count + countVal);
      try {
        const payload = {
          productId,
          count: countVal,
        };
        await addToCart(payload);
        setShowToast(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {" "}
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 260 }} image={img} title="product" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight="500"
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",

              height: "20px",
              minWidth: { xs: "300px" },
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {count > 0 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={{ color: "#4f48dc" }}
                onClick={() => handleAddtoCart(-1, product._id)}
              >
                -
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                fontWeight="500"
                p={2}
                sx={{ color: "#4f48dc" }}
              >
                {count}
              </Typography>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={{ color: "#4f48dc" }}
                onClick={() => handleAddtoCart(1, product._id)}
              >
                +
              </IconButton>
            </div>
          ) : (
            <IconButton aria-label="add to cart">
              <AddShoppingCartIcon
                sx={{ color: "#dc4848" }}
                onClick={() => handleAddtoCart(1, product._id)}
              />
            </IconButton>
          )}

          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight="500"
            mr={2}
            sx={{ color: "#4f48dc" }}
          >
            {`$${product.price}`}
          </Typography>
        </CardActions>
      </Card>
      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {`Cart Updated!`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Product;
