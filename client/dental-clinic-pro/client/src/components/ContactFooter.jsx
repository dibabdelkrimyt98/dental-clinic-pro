import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Replace these with YOUR actual keys from EmailJS
const SERVICE_ID = 'service_v5cpysp'; 
const TEMPLATE_ID = 'template_lfgxol9'; 
const PUBLIC_KEY = 'h9x0PpZ0hmANt51ja'; 

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // success, error, sending

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailJSSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // This data object matches the variables in your EmailJS template
    const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        message: formData.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-secondary text-white py-16 px-6 md:px-20"
    >
      <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto">
        
        {/* Left: Form */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Laissez-nous vos remarques</h2>
          <form onSubmit={handleEmailJSSubmit} className="space-y-4">
            <input 
              type="text" name="name" placeholder="Votre Nom" required
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-primary text-white"
              value={formData.name} onChange={handleChange}
            />
            <input 
              type="email" name="email" placeholder="Email" required
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-primary text-white"
              value={formData.email} onChange={handleChange}
            />
            <textarea 
              name="message" placeholder="Vos remarques, critiques..." rows="4" required
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-primary text-white"
              value={formData.message} onChange={handleChange}
            ></textarea>
            
            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="w-full bg-primary py-3 rounded-lg font-bold hover:bg-green-500 transition disabled:opacity-50"
            >
              {status === 'sending' ? 'Envoi...' : 'Envoyer la Remarque'}
            </button>

            {status === 'success' && <p className="text-primary mt-2">Message envoyé avec succès!</p>}
            {status === 'error' && <p className="text-red-400 mt-2">Erreur lors de l'envoi. Veuillez réessayer.</p>}
          </form>
        </div>

        {/* Right: Map Visual */}
        <div className="md:w-1/2 h-80 bg-slate-200 rounded-xl overflow-hidden relative">
           <div className="absolute inset-0 flex items-center justify-center text-slate-500 bg-slate-100">
             [ Placeholder pour la Carte de la Clinique ]
           </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
        © 2024 Dental Clinic. Tous droits réservés.
      </div>
    </motion.section>
  );
}