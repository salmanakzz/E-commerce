import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField, Typography } from "@mui/material";
import { ProductType } from "../../../utils/constants";
import { addProduct } from "../../../services/addProduct";
import { editProduct } from "../../../services/editProduct";
import { deleteProduct } from "../../../services/deleteProduct";
import { upload } from "../../../services/upload";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface CustomizedDialogsProps {
  title: string;
  action: "Add" | "Edit" | "Delete";
  currentProduct?: ProductType;
  setCurrentProductIndex?: React.Dispatch<React.SetStateAction<number>>;
  handleCurrentProduct?: (action: string, product?: ProductType) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultProduct = {
  name: "",
  description: "",
  price: 0,
  imgUrl: "../",
};

export default function CustomizedDialogs({
  title,
  action,
  currentProduct,
  setCurrentProductIndex,
  handleCurrentProduct,
  open,
  setOpen,
}: CustomizedDialogsProps) {
  const [product, setProduct] = React.useState<ProductType>();

  const [image, setImage] = React.useState(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  React.useEffect(() => {
    setProduct(currentProduct ? currentProduct : defaultProduct);
  }, [currentProduct]);

  const handleClose = () => {
    setOpen(false);

    setProduct(currentProduct ? currentProduct : defaultProduct);
    setCurrentProductIndex && setCurrentProductIndex(-1);
  };

  const handleSaveProduct = async () => {
    let promise;
    if (product && action) {
      switch (action) {
        case "Add":
          promise = addProduct;
          break;
        case "Edit":
          product._id = currentProduct?._id;
          promise = editProduct;
          break;
        case "Delete":
          product._id = currentProduct?._id;
          promise = deleteProduct;
          break;

        default:
          break;
      }
      if (promise) {
        try {
          const { data } = await promise(product);

          if (image && data._id) {
            const formData = new FormData();
            formData.append("image", image);

            await upload(formData, data._id);
          }
          handleClose();
          handleCurrentProduct &&
            (action === "Delete"
              ? handleCurrentProduct(action)
              : handleCurrentProduct(action, product));
        } catch (error) {
          console.error(error);
          alert("Error!");
        }
      }
    }
  };

  return (
    <React.Fragment>
      {product && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {action !== "Delete" ? (
              <>
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="Product Name"
                  defaultValue={product.name}
                  variant="filled"
                  InputLabelProps={{
                    style: { color: "#4c46b6" },
                  }}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      name: e.target.value,
                    });
                  }}
                />
                <TextField
                  id="filled-multiline-static"
                  label="Description"
                  multiline
                  fullWidth
                  required
                  rows={4}
                  defaultValue={product.description}
                  variant="filled"
                  sx={{ mt: 1 }}
                  InputLabelProps={{
                    style: { color: "#4c46b6" },
                  }}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      description: e.target.value,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  required
                  id="filled-required"
                  label="Price"
                  defaultValue={product.price}
                  variant="filled"
                  sx={{ mt: 1 }}
                  InputLabelProps={{
                    style: { color: "#4c46b6" },
                  }}
                  onChange={(e) => {
                    setProduct({
                      ...product,
                      price: Number(e.target.value),
                    });
                  }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 1, backgroundColor: "#4c46b6" }}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageChange}
                  />
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Typography
                  gutterBottom
                  variant="caption"
                  component="p"
                  sx={{ fontWeight: 400, fontSize: "15px" }}
                >
                  Are you sure?, You can't able to revert!
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleSaveProduct}
              sx={{ color: action === "Delete" ? "#f54545" : "#4c46b6" }}
            >
              {action === "Add" ? "Add" : action === "Edit" ? "Save" : "Delete"}
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </React.Fragment>
  );
}
