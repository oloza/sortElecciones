export interface Sorteo {
  nombre: string;
  fecha: string;
  premio: number;
  resultadoReal: number;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  pronostico: number;
  fechaPronostico: string;
}

export interface UsuarioRanking extends Usuario {
  diferencia: number;
  posicion: number;
  porcentajeAcierto: number;
}

export interface DatosSorteo {
  sorteo: Sorteo;
  usuarios: Usuario[];
} 