import React from 'react';
import { FaTooth } from 'react-icons/fa'; // Import an icon
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      
      {/* NEW MODERN LOGO */}
      <a href="#home" className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
          <FaTooth size={24} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xl font-extrabold text-secondary tracking-wide group-hover:text-blue-600 transition-colors">DENTAL</span>
          <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Clinic Pro</span>
        </div>
      </a>

      <ul className="hidden md:flex gap-8 text-gray-600 font-medium">
        <li><a href="#home" className="hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">Accueil</a></li>
        <li><a href="#about" className="hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">À Propos</a></li>
        <li><a href="#services" className="hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">Services</a></li>
      </ul>
      
      <Link to="/rdv" className="bg-gradient-to-r from-primary to-green-400 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-green-200 hover:scale-105 transition-all duration-300">
        Prendre RDV
      </Link>
    </nav>
  );
}