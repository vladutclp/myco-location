import BenefitsList from "../components/BenefitsList";
import { useAuth } from "../store/auth-context";
import { Link } from "react-router";
import heroImage from "../../assets/hero.jpeg";

const Home = () => {
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn: ", isLoggedIn);
  return isLoggedIn ? (
    <div>
      <h1>Welcome to MycoLocation</h1>
      <div>Hello user, you are logged in</div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "#1b6e4b",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h1>Myco Location</h1>
          <p>Never miss a spot</p>
        </div>
        <div className="home__hero-media">
          <img
            src={heroImage}
            alt="Orange mushroom growing among moss"
            width={360}
            height={540}
            fetchPriority="high"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <BenefitsList />
        <Link to="/register" className="button button--primary">
          Create account
        </Link>
        <Link to="/login" className="button">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Home;
