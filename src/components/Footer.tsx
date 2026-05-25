import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  MessageCircle,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <span className="text-xl font-bold">AutoHub</span>
                <span className="text-xs text-red-500 block -mt-1">Kenya</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for premium vehicles in Kenya. We source, ship, and deliver 
              quality cars, ebikes, and motorcycles directly from China to your doorstep.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/254720549567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Vehicles
                </Link>
              </li>
              <li>
                <Link to="/new-cars" className="text-gray-400 hover:text-white transition-colors text-sm">
                  New Cars
                </Link>
              </li>
              <li>
                <Link to="/used-cars" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Used Cars
                </Link>
              </li>
              <li>
                <Link to="/ebikes" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Ebikes & Motorcycles
                </Link>
              </li>
              <li>
                <Link to="/sell-car" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+254720549567"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-red-500" />
                  <span className="text-sm">+254 720 549 567</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@autohubkenya.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-red-500" />
                  <span className="text-sm">info@autohubkenya.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.google.com/?q=Magenche,Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 mt-0.5 text-red-500" />
                  <span className="text-sm">Magenche, Kenya</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Payment & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="bg-green-600 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">M</span>
                </div>
                <div>
                  <p className="font-semibold">M-Pesa</p>
                  <p className="text-xs text-green-100">Secure Mobile Payments</p>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              We accept M-Pesa for all transactions. Fast, secure, and convenient payments 
              for your vehicle purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} AutoHub Kenya. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
