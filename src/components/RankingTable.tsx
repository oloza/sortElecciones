import React from 'react';
import { UsuarioRanking } from '../types';
import { formatearNumero, formatearFecha, obtenerColorPosicion, obtenerEmojiPosicion } from '../utils/rankingUtils';

interface RankingTableProps {
  usuarios: UsuarioRanking[];
}

const RankingTable: React.FC<RankingTableProps> = ({ usuarios }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Ranking de Usuarios</h2>
        <p className="text-sm text-gray-600">Ordenados por proximidad al resultado real</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posición
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pronóstico
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diferencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Acierto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: obtenerColorPosicion(usuario.posicion) }}
                    >
                      {obtenerEmojiPosicion(usuario.posicion)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{usuario.nombre}</div>
                    <div className="text-sm text-gray-500">{usuario.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-blue-600">
                    {formatearNumero(usuario.pronostico)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    usuario.diferencia <= 1 ? 'text-green-600' : 
                    usuario.diferencia <= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    ±{formatearNumero(usuario.diferencia)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    usuario.porcentajeAcierto >= 95 ? 'text-green-600' : 
                    usuario.porcentajeAcierto >= 90 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formatearNumero(usuario.porcentajeAcierto)}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatearFecha(usuario.fechaPronostico)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable; 