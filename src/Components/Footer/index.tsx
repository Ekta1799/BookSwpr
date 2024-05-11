import "./styles.css";
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>BookSwpr</h4>
        <p>&copy; {new Date().getFullYear()} BookSwpr. All rights reserved.</p>
      </div>
      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: <a href="mailto:bookswpr@gmail.com">bookswpr@gmail.com</a></p>
        <p>Phone: +1234567890</p>
      </div>
      </div>
  </footer>
  );
};

export default Footer;
