import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src="" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            iste quae porro. Ea velit quam repellendus, maiores dolores vitae
            reiciendis molestias rerum veniam, minima nihil voluptates dolor
            nostrum. Rerum, ab!
          </p>
          <div className="footer-social-icons">
            <a href="#">
              <i class="bx bxl-facebook-circle"></i>
            </a>
            <a href="#">
              <i class="bx bxl-linkedin-square"></i>
            </a>
            <a href="#">
              <i class="bx bxl-twitter"></i>
            </a>
            <a href="https://www.instagram.com/mr_raaviii/">
              <i class="bx bxl-instagram-alt"></i>
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
