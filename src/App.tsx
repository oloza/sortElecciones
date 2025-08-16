import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RankingTable from './components/RankingTable';
import { DatosSorteo, UsuarioRanking } from './types';
import { calcularRanking, calcularSumaResultadosReales, formatearNumero } from './utils/rankingUtils';
import './App.css';

function App() {
  const [datos, setDatos] = useState<DatosSorteo | null>(null);
  const [ranking, setRanking] = useState<UsuarioRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        // Simular carga de datos estáticos
        const response = await import('./data/sorteo.json');
        const datosSorteo: DatosSorteo = response.default;
        
        setDatos(datosSorteo);
        
        // Calcular ranking basándose en la proximidad a la suma de resultados reales
        const rankingCalculado = calcularRanking(
          datosSorteo.usuarios, 
          datosSorteo.sorteo.puestos
        );
        
        setRanking(rankingCalculado);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del sorteo');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos del sorteo...</p>
        </div>
      </div>
    );
  }

  if (error || !datos) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'No se pudieron cargar los datos'}</p>
        </div>
      </div>
    );
  }

  const sumaResultadosReales = calcularSumaResultadosReales(datos.sorteo.puestos);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header sorteo={datos.sorteo} />
        <RankingTable usuarios={ranking} />
        
        {/* Estadísticas adicionales */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Participantes</h3>
            <p className="text-3xl font-bold text-blue-600">{datos.usuarios.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mejor Acierto</h3>
            <p className="text-3xl font-bold text-green-600">
              {ranking.length > 0 ? `${ranking[0].nombre}` : 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              Diferencia: ±{ranking.length > 0 ? ranking[0].diferencia.toFixed(2) : '0'}%
            </p>
            <p className="text-sm text-gray-600">
              Total: {ranking.length > 0 ? ranking[0].porcentajeTotalPronostico.toFixed(1) : '0'}%
            </p>
          </div>
          
          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Promedio Acierto</h3>
            <p className="text-3xl font-bold text-purple-600">
              {ranking.length > 0 
                ? `${(ranking.reduce((acc, u) => acc + u.porcentajeAcierto, 0) / ranking.length).toFixed(1)}%`
                : '0%'
              }
            </p>
            <p className="text-sm text-gray-600">
              Suma Total Real: {formatearNumero(sumaResultadosReales)}%
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App; 