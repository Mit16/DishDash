import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src="" alt="" />
          <p>
            Crafting a food delivery system so seamless, it'll have the devil
            himself ordering snacks on the go! 🍕🚀 <br/>
            Driven by passion, powered
            by tech, and served with excellence<br/>—your hunger, our mission!
          </p>
          <div className="footer-social-icons">
            <a href="#">
              <i className="bx bxl-facebook-circle"></i>
            </a>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>
            </a>
            <a href="#">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="https://www.instagram.com/mr_raaviii/">
              <i className="bx bxl-instagram-alt"></i>
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMAPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@food-z.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Food-Z.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
