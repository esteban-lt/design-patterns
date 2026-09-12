/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 *
 * * Ejercicio:
 * En este ejercicio se separa la abstracción de una notificación (la clase
 * Notification y sus subclases Alert, Reminder, Push) del canal por el que
 * se envía (NotificationChannel: Email, SMS, Push), de modo que cada
 * notificación puede cambiar de canal en tiempo de ejecución con
 * setChannel sin tener que crear una clase nueva por cada combinación.
 *
 * Se espera entender cómo el patrón Bridge evita la explosión de subclases
 * que ocurriría si se intentara combinar cada tipo de notificación con cada
 * canal (por ejemplo, AlertByEmail, AlertBySMS, ReminderByEmail, etc.), al
 * dejar que ambas jerarquías (notificación y canal) varíen por separado.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// Implementaciones de canales de comunicación
class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// Clase abstracta Notification
// Define la propiedad `channel` y el método `notify`
abstract class Notification {
  protected channel: NotificationChannel;

  constructor(channel: NotificationChannel) {
    this.channel = channel;
  }

  abstract notify(message: string): void;
  abstract setChannel(channel: NotificationChannel): void;
}

// Clases concretas de notificaciones
class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de Alerta:', COLORS.red);
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

class ReminderNotification extends Notification {
  notify(message: string): void {
    console.log('\n%cNotificación de Recordatorio:', COLORS.blue);
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

class PushNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cNotificación de Push:', COLORS.green);
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel;
  }
}

// Código Cliente
function main() {
  // Crear una notificación de alerta usando el canal de correo electrónico
  const alert = new AlertNotification(new EmailChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // Cambiar el canal a SMS y volver a enviar la alerta
  alert.setChannel(new SMSChannel());
  alert.notify('Alerta de seguridad: Se ha detectado un acceso no autorizado.');

  // Crear una notificación de recordatorio usando el canal de SMS
  const reminder = new ReminderNotification(new SMSChannel());
  reminder.notify('Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.');

  // Cambiar el canal de recordatorio a push y enviar nuevamente
  reminder.setChannel(new PushNotificationChannel());
  reminder.notify('Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m.');

  // Crear una notificación de push usando el canal de notificación push
  const push = new PushNotification(new PushNotificationChannel());
  push.notify('Nueva actualización disponible. Haz clic para instalar.');
}

main();
