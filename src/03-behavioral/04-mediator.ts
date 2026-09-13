/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 *
 * * Ejercicio:
 * En este ejercicio varios usuarios (User) se comunican entre sí dentro de
 * un ChatRoom, pero ninguno le envía el mensaje directamente a otro: siempre
 * llaman a chatRoom.sendMessage, y es el ChatRoom quien decide a quién
 * reenviarlo (a todos menos al remitente).
 *
 * Se espera entender cómo el patrón Mediator evita que cada User tenga
 * referencias directas a los demás usuarios, centralizando esa lógica de
 * comunicación en un único objeto mediador (ChatRoom).
 */

import { COLORS } from '../helpers/colors.ts';

// Chatroom
class ChatRoom {
  private users: User[] = [];
  public title: string;

  constructor(title: string) {
    this.title = title;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user !== sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

class User {
  private username: string;
  private chatRoom: ChatRoom;

  constructor(username: string, chatroom: ChatRoom) {
    this.username = username;
    this.chatRoom = chatroom;

    chatroom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(
      `\n\n\n%c${this.username} envía: %c${message} `,
      COLORS.blue,
      COLORS.white
    );
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string): void {
    console.log(
      `%c${this.username} recibe de ${sender.username}: %c${message} `,
      COLORS.blue,
      COLORS.white
    );
  }
}

// Código cliente
function main() {
  const chatRoom = new ChatRoom('Grupo de trabajo');

  const user1 = new User('Esteban', chatRoom);
  const user2 = new User('Fernando', chatRoom);
  const user3 = new User('Angel', chatRoom);

  user1.sendMessage('Hola a todos');
  user2.sendMessage('Hola Esteban, ¿cómo estás?');
  user3.sendMessage('Hola Esteban y Fernando, ¿cómo están?');
}

main();
