import { Usuario, UsuarioRanking } from '../types';

export const calcularRanking = (usuarios: Usuario[], resultadoReal: number): UsuarioRanking[] => {
  return usuarios
    .map(usuario => {
      const diferencia = Math.abs(usuario.pronostico - resultadoReal);
      const porcentajeAcierto = ((1 - diferencia / resultadoReal) * 100);
      
      return {
        ...usuario,
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