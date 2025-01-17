import { useState } from "react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-blue-200-700  shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">
            <span   className="hover:opacity-80">BrandLogo</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-lg">
            <a href="#home" className="hover:text-green-300 transition">
              Home
            </a>
            <a href="#about" className="hover:text-green-300 transition">
              About
            </a>
            <a href="#services" className="hover:text-green-300 transition">
              Services
            </a>
            <a href="#contact" className="hover:text-green-300 transition">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-green-600">
            <ul className="flex flex-col items-center space-y-4 py-4 text-lg">
              <li>
                <a href="#home" className="hover:text-green-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-green-300 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-green-300 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-300 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};
