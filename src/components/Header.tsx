import React from 'react';
import { Sorteo } from '../types';
import { formatearNumero, formatearFecha } from '../utils/rankingUtils';

interface HeaderProps {
  sorteo: Sorteo;
}

const Header: React.FC<HeaderProps> = ({ sorteo }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{sorteo.nombre}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-sm opacity-80">Fecha del Sorteo</div>
            <div className="text-lg font-semibold">{formatearFecha(sorteo.fecha)}</div>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-sm opacity-80">Premio Total</div>
            <div className="text-lg font-semibold">€{formatearNumero(sorteo.premio)}</div>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-sm opacity-80">Resultado Real</div>
            <div className="text-lg font-semibold">{formatearNumero(sorteo.resultadoReal)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 