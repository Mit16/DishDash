import main_logo from "../../assets/main_logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src={main_logo} className="main-logo" alt="" />
      </div>
      <div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        {/* {currentState ? (
          <button onClick={setCurrentState((prev) => !prev)}>Sign In</button>
        ) : (
          <button onClick={setCurrentState((prev) => !prev)}>Register</button>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
