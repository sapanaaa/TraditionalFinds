import React from 'react';
import './Footer.css'; // Add styles in a separate CSS file if needed

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/careers">Careers</a></li>
                        <li><a href="/blog">Blog</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="/faq">FAQs</a></li>
                        <li><a href="/support">Customer Support</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Policy</h4>
                    <ul>
                        <li><a href="/terms">Terms & Conditions</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/refund">Refund Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Your E-commerce. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;