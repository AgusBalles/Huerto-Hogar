import React from 'react';
import Button from '../atoms/Button';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Del Campo Directo a Tu Mesa
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Productos frescos y orgánicos con más de 6 años de experiencia llevando 
            lo mejor del campo chileno a tu hogar.
          </p>
          <Button variant="primary">Ver Productos</Button>
        </div>
      </div>
    </section>
  );
}