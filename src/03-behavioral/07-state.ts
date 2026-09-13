/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 *
 * * Ejercicio:
 * En este ejercicio VendingMachine delega insertMoney, selectProduct y
 * dispenseProduct a un objeto de estado actual (WaitingForMoney,
 * ProductSelected, DispensingProduct), y es el propio estado quien decide
 * qué hacer y, si corresponde, cambiar al siguiente estado con setState.
 *
 * Se espera entender cómo el patrón State evita un único método lleno de
 * condicionales (if/switch sobre "en qué estado estoy") reemplazándolo por
 * clases que representan cada estado y saben cómo comportarse en él.
 */

import { COLORS } from '../helpers/colors.ts';
import { sleep } from '../helpers/sleep.ts';

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State;

  constructor() {
    this.state = new WaitingForMoney(this);
  }

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(newState: State) {
    this.state = newState;
    console.log(`Estado cambió a: %c${newState.name}`, COLORS.yellow);
  }

  getStateName(): string {
    return this.state.name;
  }
}

// States
class WaitingForMoney implements State {
  public name: string = 'Esperando Dinero';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      'Dinero insertado: %cAhora puedes seleccionar un producto',
      COLORS.green
    );

    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }

  selectProduct(): void {
    console.log('%cPrimero debes de insertar dinero.', COLORS.red);
  }

  dispenseProduct(): void {
    console.log('%cPrimero debes de insertar dinero.', COLORS.red);
  }
}

class ProductSelected implements State {
  public name: string = 'Seleccionando Producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log(
      '%cPor favor selecciona un producto - dinero ya insertado',
      COLORS.red
    );
  }

  selectProduct(): void {
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }

  dispenseProduct(): void {
    console.log(
      '%cPor favor selecciona un producto - antes de despacharlo',
      COLORS.red
    );
  }
}

class DispensingProduct implements State {
  public name: string = 'Despachando producto';
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  insertMoney(): void {
    console.log('%cPor favor espera a que se entregue el producto', COLORS.red);
  }

  selectProduct(): void {
    console.log('%cProducto ya seleccionado y despachando', COLORS.red);
  }

  dispenseProduct(): void {
    console.log(
      '%cProducto despachado, Cambiando estado a EsperandoDinero',
      COLORS.green
    );

    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

// Código cliente
const EXIT_OPTION = '4';

// Acciones disponibles en el menú, tipadas para no depender de strings sueltos
const menuActions: Record<string, (vendingMachine: VendingMachine) => void> = {
  '1': (vendingMachine) => vendingMachine.insertMoney(),
  '2': (vendingMachine) => vendingMachine.selectProduct(),
  '3': (vendingMachine) => vendingMachine.dispenseProduct(),
  [EXIT_OPTION]: () => console.log('Saliendo del sistema'),
};

function readMenuOption(vendingMachine: VendingMachine): string {
  console.clear();
  console.log(
    `Selecciona una opción: %c${vendingMachine.getStateName()}`,
    COLORS.blue
  );

  // prompt puede devolver null (por ejemplo, si se cancela), por lo que
  // siempre normalizamos a un string antes de comparar la opción
  const input = prompt(
    `
      1. Insertar dinero
      2. Seleccionar producto
      3. Dispensar producto
      4. Salir

      opción: `
  );

  return input?.trim() ?? EXIT_OPTION;
}

async function main() {
  const vendingMachine = new VendingMachine();
  let selectedOption = '';

  while (selectedOption !== EXIT_OPTION) {
    selectedOption = readMenuOption(vendingMachine);

    const action = menuActions[selectedOption];
    if (!action) {
      console.log('Opción no válida');
      await sleep(2000);
      continue;
    }

    action(vendingMachine);

    if (selectedOption !== EXIT_OPTION) {
      await sleep(3000);
    }
  }
}

main();
