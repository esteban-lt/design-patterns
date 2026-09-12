/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 *
 * * Ejercicio:
 * En este ejercicio se arma una fábrica de vehículos que produce, en
 * conjunto, un auto (Vehicle) y su motor (Engine) según la línea elegida:
 * eléctrica (ElectricVehicleFactory) o de combustión (GasVehicleFactory),
 * garantizando que ambas piezas pertenezcan siempre a la misma familia.
 *
 * Se espera entender cómo el patrón Abstract Factory evita mezclar por error
 * piezas de familias distintas (por ejemplo, un motor eléctrico en un auto
 * de combustión), ya que cada fábrica concreta solo sabe crear los productos
 * de su propia familia.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaces de Vehicle y Engine
interface Vehicle {
  assemble(): void;
}

interface Engine {
  start(): void;
}

// Clases Concretas de Productos
class ElectricCar implements Vehicle {
  assemble(): void {
    console.log('Ensamblando un auto %celéctrico', COLORS.blue);
  }
}

class GasCar implements Vehicle {
  assemble(): void {
    console.log('Ensamblando un auto de %ccombustión', COLORS.brown);
  }
}

class ElectricEngine implements Engine {
  start(): void {
    console.log('Arrancando motor %celéctrico', COLORS.blue);
  }
}

class GasEngine implements Engine {
  start(): void {
    console.log('Arrancando motor de %ccombustión', COLORS.brown);
  }
}

// Interfaz de la Fábrica Abstracta
interface VehicleFactory {
  createVehicle(): Vehicle;
  createEngine(): Engine;
}

// Clases Concretas de Fábricas
class ElectricVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new ElectricCar();
  }

  createEngine(): Engine {
    return new ElectricEngine();
  }
}

class GasVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new GasCar();
  }

  createEngine(): Engine {
    return new GasEngine();
  }
}

// Código Cliente
function main(factory: VehicleFactory) {
  const vehicle = factory.createVehicle();
  const engine = factory.createEngine();

  vehicle.assemble();
  engine.start();
}

console.log('Creando vehículo eléctrico:');
main(new ElectricVehicleFactory());

console.log('\nCreando vehículo de combustión:');
main(new GasVehicleFactory());
