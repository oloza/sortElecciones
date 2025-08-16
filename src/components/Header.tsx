import React from 'react';
import { Sorteo } from '../types';
import { formatearNumero, formatearFecha, calcularSumaResultadosReales } from '../utils/rankingUtils';

interface HeaderProps {
  sorteo: Sorteo;
}

const Header: React.FC<HeaderProps> = ({ sorteo }) => {
  const sumaResultadosReales = calcularSumaResultadosReales(sorteo.puestos);
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{sorteo.nombre}</h1>
        <p className="text-lg opacity-90 mb-4">Ranking por proximidad</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-sm opacity-80">Fecha de Votación</div>
            <div className="text-lg font-semibold">{formatearFecha(sorteo.fecha)}</div>
          </div>
          
          <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-sm opacity-80">Premio Total</div>
            <div className="text-lg font-semibold">Bs{formatearNumero(sorteo.premio)}</div>
          </div>
          
         
          {/* <div>:;</div> */}
        {/* Información de los puestos */}
        <div className="mt-6">
          {/* <h3 className="text-xl font-semibold mb-3">3 mejores puestos</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sorteo.puestos.map((puesto) => (
              <div key={puesto.posicion} className="bg-white/20 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">
                  {puesto.posicion === 1 ? '🥇' : puesto.posicion === 2 ? '🥈' : '🥉'} 
                  {puesto.posicion}°
                </div>
                {/* <div className="text-sm opacity-80">Resultado Votación</div> */}
                <div className="text-lg font-semibold">{formatearNumero(puesto.resultadoReal)}%</div>
              </div>
            ))}
               <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-sm opacity-80">Suma Total</div>
            <div className="text-lg font-semibold">{formatearNumero(sumaResultadosReales)}%</div>
          </div>
          </div>
        </div>
        {/* <div className="mt-6 "> */}
     
        </div>
      </div>
    </div>
  );
};

export default Header; 