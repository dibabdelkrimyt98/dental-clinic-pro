import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Appointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '', phone: '', reason: '', address: '', previous_treatment: false,
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('http://localhost:5000/api/appointment', formData);
      setStatus('success');
      setTimeout(() => navigate('/'), 3000); 
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center p-8">
            <h1 className="text-4xl font-extrabold text-green-600 mb-4">Rendez-vous Confirmé!</h1>
            <p className="text-lg text-gray-700">Votre demande a été enregistrée. Nous vous contacterons bientôt.</p>
            <button 
                onClick={() => navigate('/')} 
                className="mt-8 bg-secondary text-white px-6 py-3 rounded-full hover:bg-slate-700 transition flex items-center gap-2"
            >
                <FaArrowLeft /> Retour à l'accueil
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-2xl">
        <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 transition mb-6 flex items-center gap-2">
            <FaArrowLeft /> Retour
        </button>
        <h1 className="text-3xl font-bold text-secondary mb-8">Demande de Rendez-vous</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <Input label="Nom Complet" name="fullname" value={formData.fullname} onChange={handleChange} required />
          <Input label="Numéro de Téléphone" name="phone" value={formData.phone} onChange={handleChange} required type="tel" />
          <Input label="Adresse (Ville et Rue)" name="address" value={formData.address} onChange={handleChange} required />
          
          <label className="block">
            <span className="text-gray-700 font-medium">Raison du Rendez-vous</span>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="">Sélectionner une raison</option>
              <option value="Contrôle Annuel">Contrôle Annuel</option>
              <option value="Douleur/Urgence">Douleur / Urgence</option>
              <option value="Consultation Esthétique">Consultation Esthétique</option>
              <option value="Problèmes de Gencives">Problèmes de Gencives</option>
              <option value="Autre">Autre</option>
            </select>
          </label>
          
          <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
            <input
              type="checkbox"
              name="previous_treatment"
              checked={formData.previous_treatment}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label className="text-gray-700 font-medium select-none">
              Avez-vous déjà reçu un traitement dans notre cabinet ?
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-green-500 transition shadow-lg disabled:opacity-50"
          >
            {status === 'sending' ? 'Envoi de la demande...' : 'Confirmer le Rendez-vous'}
          </button>
          
          {status === 'error' && <p className="text-red-500 text-center mt-4">Erreur lors de l'envoi de la demande. Veuillez vérifier les informations.</p>}
        </form>
      </div>
    </div>
  );
}

// Helper component for cleaner form structure
const Input = ({ label, name, value, onChange, type = 'text', required = false }) => (
    <label className="block">
      <span className="text-gray-700 font-medium">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
    </label>
);