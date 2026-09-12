/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 * * Ejercicio:
 * En este ejercicio se construye un logger mediante una función fábrica
 * (createLogger), la cual recibe un nivel (info, warn, error) y retorna una
 * función especializada que imprime mensajes con timestamp y color según
 * ese nivel.
 *
 * Se espera entender cómo, a diferencia de las factories basadas en clases,
 * una factory function puede devolver directamente una función configurada
 * (closure) que ya "recuerda" el nivel con el que fue creada, sin necesidad
 * de instanciar clases.
 */

//! Salida esperada
//! Colocar colores de log según el nivel
//* [INFO:2025-10-21:07] Aplicación iniciada correctamente.
//* [WARNING:2025-10-21:07] El uso de memoria está alto.
//* [ERROR:2025-10-21:07] Error de conexión a la base de datos.

import { COLORS } from '../helpers/colors.ts';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Función fábrica que crea un manejador de logs
type LogLevel = 'info' | 'warn' | 'error';

function createLogger(level: LogLevel) {
  // Retorna una función que recibe el "message" como argumento
  return (message: string) => {
    const timestamp = formatDate(new Date());
    const logColor = {
      info: COLORS.white,
      warn: COLORS.yellow,
      error: COLORS.red,
    };

    const prefix = {
      info: 'INFO',
      warn: 'WARNING',
      error: 'ERROR',
    };

    console.log(
      `%c[${prefix[level]}: ${timestamp}] ${message}`,
      logColor[level]
    );
  };
}

// Código cliente
function main() {
  const infoLogger = createLogger('info');
  const warnLogger = createLogger('warn');
  const errorLogger = createLogger('error');

  infoLogger('Aplicación iniciada correctamente.');
  warnLogger('El uso de memoria está alto.');
  errorLogger('Error de conexión a la base de datos.');
}

main();
