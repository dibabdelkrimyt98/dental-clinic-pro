import React from 'react';
import ContactFooter from '../components/ContactFooter';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Services from '../components/Services';

export default function Home() {
    return (
        <div className="font-sans text-slate-800">
            <Navbar />
            
            <div id="home"><Hero /></div>

            <section id="about" className="py-20 px-10 text-center bg-white">
                <h2 className="text-3xl font-bold mb-4 text-secondary">Bienvenue au Cabinet</h2>
                <p className="max-w-2xl mx-auto text-gray-500 text-lg">
                    Une équipe dévouée pour assurer votre confort et votre santé avec les meilleures technologies.
                </p>
            </section>

            <div id="services"><Services /></div>

            <div id="contact"><ContactFooter /></div>
        </div>
    );
}