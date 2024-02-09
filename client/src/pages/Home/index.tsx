import Header from "../../common/Components/Header";
import Footer from "../../common/Components/Footer";
import { ReactElement } from "react";
import Body from "./Components/Body";

const Home = (): ReactElement => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default Home;
