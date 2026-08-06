import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<>home page</>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
