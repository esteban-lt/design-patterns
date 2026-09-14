/*
* Sistema de gestión del ciclo de vida de un pedido (e-commerce/logística) usando el patrón OrderState.

Un pedido puede estar en los siguientes estados:
- Pendiente (Pending): recién creado, esperando confirmación de pago
- Pagado (Paid): pago confirmado, listo para preparar
- Enviado (Shipped): en tránsito
- Entregado (Delivered): estado final exitoso
- Cancelado (Cancelled): estado final, cancelado por el cliente o el sistema

Reglas de transición:
- Pending -> Paid (al confirmar pago) o Pending -> Cancelled (cliente cancela antes de pagar)
- Paid -> Shipped (al despachar) o Paid -> Cancelled (reembolso antes de enviar)
- Shipped -> Delivered (al confirmar entrega)
- Shipped NO puede cancelarse directamente (ya está en tránsito)
- Delivered y Cancelled son estados finales: no permiten ninguna transición

El sistema debe:
1. Exponer métodos como confirmPayment(), dispatch(), confirmDelivery(), cancel() sobre el pedido.
2. Si se intenta una transición inválida (ej. cancelar un pedido Shipped, o despachar uno Pending), debe lanzar un error descriptivo indicando el estado actual y la acción no permitida — NO debe fallar silenciosamente ni con un error genérico.
3. Cada estado debe saber imprimir/loguear su propio nombre y qué acciones tiene disponibles (para debug o para un endpoint de "acciones posibles" en el pedido).
4. Al cambiar de estado, debe quedar registrado un log con timestamp de cada transición (historial del pedido).

Objetivo: evitar un gran switch/if-else sobre un campo `status: string`, delegando el comportamiento y las reglas de transición a clases de estado.

* Nota: puedes copiar, pegar y renombrar el archivo para intentar hacer tu propia implementación, luego puedes volver a este archivo para comparar tu solución
*/

const STATES = {
  pending: 'Pending',
  paid: 'Paid',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} as const;

type State = typeof STATES[keyof typeof STATES];

interface OrderState {
  name: State;
  availableStates: State[];
  confirmPayment(): void;
  dispatch(): void;
  confirmDelivery(): void;
  cancel(): void;
}

// Context
class Order {
  private id: string;
  private state: OrderState;
  private logs: string[] = [];

  constructor(id: string) {
    this.id = id;
    this.state = new PendingState(this);
  }

  public confirmPayment() {
    return this.state.confirmPayment();
  }

  public dispatch() {
    return this.state.dispatch();
  }

  public confirmDelivery() {
    return this.state.confirmDelivery();
  }

  public cancel() {
    return this.state.cancel();
  }

  public getId(): string {
    return this.id;
  }

  public getStateName(): string {
    return this.state.name;
  }

  public setState(state: OrderState): void {
    const previousState = this.state;
    this.state = state;
    this.saveStatusChangeLog(previousState, this.state);
  }

  private saveStatusChangeLog(previousState: OrderState, currentState: OrderState) {
    this.logs.push(`${new Date().toISOString()}: state for order ${this.id} changed from ${previousState.name} to ${currentState.name}`);
  }

  public getStatusChangeLogs(): string[] {
    this.logs.forEach(console.log);
    return this.logs;
  }
}

// States
class PendingState implements OrderState {
  private order: Order;
  public name: State = STATES.pending;
  public availableStates: State[] = [STATES.paid, STATES.cancelled];

  public constructor(order: Order) {
    this.order = order;
  }

  public confirmPayment(): void {
    console.log('Payment confirmed');
    this.order.setState(new PaidState(this.order));
  }

  public dispatch(): void {
    throw new Error('Cannot dispatch an order in pending state');
  }

  public confirmDelivery(): void {
    throw new Error('Cannot confirm delivery of an order in pending state');
  }

  public cancel(): void {
    console.log('Order cancelled');
    this.order.setState(new CancelledState(this.order));
  }
}

class PaidState implements OrderState {
  private order: Order;
  public name: State = STATES.paid;
  public availableStates: State[] = [STATES.shipped, STATES.cancelled];

  public constructor(order: Order) {
    this.order = order;
  }

  public confirmPayment(): void {
    throw new Error('Cannot pay for an order that is already paid');
  }

  public dispatch(): void {
    console.log('Order shipped and in transit');
    this.order.setState(new ShippedState(this.order));
  }

  public confirmDelivery(): void {
    throw new Error('Cannot confirm delivery of an order in paid state');
  }

  public cancel(): void {
    console.log('Order cancelled and refund issued');
    this.order.setState(new CancelledState(this.order));
  }
}

class ShippedState implements OrderState {
  private order: Order;
  public name: State = STATES.shipped;
  public availableStates: State[] = [STATES.delivered];

  public constructor(order: Order) {
    this.order = order;
  }

  public confirmPayment(): void {
    throw new Error('Cannot confirm payment of an order in shipped state');
  }

  public dispatch(): void {
    throw new Error('Cannot dispatch an order that is already shipped');
  }

  public confirmDelivery(): void {
    console.log('Order delivered successfully');
    this.order.setState(new DeliveredState(this.order));
  }

  public cancel(): void {
    throw new Error('Cannot cancel an order in shipped state');
  }
}

class DeliveredState implements OrderState {
  private order: Order;
  public name: State = STATES.delivered;
  public availableStates: State[] = [];

  public constructor(order: Order) {
    this.order = order;
  }

  public confirmPayment(): void {
    throw new Error('Cannot pay for an order in delivered state');
  }

  public dispatch(): void {
    throw new Error('Cannot dispatch an order in delivered state');
  }

  public confirmDelivery(): void {
    throw new Error('Cannot deliver an order that is already delivered');
  }

  public cancel(): void {
    throw new Error('Cannot cancel an order in delivered state');
  }
}

class CancelledState implements OrderState {
  private order: Order;
  public name: State = STATES.cancelled;
  public availableStates: State[] = [];

  public constructor(order: Order) {
    this.order = order;
  }

  public confirmPayment(): void {
    throw new Error('Cannot pay for an order in cancelled state');
  }

  public dispatch(): void {
    throw new Error('Cannot dispatch an order in cancelled state');
  }

  public confirmDelivery(): void {
    throw new Error('Cannot confirm delivery of an order in cancelled state');
  }

  public cancel(): void {
    throw new Error('Cannot cancel an order that is already cancelled');
  }
}

// Código cliente
function main() {
  const order = new Order('ORD-001');

  console.log(`Initial state: ${order.getStateName()}`);

  // Flujo feliz: Pending -> Paid -> Shipped -> Delivered
  order.confirmPayment();
  console.log(`Current state: ${order.getStateName()}`);

  order.dispatch();
  console.log(`Current state: ${order.getStateName()}`);

  order.confirmDelivery();
  console.log(`Current state: ${order.getStateName()}`);

  // Intentar una transición inválida sobre un pedido ya entregado
  try {
    order.cancel();
  } catch (error) {
    if (error instanceof Error) {
      console.log(`${error.message}`);
    }
  }

  console.log('\nChange history');
  order.getStatusChangeLogs();

  console.log('\nSecond order: testing early cancellation');
  const order2 = new Order('ORD-002');
  order2.cancel();
  console.log(`Final state ORD-002: ${order2.getStateName()}`);

  // Intentar despachar un pedido ya cancelado
  try {
    order2.dispatch();
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error caught: ${error.message}`);
    }
  }

  console.log('\nThird order: testing cancellation after payment (refund)');
  const order3 = new Order('ORD-003');
  order3.confirmPayment();
  order3.cancel();
  console.log(`Final state ORD-003: ${order3.getStateName()}`);
}

main();
