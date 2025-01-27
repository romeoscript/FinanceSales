
import "./App.css";
import Main from "./layout/Main";

import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Main />}>
           <Route index element={<Homepage />} />
         
        </Route>
         </Routes> 
         
    </Router>
  );
}

export default App;