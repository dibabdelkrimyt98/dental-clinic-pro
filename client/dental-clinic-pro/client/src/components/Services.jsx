import axios from 'axios';
import { motion } from 'framer-motion'; // Import animation
import React, { useEffect, useState } from 'react';
import { FaTooth } from 'react-icons/fa';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fallback data if database isn't running yet for testing
    setServices([
      {id: 1, title: "Dentisterie Générale", icon: "tooth"},
      {id: 2, title: "Esthétique", icon: "sparkle"},
      {id: 3, title: "Orthodontie", icon: "braces"},
    ]);
    
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data.data))
      .catch(err => console.log("Using static data"));
  }, []);

  return (
    <section className="py-24 bg-blue-50/50">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-secondary mb-4"
        >
          Nos Services
        </motion.h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }} // Staggered effect
            className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              {/* Static Icons for demo */}
              <FaTooth />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nous utilisons les dernières techniques pour garantir un traitement efficace et durable.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}