/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 * 
 * https://refactoring.guru/es/design-patterns/singleton
 *
 * * Ejercicio:
 * En este ejercicio se implementa una conexión a base de datos
 * (DatabaseConnection) cuyo constructor es privado y solo puede obtenerse a
 * través de getInstance, garantizando que siempre se use la misma instancia
 * para conectar y desconectar.
 *
 * Se espera entender cómo el patrón Singleton controla la creación de la
 * instancia desde dentro de la propia clase, y comprobar que dos llamadas a
 * getInstance devuelven siempre el mismo objeto (db1 === db2).
 */

import { COLORS } from '../helpers/colors.ts';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean = false;

  // Constructor privado para evitar instancias directas
  private constructor() {}

  // Método estático para obtener la instancia única
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
      console.log('\n%cConectado a la base de datos', COLORS.blue);
    }

    return DatabaseConnection.instance;
  }

  // Método para conectar a la base de datos
  public connect(): void {
    if (this.connected) {
      console.log('%cYa estábamos conectados a la base de datos', COLORS.red);
      return;
    }

    this.connected = true;
    console.log('%cNueva conexión a la base de datos', COLORS.green);
  }

  // Método para desconectar de la base de datos
  public disconnect(): void {
    if (this.connected) {
      console.log(
        '%cDesconectamos la conexión a la base de datos',
        COLORS.blue
      );
      this.connected = false;
      return;
    }

    console.log('%cNo hay una conexión activa', COLORS.red);
  }
}

// Código cliente
function main() {
  const db1 = DatabaseConnection.getInstance();
  db1.connect(); // Debería conectar a la base de datos

  const db2 = DatabaseConnection.getInstance();
  db2.connect(); // Debería mostrar que ya existe una conexión activa

  console.log('Son iguales:', db1 === db2); // Debería mostrar true

  db1.disconnect(); // Debería cerrar la conexión
  db2.disconnect();

  db2.connect(); // Ahora debería conectar de nuevo, ya que se cerró la anterior
}

main();
