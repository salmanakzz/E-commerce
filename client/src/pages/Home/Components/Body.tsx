import { ReactElement, useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Products from "../../../Components/Products";
import { getAllProducts } from "../../../services/gettAllProducts";
import { CartType, ProductType } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

const Body = (): ReactElement => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Array<ProductType>>([]);

  const fetchData = async () => {
    try {
      const { data } = await getAllProducts();
      const { products, cartItems } = data;
      products.forEach((product: ProductType) => {
        cartItems.forEach((cart: CartType) => {
          if (cart.productId.toString() === (product?._id || "").toString()) {
            product["cartCount"] = cart.count;
          }
        });
      });
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 2, pb: 6, minHeight: "500px" }}>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 500, fontSize: "25px" }}
          >
            Products
          </Typography>
          <Button
            variant="outlined"
            size="medium"
            sx={{
              borderColor: "#c2bfff",
              color: "#837df1",
              ":hover": { borderColor: "#9b96fb" },
            }}
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </Button>
        </Grid>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products && products.length ? (
            <Products products={products} />
          ) : (
            <></>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Body;
