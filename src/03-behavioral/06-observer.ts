/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 *
 * * Ejercicio:
 * En este ejercicio WeatherStation (sujeto) mantiene una lista de
 * aplicaciones suscritas (WeatherApp) y las notifica automáticamente cada
 * vez que el clima cambia, sin importar cuántas aplicaciones estén
 * suscritas ni cuándo se suscribieron o dieron de baja.
 *
 * Se espera entender cómo el patrón Observer permite que un sujeto avise a
 * varios interesados sobre cambios de estado sin acoplarse a clases
 * concretas, ya que solo depende de la interfaz Observer.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaz Observer
interface Observer {
  update(weatherData: string): void;
}

// Clase Subject WeatherStation
class WeatherStation {
  private observers: Observer[] = [];
  private weatherData: string = 'Soleado';

  // Agregar un Observer
  subscribe(observer: Observer): void {
    this.observers.push(observer);
    observer.update(this.weatherData);

    console.log(
      '%cNueva aplicación suscrita al sistema meteorológico.',
      COLORS.green
    );
  }

  // Eliminar un Observer
  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((sub) => sub !== observer);
    console.log(`%cUna aplicación se ha dado de baja`, COLORS.red);
  }

  // Actualizar el clima y notificar a todos los Observers
  setWeather(weatherData: string): void {
    console.log(`\nClima actualizado: %c${weatherData}`, COLORS.blue);

    this.weatherData = weatherData;
    this.notifyObservers();
  }

  // Notificar a todos los Observers
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.weatherData);
    }
  }
}

// Clase Observer WeatherApp
class WeatherApp implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Recibir actualización del clima
  update(weatherData: string): void {
    console.log(
      `%c${this.name} %cha recibido notificación del clima: %c${weatherData}`,
      COLORS.red,
      COLORS.white,
      COLORS.yellow
    );
  }
}

// Código cliente
function main(): void {
  const weatherStation = new WeatherStation();

  // Crear aplicaciones
  const flutterWeatherApp = new WeatherApp('Flutter WeatherApp');
  const reactNativeWeatherApp = new WeatherApp('React Native WeatherApp');
  const weatherTrackerApp = new WeatherApp('Weather Tracker App');

  // Suscribir aplicaciones a la estación meteorológica
  weatherStation.subscribe(flutterWeatherApp);
  weatherStation.subscribe(reactNativeWeatherApp);

  // Actualizar el clima
  weatherStation.setWeather('Lluvioso');

  // Agregar una nueva aplicación
  weatherStation.subscribe(weatherTrackerApp);
  weatherStation.setWeather('Nublado');

  // Una aplicación se da de baja
  weatherStation.unsubscribe(reactNativeWeatherApp);
  weatherStation.setWeather('Tormenta eléctrica');
}

main();
