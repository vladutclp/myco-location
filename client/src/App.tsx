import { Route, Routes } from "react-router";
import styles from "./pages/RouteMessage.module.css";
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
        <Route
          path="*"
          element={
            <div className={styles.message}>
              <h1 className={styles.title}>Page not found</h1>
              <p>Sorry, this route does not exist</p>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
