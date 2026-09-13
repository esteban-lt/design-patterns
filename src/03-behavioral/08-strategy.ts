/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 *
 * * Ejercicio:
 * En este ejercicio TaxCalculator (contexto) delega el cálculo del impuesto
 * a una estrategia intercambiable (USATaxStrategy, CanadaTaxStrategy,
 * GermanyTaxStrategy) que implementa la interfaz TaxStrategy, y puede
 * cambiar de estrategia en cualquier momento con setStrategy.
 *
 * Se espera entender cómo el patrón Strategy permite intercambiar el
 * algoritmo usado en tiempo de ejecución sin modificar el contexto que lo
 * utiliza, evitando un único método con condicionales por cada país.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaz Strategy
interface TaxStrategy {
  calculateTax(amount: number): number;
}

// Estrategias
class USATaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.1;
  }
}

class CanadaTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.13;
  }
}

class GermanyTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.19;
  }
}

// Clase Contexto TaxCalculator
class TaxCalculator {
  private strategy: TaxStrategy;

  constructor(strategy: TaxStrategy) {
    this.strategy = strategy;
  }

  // Cambiar la estrategia de cálculo de impuestos
  setStrategy(strategy: TaxStrategy): void {
    this.strategy = strategy;
  }

  // Calcular impuestos
  calculate(amount: number): number {
    return this.strategy.calculateTax(amount);
  }
}

// Código cliente
function main(): void {
  const taxCalculator = new TaxCalculator(new USATaxStrategy());

  console.log('%cCálculo de impuestos:\n', COLORS.red);
  console.log('USA: $', taxCalculator.calculate(100).toFixed(2));

  console.log('\nCambiando a estrategia para Canada...');
  taxCalculator.setStrategy(new CanadaTaxStrategy());
  console.log('Canada: $', taxCalculator.calculate(100).toFixed(2));

  console.log('\nCambiando a estrategia para Alemania...');
  taxCalculator.setStrategy(new GermanyTaxStrategy());
  console.log('Germany: $', taxCalculator.calculate(100).toFixed(2));
}

main();
