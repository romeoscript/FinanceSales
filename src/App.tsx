
import "./App.css";
import Main from "./layout/Main";
import About from "./pages/About";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import PricingPage from "./pages/PricingPage";


function App() {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Main />}>
           <Route index element={<Homepage />} />
           <Route path="about" element={<About />} />
           <Route path="projects" element={<ProjectPage />} />
           <Route path="Pricing" element={<PricingPage />} />
        </Route>
         </Routes> 
         
    </Router>
  );
}

export default App;