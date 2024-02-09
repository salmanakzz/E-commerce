import { Box, Container, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <Box component="footer" sx={{ bgcolor: "#000", py: 6, color: "#fff" }}>
      <Container maxWidth="xl" sx={{ display: "grid", placeItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShoppingCartIcon sx={{ display: { color: "#fff" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Shopify
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          align="center"
          component="a"
          sx={{
            mr: 2,
            color: "#ffffff70",
            fontSize: "12px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
          href="https://github.com/salmanakzz"
        >
          <GitHubIcon sx={{ fontSize: "15px", mb: "2px" }} />
          {"Designed by salmanakzz"}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
