import "./App.css";
import Main from "./layout/Main";
import { AdminReportsPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Main />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<LoginPage />} />
          
          {/* Protected Admin Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<AdminReportsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;