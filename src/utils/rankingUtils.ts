import { Usuario, UsuarioRanking } from '../types';

export const calcularRanking = (usuarios: Usuario[], puestos: any[]): UsuarioRanking[] => {
  // Calcular la suma total de los resultados reales
  const sumaResultadosReales = puestos.reduce((total, puesto) => total + puesto.resultadoReal, 0);
  
  return usuarios
    .map(usuario => {
      // Calcular el porcentaje total del pronóstico del usuario
      const porcentajeTotalPronostico = usuario.pronosticos.reduce(
        (total, pronostico) => total + pronostico.porcentaje, 
        0
      );
      
      // Calcular la diferencia absoluta a la suma de resultados reales
      const diferencia = Math.abs(porcentajeTotalPronostico - sumaResultadosReales);
      
      // Calcular el porcentaje de acierto
      const porcentajeAcierto = ((1 - diferencia / sumaResultadosReales) * 100);
      
      return {
        ...usuario,
        porcentajeTotalPronostico,
        diferencia,
        posicion: 0, // Se asignará después
        porcentajeAcierto: Math.max(0, porcentajeAcierto)
      };
    })
    .sort((a, b) => a.diferencia - b.diferencia) // Ordenar por menor diferencia
    .map((usuario, index) => ({
      ...usuario,
      posicion: index + 1
    }));
};

export const formatearNumero = (numero: number): string => {
  return numero.toFixed(2);
};

export const formatearFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const obtenerColorPosicion = (posicion: number): string => {
  switch (posicion) {
    case 1:
      return '#FFD700'; // Oro
    case 2:
      return '#C0C0C0'; // Plata
    case 3:
      return '#CD7F32'; // Bronce
    default:
      return '#6B7280'; // Gris
  }
};

export const obtenerEmojiPosicion = (posicion: number): string => {
  switch (posicion) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `${posicion}`;
  }
};

export const formatearPronosticos = (pronosticos: any[]): string => {
  return pronosticos
    .sort((a, b) => a.puesto - b.puesto)
    .map(p => `${p.puesto}°: ${p.porcentaje}%`)
    .join(' | ');
};

export const calcularSumaResultadosReales = (puestos: any[]): number => {
  return puestos.reduce((total, puesto) => total + puesto.resultadoReal, 0);
}; 