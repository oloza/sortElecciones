export interface Puesto {
  posicion: number;
  resultadoReal: number;
}

export interface Sorteo {
  nombre: string;
  fecha: string;
  premio: number;
  puestos: Puesto[];
}

export interface Pronostico {
  puesto: number;
  porcentaje: number;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  pronosticos: Pronostico[];
  fechaPronostico: string;
}

export interface UsuarioRanking extends Usuario {
  porcentajeTotalPronostico: number;
  diferencia: number;
  posicion: number;
  porcentajeAcierto: number;
}

export interface DatosSorteo {
  sorteo: Sorteo;
  usuarios: Usuario[];
} 