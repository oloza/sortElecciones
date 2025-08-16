import React, { useState, useEffect } from 'react';
import { UsuarioRanking } from '../types';
import { formatearNumero, obtenerColorPosicion, obtenerEmojiPosicion, formatearPronosticos } from '../utils/rankingUtils';

interface RankingTableProps {
  usuarios: UsuarioRanking[];
}

const RankingTable: React.FC<RankingTableProps> = ({ usuarios }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Ranking de Usuarios</h2>
        <p className="text-xs sm:text-sm text-gray-600">Ordenados por proximidad al porcentaje total real</p>
      </div>
      
      {/* Vista móvil - Cards */}
      {isMobile && (
        <div>
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span 
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: obtenerColorPosicion(usuario.posicion) }}
                  >
                    {obtenerEmojiPosicion(usuario.posicion)}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{usuario.nombre}</div>
                    <div className="text-xs text-gray-500">{usuario.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-blue-600">
                    {formatearNumero(usuario.porcentajeTotalPronostico)}%
                  </div>
                  <div className={`text-xs font-medium ${
                    usuario.diferencia <= 1 ? 'text-green-600' : 
                    usuario.diferencia <= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ±{formatearNumero(usuario.diferencia)}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">Pronósticos por Puesto:</div>
                {usuario.pronosticos.map((pronostico, index) => (
                  <div key={index} className="flex justify-between items-center py-1 px-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-600">{pronostico.puesto}°:</span>
                    <span className="text-sm text-gray-900">{formatearNumero(pronostico.porcentaje)}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vista desktop - Tabla */}
      {!isMobile && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posición
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pronósticos por Puesto
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Total
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diferencia
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <React.Fragment key={usuario.id}>
                  {/* Fila principal del usuario */}
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span 
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: obtenerColorPosicion(usuario.posicion) }}
                        >
                          {obtenerEmojiPosicion(usuario.posicion)}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{usuario.nombre}</div>
                        <div className="text-sm text-gray-500">{usuario.email}</div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {/* {formatearPronosticos(usuario.pronosticos)} */}
                        {usuario.pronosticos.map((pronostico, index) => (
                          <div key={index} className="mb-1 last:mb-0">
                            <span className="font-medium">{pronostico.puesto}°:</span> {formatearNumero(pronostico.porcentaje)}%
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600">
                        {formatearNumero(usuario.porcentajeTotalPronostico)}%
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        usuario.diferencia <= 1 ? 'text-green-600' : 
                        usuario.diferencia <= 3 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        ±{formatearNumero(usuario.diferencia)}%
                      </span>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RankingTable; 