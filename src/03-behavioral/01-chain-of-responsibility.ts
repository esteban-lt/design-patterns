/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 *
 * * Ejercicio:
 * En este ejercicio una solicitud de compra pasa por una cadena de
 * aprobadores (Supervisor, Manager, Director), cada uno con un límite de
 * monto que puede aprobar. Si un aprobador no puede resolver la solicitud,
 * la pasa al siguiente eslabón de la cadena con this.next(amount).
 *
 * Se espera entender cómo el patrón Chain of Responsibility permite que una
 * solicitud avance por varios manejadores sin que el emisor sepa cuál de
 * ellos terminará resolviéndola, evitando un único método con muchos if/else
 * para decidir quién aprueba qué.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaz Approver
interface Approver {
  setNext(approver: Approver): Approver;
  approveRequest(amount: number): void;
}

//  Clase abstracta BaseApprover para manejar la cadena
abstract class BaseApprover implements Approver {
  private nextApprover: Approver | null = null;

  setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  abstract approveRequest(amount: number): void;

  protected next(amount: number): void {
    if (this.nextApprover) {
      this.nextApprover.approveRequest(amount);
      return;
    }

    console.log('La solicitud no pudo ser aprobada.');
  }
}

// Clases concretas de aprobadores
class Supervisor extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 1000) {
      console.log(
        `Supervisor aprueba la compra de %c$${amount}`,
        COLORS.yellow
      );
      return;
    }

    this.next(amount);
  }
}

class Manager extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 5000) {
      console.log(
        `Manager aprueba la compra de %c$${amount}`,
        COLORS.yellow
      );
      return;
    }

    this.next(amount);
  }
}

class Director extends BaseApprover {
  override approveRequest(amount: number): void {
    console.log(`Director aprueba la compra de %c$${amount}`, COLORS.yellow);
  }
}

// Código cliente
function main() {
  // Supervisor: <= 1000
  const supervisor = new Supervisor();
  // Manager: <=5000
  const manager = new Manager();
  // Director puede aprobar todo
  const director = new Director();

  // Configurar la cadena de responsabilidad
  supervisor.setNext(manager).setNext(director);

  // Probar diferentes solicitudes de compra
  console.log('Solicitud de compra de $500:');
  supervisor.approveRequest(500);

  console.log('\nSolicitud de compra de $3000:');
  supervisor.approveRequest(3000);

  console.log('\nSolicitud de compra de $7000:');
  supervisor.approveRequest(7000);
}

main();
