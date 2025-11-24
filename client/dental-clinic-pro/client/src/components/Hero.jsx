import { motion } from 'framer-motion'; // Import animation library
import React from 'react';

export default function Hero() {
  return (
    <section className="bg-slate-50 py-20 px-6 md:px-12 flex flex-col md:flex-row items-center overflow-hidden">
      
      {/* Text Section - Slides in from Left */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 space-y-6 z-10"
      >
        <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-2">
          Meilleurs soins dentaires 2024
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-secondary leading-tight">
          Votre Sourire, <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            Notre Passion
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-md">
          Technologie de pointe et équipe experte pour des soins sans douleur et des résultats éclatants.
        </p>
        <div className="flex gap-4 pt-4">
          <button className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition shadow-xl">
            Nos Services
          </button>
          <button className="border-2 border-secondary text-secondary px-8 py-3 rounded-full font-bold hover:bg-secondary hover:text-white transition">
            En Savoir Plus
          </button>
        </div>
      </motion.div>

      {/* Image Section - Slides in from Right */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center"
      >
        {/* Decorative Circle */}
        <div className="absolute w-[400px] h-[400px] bg-blue-200 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
        
        <img 
          src="https://img.freepik.com/free-photo/dentist-examining-female-patient-with-tools_107420-74144.jpg" 
          alt="Doctor" 
          className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-white" 
        />
      </motion.div>
    </section>
  );
}