import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./common/Components/NotFound";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
