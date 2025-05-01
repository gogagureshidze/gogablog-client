import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="/#/about">About</a>
          <a href="#">Services</a>
          <a href="/#/contact">Contact</a>
        </div>
        <p className="footer-text">Goga Blog &copy; {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
