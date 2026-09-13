/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 *
 * * Ejercicio:
 * En este ejercicio HotBeverage define en prepare() el esqueleto fijo para
 * preparar una bebida caliente (hervir agua, agregar ingrediente principal,
 * servir, agregar condimentos), dejando que Tea y Coffee solo implementen
 * los pasos que varían (addMainIngredient y addCondiments).
 *
 * Se espera entender cómo el patrón Template Method fija el orden general
 * de un algoritmo en la clase base, mientras delega a las subclases
 * únicamente los pasos que necesitan comportamiento distinto.
 */

import { COLORS } from '../helpers/colors.ts';

abstract class HotBeverage {
  prepare(): void {
    this.boilWater();
    this.addMainIngredient();
    this.pourInCup();
    this.addCondiments();
  }

  private boilWater() {
    console.log('Hirviendo agua...');
  }

  private pourInCup() {
    console.log('Sirviendo en la taza...');
  }

  protected abstract addMainIngredient(): void;
  protected abstract addCondiments(): void;
}

class Tea extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Añadiendo una bolsa de té');
  }

  protected override addCondiments(): void {
    console.log('Añadiendo miel y limón');
  }
}

class Coffee extends HotBeverage {
  protected override addMainIngredient(): void {
    console.log('Añadiendo café molido');
  }

  protected override addCondiments(): void {
    console.log('Añadiendo azúcar y leche');
  }
}

// Código cliente
function main() {
  console.log('%cPreparando el té', COLORS.green);
  const tea = new Tea();
  tea.prepare();

  console.log('\n%cPreparando café', COLORS.brown);
  const coffee = new Coffee();
  coffee.prepare();
}

main();
