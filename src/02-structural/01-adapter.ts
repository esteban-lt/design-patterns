/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 *
 * * Ejercicio:
 * En este ejercicio se tienen tres servicios de pago externos (PayPal, Stripe
 * y MercadoPago), cada uno con un método distinto para cobrar (sendPayment,
 * makeCharge, pay). Un adaptador por cada servicio (PayPalAdapter,
 * StripeAdapter, MercadoPagoAdapter) los envuelve para exponer siempre el
 * mismo método processPayment de la interfaz PaymentProcessor.
 *
 * Se espera entender cómo el patrón Adapter permite que el código cliente
 * trabaje contra una única interfaz común, sin importar que por debajo cada
 * servicio tenga su propia forma (incompatible) de resolver el pago.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaz PaymentProcessor
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// Clases de Servicios de Pago Externos
// Estas clases simulan los servicios externos de PayPal, Stripe y MercadoPago
class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cPayPal`, COLORS.blue);
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Procesando pago de $${amount} con %cStripe`, COLORS.purple);
  }
}

class MercadoPagoService {
  pay(amount: number): void {
    console.log(
      `Procesando pago de $${amount} con %cMercadoPago`,
      COLORS.yellow
    );
  }
}

// Clases Adaptadoras
// Adaptador para PayPal
class PayPalAdapter implements PaymentProcessor {
  private paypalService: PayPalService;

  constructor(service: PayPalService) {
    this.paypalService = service;
  }

  processPayment(amount: number): void {
    this.paypalService.sendPayment(amount);
  }
}

// Adaptador para Stripe
class StripeAdapter implements PaymentProcessor {
  private stripeService: StripeService;

  constructor(service: StripeService) {
    this.stripeService = service;
  }

  processPayment(amount: number): void {
    this.stripeService.makeCharge(amount);
  }
}

// Adaptador para MercadoPago
class MercadoPagoAdapter implements PaymentProcessor {
  private mercadoPagoService: MercadoPagoService;

  constructor(service: MercadoPagoService) {
    this.mercadoPagoService = service;
  }

  processPayment(amount: number): void {
    this.mercadoPagoService.pay(amount);
  }
}

// Código Cliente
function main() {
  const paymentAmount = 100;

  const paypalProcessor: PaymentProcessor = new PayPalAdapter(new PayPalService());
  const stripeProcessor: PaymentProcessor = new StripeAdapter(new StripeService());
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter(new MercadoPagoService());

  // Procesar pagos con los diferentes servicios
  // Los 3 procesadores de pago trabajan exactamente igual después de adaptarlos
  console.log('Usando PayPal:');
  paypalProcessor.processPayment(paymentAmount);

  console.log('\nUsando Stripe:');
  stripeProcessor.processPayment(paymentAmount);

  console.log('\nUsando MercadoPago:');
  mercadoPagoProcessor.processPayment(paymentAmount);
}

main();
