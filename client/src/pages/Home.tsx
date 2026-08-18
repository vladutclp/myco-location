import { useAuth } from "../store/auth-context";
import { NavLink } from "react-router";

const Home = () => {
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn: ", isLoggedIn);
  return isLoggedIn ? (
    <div>
      <h1>Welcome to MycoLocation</h1>
      <div>Hello user, you are logged in</div>
    </div>
  ) : (
    <div>
      <h1>Welcome to MycoLocation</h1>
      <h3>Looks like you are not logged int</h3>
      Please <NavLink to={"/login"}>Log In </NavLink>
    </div>
  );
};

export default Home;
