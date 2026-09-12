/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 *
 * * Ejercicio:
 * En este ejercicio se colocan muchos marcadores (MapLocation) en un mapa,
 * cada uno con sus propias coordenadas, pero compartiendo el mismo ícono
 * (LocationIcon) cuando son del mismo tipo (hospital, escuela, parque),
 * gracias a que LocationFactory reutiliza las instancias ya creadas.
 *
 * Se espera entender cómo el patrón Flyweight separa el estado único de
 * cada objeto (las coordenadas, que no se comparten) del estado repetido
 * y pesado (el ícono, que sí se comparte), reduciendo así la cantidad de
 * objetos creados cuando hay muchas instancias parecidas.
 */

import { COLORS } from '../helpers/colors.ts';

interface Location {
  display(coordinates: { x: number; y: number }): void;
}

// Flyweight
class LocationIcon implements Location {
  private type: string; // hospital, escuela, parque
  private iconImage: string; // imagen del marcador

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} con ícono %c[${this.iconImage}]`,
      COLORS.green
    );
  }
}

class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreando una instancia del ícono de ${type}`, COLORS.red);
      const iconImage = `imagen_de_${type.toLowerCase()}.png`;
      this.icons[type] = new LocationIcon(type, iconImage);
    }

    return this.icons[type];
  }
}

class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;

  constructor(x: number, y: number, icon: LocationIcon) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display() {
    this.icon.display(this.coordinates);
  }
}

// Código cliente
function main() {
  const factory = new LocationFactory();

  const locations = [
    new MapLocation(10, 20, factory.getLocationIcon('Hospital')),
    new MapLocation(20, 40, factory.getLocationIcon('Hospital')),
    new MapLocation(30, 60, factory.getLocationIcon('Hospital')),

    new MapLocation(35, 65, factory.getLocationIcon('Parque')),
    new MapLocation(35, 65, factory.getLocationIcon('Parque')),
    new MapLocation(35, 65, factory.getLocationIcon('Parque')),
    new MapLocation(35, 65, factory.getLocationIcon('Parque')),
    new MapLocation(35, 65, factory.getLocationIcon('Parque')),
    new MapLocation(35, 65, factory.getLocationIcon('Parque')),
    new MapLocation(35, 65, factory.getLocationIcon('Parque')),

    new MapLocation(30, 60, factory.getLocationIcon('Hospital')),
    new MapLocation(30, 60, factory.getLocationIcon('Hospital')),
    new MapLocation(30, 60, factory.getLocationIcon('Hospital')),
    new MapLocation(30, 60, factory.getLocationIcon('Hospital')),

    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
    new MapLocation(30, 60, factory.getLocationIcon('Escuela')),
  ];

  locations.forEach((location) => location.display());
}

main();
