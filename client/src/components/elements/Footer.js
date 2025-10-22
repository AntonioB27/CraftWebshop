import React from "react";
import "../../static/styles/footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About</h4>
          <p>
            Craft Beer Shop – discover the best beers from around the world.
          </p>
        </div>
        <div className="footer-section">
          <h4>Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/beers">Beers</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@craftbeer.com</p>
          <p>Phone: +385 123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Craft Beer Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
