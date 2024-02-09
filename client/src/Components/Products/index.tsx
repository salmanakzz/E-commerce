import { Grid } from "@mui/material";
import { ReactElement } from "react";
import Product from "../Product";
import { ProductType } from "../../utils/constants";

interface ProductsProps {
  products: Array<ProductType>;
}

const Products = ({ products }: ProductsProps): ReactElement => {
  return (
    <>
      {products.map((product, index) => (
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Product product={product} />
        </Grid>
      ))}
    </>
  );
};

export default Products;
