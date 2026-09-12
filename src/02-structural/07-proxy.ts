/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 * * Ejercicio:
 * En este ejercicio DocumentProxy implementa la misma interfaz Document que
 * ConfidentialDocument, pero antes de delegarle la llamada a displayContent
 * valida si el rol del usuario está en la lista de roles permitidos
 * (mustHaveRoles); si no lo está, deniega el acceso sin llegar a tocar el
 * documento real.
 *
 * Se espera entender cómo el patrón Proxy controla el acceso a un objeto
 * real interponiéndose antes de la llamada, sin que el código cliente note
 * la diferencia entre hablar con el proxy o con el objeto real.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaz Document
interface Document {
  displayContent(user: User): void;
}

//  Clase que representa el documento confidencial
class ConfidentialDocument implements Document {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  displayContent(): void {
    console.log(`Contenido del documento: \n%c${this.content}\n`, COLORS.blue);
  }
}

// Clase Proxy
class DocumentProxy implements Document {
  private document: Document;
  private mustHaveRoles: string[];

  constructor(document: Document, mustHaveRoles: string[] = []) {
    this.document = document;
    this.mustHaveRoles = mustHaveRoles;
  }

  displayContent(user: User): void {
    if (this.mustHaveRoles.includes(user.getRole())) {
      this.document.displayContent(user);
      return;
    }

    console.log(`%cAcceso denegado. ${user.getName()}, no tienes permisos suficientes para ver este documento.`, COLORS.red);
  }
}

// Clase que representa al usuario
class User {
  private name: string;
  private role: 'admin' | 'user';

  constructor(name: string, role: 'admin' | 'user') {
    this.name = name;
    this.role = role;
  }

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }
}

// Código cliente
function main() {
  const confidentialDoc = new ConfidentialDocument('Este es el contenido confidencial del documento.');
  const proxy = new DocumentProxy(confidentialDoc, ['admin']);

  const user1 = new User('Juan', 'user');
  const user2 = new User('Ana', 'admin');

  console.log('Intento de acceso del usuario 1:');
  proxy.displayContent(user1); // Debería denegar el acceso

  console.log('\nIntento de acceso del usuario 2:');
  proxy.displayContent(user2); // Debería permitir el acceso
}

main();
