'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo">NextGen Scholars</span>
            </div>
            <p className="footer-description">
              Empowering students and educators through innovative technology and comprehensive learning solutions.
            </p>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Support</h3>
            <div className="footer-links">
              <Link href="/help">Help Center</Link>
              <Link href="/about">About Us</Link>
              <a href="/about">support@nexgenscholars.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 NextGen Scholars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
