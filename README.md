# Ranking Sorteo Elecciones

Una aplicación React para realizar un ranking de usuarios que aciertan a un sorteo. Los usuarios se ordenan según qué tan cerca estén del resultado real del sorteo.

## Características

- **Ranking Automático**: Los usuarios se ordenan automáticamente por proximidad al resultado real
- **Datos Estáticos**: Los datos se cargan desde un archivo JSON estático
- **Interfaz Moderna**: Diseño responsive con Tailwind CSS
- **Estadísticas**: Muestra información adicional como total de participantes y mejor acierto
- **Cálculo de Acierto**: Calcula el porcentaje de acierto de cada usuario

## Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Encabezado con información del sorteo
│   └── RankingTable.tsx # Tabla de ranking de usuarios
├── data/               # Datos estáticos
│   └── sorteo.json     # Datos del sorteo y usuarios
├── types/              # Definiciones de TypeScript
│   └── index.ts        # Interfaces y tipos
├── utils/              # Funciones utilitarias
│   └── rankingUtils.ts # Lógica de cálculo de ranking
├── App.tsx             # Componente principal
└── index.tsx           # Punto de entrada
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Instalar Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Ejecutar la aplicación:
```bash
npm start
```

## Configuración de Datos

Los datos del sorteo se configuran en `src/data/sorteo.json`:

- **sorteo**: Información del sorteo (nombre, fecha, premio, resultado real)
- **usuarios**: Lista de usuarios con sus pronósticos

## Cálculo del Ranking

El ranking se calcula basándose en:

1. **Diferencia Absoluta**: `|pronóstico - resultado_real|`
2. **Porcentaje de Acierto**: `(1 - diferencia/resultado_real) * 100`
3. **Ordenamiento**: Por menor diferencia (mejor acierto primero)

## Tecnologías Utilizadas

- React 18
- TypeScript
- Tailwind CSS
- CSS Modules

## Personalización

Para modificar el sorteo:

1. Edita `src/data/sorteo.json`
2. Cambia el `resultadoReal` para ver cómo cambia el ranking
3. Agrega o modifica usuarios según sea necesario

## Scripts Disponibles

- `npm start`: Ejecuta la aplicación en modo desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de webpack (irreversible) 