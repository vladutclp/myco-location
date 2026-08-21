import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Spots from "./pages/Spots";
import ProtectedRoute from "./routes/ProtectedRoute";
import useSessionToken from "./hooks/useSessionToken";
import NewSpot from "./pages/NewSpot";
function App() {
  useSessionToken();
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="spots" element={<Spots />} />
          <Route path="new-spot" element={<NewSpot />} />
        </Route>
        <Route path="*" element={<div>Sorry, this route does not exist</div>} />
      </Routes>
    </Layout>
  );
}

export default App;
