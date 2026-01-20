import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🍽️ Yummy Restaurant</h3>
            <p>Delicious food delivered to your table</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/reservation">Reservation</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 123 Food Street, City</p>
            <p>📞 (123) 456-7890</p>
            <p>✉️ info@yummyrestaurant.com</p>
          </div>

          <div className="footer-section">
            <h4>Opening Hours</h4>
            <p>Mon - Fri: 10:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 9:00 AM - 11:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Yummy Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
