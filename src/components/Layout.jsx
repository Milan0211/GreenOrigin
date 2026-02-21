import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, QrCode, Home, Info, Smartphone } from "lucide-react";
import Button from "./ui/Button";
import logo from "../assets/logo.jpg";
import RootScrollbar from "./RootScrollbar";

const Layout = ({ children, isLoading }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Scan", href: "/scan", icon: QrCode },
    { name: "Ask-us", href: "/ask", icon: Smartphone },
    { name: "About", href: "/about", icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavClick = () => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    // Also try smooth scroll as backup
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  return (
    <div className="min-h-screen">
      {/* Root Scrollbar - Hidden during loading */}
      {!isLoading && <RootScrollbar />}
      
      {/* Header - Hidden during loading */}
      {!isLoading && (
        <header className="bg-white shadow-lg border-b border-herb-200/30 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex-1">
              <Link to="/" onClick={handleNavClick} className="flex items-center space-x-3">
                <img 
                  src={logo} 
                  alt="RootStory Logo" 
                  className="w-12 h-12 border-2 border-black rounded-xl"
                />
                <div>
                  <span className="text-2xl font-display font-bold text-herb-700">
                    GreenOrigin
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleNavClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-herb-100 to-mint-100 text-herb-700 shadow-md"
                        : "text-herb-600 hover:text-herb-900 hover:bg-gradient-to-r hover:from-herb-50 hover:to-mint-50 hover:shadow-sm"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-earth-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-herb-200 bg-white shadow-lg">
            <div className="px-6 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavClick();
                    }}
                    className={`flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-herb-100 to-mint-100 text-herb-700 shadow-md"
                        : "text-herb-600 hover:text-herb-900 hover:bg-gradient-to-r hover:from-herb-50 hover:to-mint-50 hover:shadow-sm"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${!isLoading ? 'pt-16' : ''}`}>{children}</main>

      {/* Footer - Hidden during loading */}
      {!isLoading && (
        <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-t border-slate-600/20 mt-0 backdrop-blur-sm relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={logo} 
                  alt="RootStory Logo" 
                  className="w-10 h-10 border-2 border-white rounded-xl"
                />
                <span className="text-2xl font-display font-bold text-white">
                  GreenOrigin
                </span>
              </div>
              <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-md">
                No ayurphobia, only GreenOrigin. Transparent, blockchain-verified
                provenance for Ayurvedic herbs with cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors cursor-pointer">
                  <span className="text-xs text-slate-300">f</span>
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors cursor-pointer">
                  <span className="text-xs text-slate-300">t</span>
                </div>
                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors cursor-pointer">
                  <span className="text-xs text-slate-300">in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              <div className="space-y-3">
                <Link
                  to="/scan"
                  className="block text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Scan QR Code
                </Link>
                <Link
                  to="/about"
                  className="block text-slate-300 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
                <Link
                  to="/download"
                  className="block text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Download App
                </Link>
                
                <Link
                  to="/"
                  onClick={handleNavClick}
                  className="block text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span>info@greenorigin.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-12 pt-8">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-4">
                © 2025 GreenOrigin. All rights reserved. Built with ❤️ 
              </p>
              <div className="flex justify-center space-x-6 text-sm text-slate-400">
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cookie Policy
                </span>
              </div>
            </div>
          </div>
        </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
