/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 * * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 *
 * * Ejercicio:
 * En este ejercicio una BasicNotification se envuelve con decoradores
 * (EmailDecorator, SMSDecorator) que implementan la misma interfaz
 * Notification. Cada decorador llama primero al send del objeto que envuelve
 * (super.send) y luego añade su propio comportamiento (enviar también por
 * correo o por SMS).
 *
 * Se espera entender cómo el patrón Decorator permite combinar
 * comportamientos apilando envoltorios en tiempo de ejecución, en lugar de
 * crear una subclase distinta por cada combinación posible de
 * funcionalidades.
 */

import { COLORS } from '../helpers/colors.ts';

interface Notification {
  send(message: string): void;
}

class BasicNotification implements Notification {
  send(message: string): void {
    console.log(
      `%cEnviando notificación básica: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}

// Clase decoradora
abstract class NotificationDecorator implements Notification {
  protected notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}

// Crear diferentes decoradores
class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string) {
    console.log(
      `%cEnviando notificación por correo electrónico:%c${message}`,
      COLORS.green,
      COLORS.white
    );
  }

  override send(message: string): void {
    super.send(message);
    this.sendEmail(message);
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string) {
    console.log(
      `%cEnviando notificación por SMS: %c${message}`,
      COLORS.red,
      COLORS.white
    );
  }

  override send(message: string): void {
    super.send(message);
    this.sendSMS(message);
  }
}

// Código cliente
function main() {
  let notification: Notification = new BasicNotification();

  notification = new EmailDecorator(notification);
  notification = new SMSDecorator(notification);

  notification.send('Alerta de sistema');
}

main();
