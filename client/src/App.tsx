import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthProvider from "./store/auth-context";
import Spots from "./pages/Spots";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="spots" element={<Spots />} />
            <Route path="new-spot" element={<div>New spot component</div>} />
          </Route>
          <Route
            path="*"
            element={<div>Sorry, this route does not exist</div>}
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
