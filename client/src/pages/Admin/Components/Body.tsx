import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedDialogs from "../../../common/Components/Dialog";
import { useEffect, useState } from "react";
import { ProductType } from "../../../utils/constants";
import { getAllProducts } from "../../../services/gettAllProducts";

const Body = () => {
  const headers: string[] = ["Name", "Price", "Description", "Action"];

  const [products, setProducts] = useState<Array<ProductType>>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(-1);
  const [showAddProductModal, setShowAddProductModal] =
    useState<boolean>(false);
  const [showEditProductModal, setShowEditProductModal] =
    useState<boolean>(false);
  const [showDeleteProductModal, setShowDeleteProductModal] =
    useState<boolean>(false);

  const handleClickOpen = (action: string) => {
    switch (action) {
      case "Add":
        setShowAddProductModal(true);
        break;
      case "Edit":
        setShowEditProductModal(true);
        break;
      case "Delete":
        setShowDeleteProductModal(true);
        break;

      default:
        break;
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await getAllProducts();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [showToast, setShowToast] = useState({ value: false, action: "" });

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast({ value: false, action: "" });
  };

  const handleCurrentProduct = (
    action: string,
    updatedProduct?: ProductType
  ) => {
    if (updatedProduct) {
      if (currentProductIndex >= 0) {
        products[currentProductIndex] = updatedProduct;
        setCurrentProductIndex(-1);
      } else {
        products.push(updatedProduct);
      }
    } else {
      delete products[currentProductIndex];
    }
    setShowToast({ value: true, action });
  };
  return (
    <Box sx={{ p: 10, pb: 10, minHeight: "500px" }}>
      <Container maxWidth="xl">
        <Box
          alignItems={"center"}
          justifyContent={"space-between"}
          display={"flex"}
          py={2}
          sx={{ display: { xs: "grid", md: "flex" } }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 500, fontSize: "25px" }}
          >
            All Products
          </Typography>
          <Button
            onClick={() => handleClickOpen("Add")}
            variant="contained"
            sx={{
              backgroundColor: "#4c46b6",
              ":hover": { backgroundColor: "342f8c !important" },
            }}
          >
            Add Product
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map((header, idx) => (
                  <TableCell align="left" key={idx}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      maxWidth: "50px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.description}
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setCurrentProductIndex(idx);
                        handleClickOpen("Edit");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setCurrentProductIndex(idx);
                        handleClickOpen("Delete");
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomizedDialogs
          open={showAddProductModal}
          setOpen={setShowAddProductModal}
          title={"Add Product"}
          action={"Add"}
          handleCurrentProduct={handleCurrentProduct}
        />
        {currentProductIndex >= 0 && (
          <CustomizedDialogs
            open={showEditProductModal}
            setOpen={setShowEditProductModal}
            title={"Edit Product"}
            action={"Edit"}
            currentProduct={products[currentProductIndex]}
            handleCurrentProduct={handleCurrentProduct}
            setCurrentProductIndex={setCurrentProductIndex}
          />
        )}
        {currentProductIndex >= 0 && (
          <CustomizedDialogs
            open={showDeleteProductModal}
            setOpen={setShowDeleteProductModal}
            title={"Delete Product"}
            action={"Delete"}
            currentProduct={products[currentProductIndex]}
            handleCurrentProduct={handleCurrentProduct}
            setCurrentProductIndex={setCurrentProductIndex}
          />
        )}
      </Container>

      <Snackbar
        open={showToast.value}
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
          {`Product ${showToast.action}ed Successfully!`}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Body;
